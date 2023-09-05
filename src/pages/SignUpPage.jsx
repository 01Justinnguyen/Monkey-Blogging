import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { IconEyeClose } from '@/components/icon'
import { Field } from '@/components/field'
import { IconEyeOpen } from '../components/icon'
import { Button } from '@/components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

const SignUpPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`

const schema = yup.object({
  fullname: yup.string().required('Please enter your fullname'),
  email: yup.string().required('Please enter your email').email('Please enter valid email address'),
  password: yup.string().min(8, 'Your password must be at least 8 character').required('Please enter your password'),
  rePassword: yup
    .string()
    .required('Please enter your confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignUpPage = () => {
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
  const handleSignUp = (values) => {
    if (!isValid) return
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        console.log('🚀 ~ file: SignUpPage.jsx:40 ~ handleSignUp ~ values:', values)
      }, 5000)
    })
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
    <SignUpPageStyle>
      <div className="container">
        <img className="logo" srcSet="/logo.png 2x" alt="monkey blogging logo" />
        <h1 className="heading">Monkey Blogging</h1>
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
      </div>
    </SignUpPageStyle>
  )
}

export default SignUpPage
