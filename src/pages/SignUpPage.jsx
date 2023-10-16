import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { Field } from '@/components/field'
import { Button } from '@/components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@/firebase/firebase-config'
import { NavLink, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import AuthenticationPage from './AuthenticationPage'
import InputPasswordToggle from '@/components/input/InputPasswordToggle'
import slugify from 'slugify'
import { userStatus, userRoles } from '@/utils/constants'

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
    await createUserWithEmailAndPassword(auth, values.email, values.password)
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
    })
    const colRef = collection(db, 'users')

    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      status: userStatus.ACTIVE,
      role: userRoles.USER,
      createdAt: serverTimestamp()
    })

    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password
    // })
    toast.success('Register successfully!!!')
    navigate('/sign-in')
  }

  // const [togglePassword, setTogglePassword] = useState(false)
  // const [toggleRePassword, setToggleRePassword] = useState(false)

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
          <InputPasswordToggle name="password" control={control} label="Password" />
        </Field>
        <Field>
          <InputPasswordToggle name="rePassword" control={control} label="Confirm password" />
        </Field>
        <div className="have-account">
          Already have an account? <NavLink to={'/sign-in'}>Login</NavLink>
        </div>
        <Button className="w-[100%] max-w-[300px] mx-auto" type="submit" kind="primary" isloading={isSubmitting} disabled={isSubmitting}>
          Register
        </Button>
      </form>
    </AuthenticationPage>
  )
}

export default SignUpPage
