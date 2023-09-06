import {} from 'react'
import styled from 'styled-components'
import { LoadingSpinner } from '@/components/loading'
import PropTypes from 'prop-types'
const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || '66px'};
  background-image: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary});
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

/**
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 *
 */

const Button = ({ type = 'button', onClick = () => {}, children, ...props }) => {
  const { isLoading } = props
  const child = isLoading ? <LoadingSpinner /> : children
  return (
    <>
      <ButtonStyles type={type} onClick={onClick} {...props}>
        {child}
      </ButtonStyles>
    </>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isLoading: PropTypes.bool
}

export default Button
