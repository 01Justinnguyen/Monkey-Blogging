import { useState } from 'react'
import { IconEyeClose, IconEyeOpen } from '../icon'
import { Label } from '../label'
import Input from './Input'
import PropTypes from 'prop-types'

const InputPasswordToggle = ({ control, label, name, unLabel }) => {
  const [togglePassword, setTogglePassword] = useState(false)
  if (!control) return null
  return (
    <>
      {unLabel ? <></> : <Label htmlFor={name}>{label}</Label>}
      <Input name={name} type={togglePassword ? 'text' : 'password'} placeholder="Enter your password" control={control}>
        {togglePassword ? <IconEyeOpen onClick={() => setTogglePassword(false)} /> : <IconEyeClose onClick={() => setTogglePassword(true)} />}
      </Input>
    </>
  )
}

InputPasswordToggle.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  unLabel: PropTypes.bool
}

export default InputPasswordToggle
