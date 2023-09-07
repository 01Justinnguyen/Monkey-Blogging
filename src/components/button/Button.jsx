import {} from 'react'
import styled, { css } from 'styled-components'
import { LoadingSpinner } from '@/components/loading'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || '66px'};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  ${(props) =>
    props.kind === 'secondary' &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-image: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary});
    `};
`

const Button = ({ type = 'button', onClick = () => {}, kind = 'secondary', children, ...props }) => {
  const { isloading, to } = props
  const child = !!isloading ? <LoadingSpinner /> : children
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to} style={{ display: 'inline-block' }}>
        <ButtonStyles kind={kind} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    )
  }
  return (
    <>
      <ButtonStyles kind={kind} type={type} onClick={onClick} {...props}>
        {child}
      </ButtonStyles>
    </>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  kind: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
  children: PropTypes.node,
  isloading: PropTypes.bool,
  to: PropTypes.string
}

export default Button
