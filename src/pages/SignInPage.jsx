import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { IconEyeClose, IconEyeOpen } from '@/components/icon'
import { Button } from '@/components/button'
import { Field } from '@/components/field'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { auth } from '@/firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
const schema = yup.object({
  email: yup.string().required('Please enter your email').email('Please enter valid email address'),
  password: yup.string().required('Please enter your password').min(8, 'Your password must be at least 8 character')
})

const SignInPage = () => {
  useEffect(() => {
    document.title = 'Login Page'
  }, [])
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useAuth()
  console.log(auth)

  const [togglePassword, setTogglePassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message)
    }
  }, [errors])
  const handleSignIn = async (values) => {
    if (!isValid) return
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate('/')
    } catch (error) {
      if (error.message.includes('wrong-password')) toast.error('It seems your password was wrong')
    }
  }

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input name="email" type="email" placeholder="Enter your email address" control={control} />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type={togglePassword ? 'text' : 'password'} placeholder="Enter your password" control={control}>
            {togglePassword ? <IconEyeOpen onClick={() => setTogglePassword(false)} /> : <IconEyeClose onClick={() => setTogglePassword(true)} />}
          </Input>
        </Field>
        <div className="have-account">
          Don&apos;t have an account? <NavLink to={'/sign-up'}>Register</NavLink>
        </div>
        <Button
          style={{
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto'
          }}
          kind="primary"
          type="submit"
          isloading={isSubmitting}
          disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </AuthenticationPage>
  )
}

export default SignInPage
