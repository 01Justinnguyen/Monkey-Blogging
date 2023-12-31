import {} from 'react'
import { useController } from 'react-hook-form'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${(props) => (props.hasicon ? '16px 60px 16px 20px' : '16px 20px')};
    background-color: ${(props) => props.theme.grayLight};
    border: 1px solid ${(props) => props.theme.grayf1};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
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
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`

const Input = ({ name = '', type = 'text', children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ''
  })
  return (
    <InputStyles hasicon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  control: PropTypes.any
}

export default Input
