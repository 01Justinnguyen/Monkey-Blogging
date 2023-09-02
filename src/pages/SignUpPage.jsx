import { useState } from 'react'
import { styled } from 'styled-components'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { IconEyeClose } from '@/components/icon'
import { Field } from '@/components/field'
import { IconEyeOpen } from '../components/icon'
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

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch
  } = useForm({})
  const handleSignUp = (values) => {
    console.log('🚀 ~ file: SignUpPage.jsx:34 ~ handleSignUp ~ values:', values)
  }

  const [togglePassword, setTogglePassword] = useState(false)
  const [toggleRePassword, setToggleRePassword] = useState(false)
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
        </form>
      </div>
    </SignUpPageStyle>
  )
}

export default SignUpPage
