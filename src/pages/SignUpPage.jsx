import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { IconEyeClose, IconEyeOpen } from '@/components/icon'
import { Field } from '@/components/field'
import { Button } from '@/components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@/firebase/firebase-config'
import { NavLink, useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import AuthenticationPage from './AuthenticationPage'

const schema = yup.object({
  fullname: yup.string().required('Please enter your fullname'),
  email: yup.string().required('Please enter your email').email('Please enter valid email address'),
  password: yup.string().required('Please enter your password').min(8, 'Your password must be at least 8 character'),
  rePassword: yup
    .string()
    .required('Please enter your confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignUpPage = () => {
  useEffect(() => {
    document.title = 'Register Page'
  }, [])
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const handleSignUp = async (values) => {
    if (!isValid) return
    const user = await createUserWithEmailAndPassword(auth, values.email, values.password)
    await updateProfile(auth.currentUser, {
      displayName: values.fullname
    })
    const colRef = collection(db, 'users')
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password
    })
    toast.success('Register successfully!!!')
    navigate('/sign-in')
  }

  const [togglePassword, setTogglePassword] = useState(false)
  const [toggleRePassword, setToggleRePassword] = useState(false)

  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message)
    }
  }, [errors])
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">FullName</Label>
          <Input name="fullname" type="text" placeholder="Enter your fullname" control={control} />
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input name="email" type="email" placeholder="Enter your email" control={control} />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type={togglePassword ? 'text' : 'password'} placeholder="Enter your password" control={control}>
            {togglePassword ? <IconEyeOpen onClick={() => setTogglePassword(false)} /> : <IconEyeClose onClick={() => setTogglePassword(true)} />}
          </Input>
        </Field>
        <Field>
          <Label htmlFor="rePassword">Confirm Password</Label>
          <Input name="rePassword" type={toggleRePassword ? 'text' : 'password'} placeholder="Enter your confirm password" control={control}>
            {toggleRePassword ? <IconEyeOpen onClick={() => setToggleRePassword(false)} /> : <IconEyeClose onClick={() => setToggleRePassword(true)} />}
          </Input>
        </Field>
        <div className="have-account">
          Already have an account? <NavLink to={'/sign-in'}>Login</NavLink>
        </div>
        <Button
          style={{
            width: '100%',
            maxWidth: 300,
            margin: '0 auto'
          }}
          type="submit"
          kind="primary"
          isloading={isSubmitting}
          disabled={isSubmitting}>
          Register
        </Button>
      </form>
    </AuthenticationPage>
  )
}

export default SignUpPage
