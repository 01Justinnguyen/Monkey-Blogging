import {} from 'react'
import styled from 'styled-components'
const HeadingStyles = styled.h2`
  color: ${(props) => props.theme.tertiary};
  font-size: 28px;
  position: relative;
  margin-bottom: 30px;
  font-family: 'Montserrat', sans-serif;
  &:before {
    content: '';
    width: 60px;
    height: 4px;
    background-color: ${(props) => props.theme.accent};
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, -250%);
  }
`
const Heading = ({ className = '', children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>
}

export default Heading
