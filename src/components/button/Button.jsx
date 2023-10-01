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
  ${(props) =>
    props.kind === 'secondary' &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === 'ghost' &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

const Button = ({ type = 'button', onClick = () => {}, kind = 'primary', children, ...props }) => {
  const { isloading, to } = props
  const child = !!isloading ? <LoadingSpinner /> : children
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to} className="inline-block">
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
