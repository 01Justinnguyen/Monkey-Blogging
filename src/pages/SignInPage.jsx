import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { IconEyeClose, IconEyeOpen } from '@/components/icon'
import { Button } from '@/components/button'
import { Field } from '@/components/field'
const SignInPage = () => {
  // const { userInfo } = useAuth()
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!userInfo.email) navigate('/sign-up')
  //   else navigate('/')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const [togglePassword, setTogglePassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    mode: 'onChange'
  })
  const handleSignIn = (values) => {
    console.log('🚀 ~ file: SignInPage.jsx:19 ~ handleSignIn ~ values:', values)
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
