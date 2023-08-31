import {} from 'react'
import { styled } from 'styled-components'
import { Label } from '@/components/label'

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
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  .input {
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    outline: none !important;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`

const SignUpPage = () => {
  return (
    <SignUpPageStyle>
      <div className="container">
        <img className="logo" srcSet="/logo.png 2x" alt="monkey blogging logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form" action="">
          <div className="field">
            <Label htmlFor="fullname">FullName</Label>
            <input id="fullname" type="text" className="input" placeholder="Enter your fullname" />
          </div>
        </form>
      </div>
    </SignUpPageStyle>
  )
}

export default SignUpPage
