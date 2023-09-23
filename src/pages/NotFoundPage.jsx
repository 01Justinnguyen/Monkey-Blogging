import {} from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }

  .heading {
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to={'/'}>
        <img srcSet="/logo.png 2x" alt="monkey blogging" className="logo" />
      </NavLink>
      <h1 className="heading">Oops! This page not found</h1>
      <NavLink to={'/'} className="back">
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  )
}

export default NotFoundPage
