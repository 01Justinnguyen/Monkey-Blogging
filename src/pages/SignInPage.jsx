import React, { useEffect, useState } from 'react'
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
import { async } from '@firebase/util'
import { auth, db } from '@/firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
const schema = yup.object({
  email: yup.string().required('Please enter your email').email('Please enter valid email address'),
  password: yup.string().required('Please enter your password').min(8, 'Your password must be at least 8 character')
})

const SignInPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuth()
  useEffect(() => {
    document.title = 'Login Page'
    if (userInfo?.email) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [togglePassword, setTogglePassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const handleSignIn = async (values) => {
    if (!isValid) await signInWithEmailAndPassword(auth, values.email, values.password)
    navigate('/')
  }
  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message)
    }
  }, [errors])
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
          Don't have an account? <NavLink to={'/sign-up'}>Register</NavLink>
        </div>
        <Button
          style={{
            maxWidth: 300,
            margin: '0 auto'
          }}
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  )
}

export default SignInPage
