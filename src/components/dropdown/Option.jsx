import {} from 'react'
import { useDropdown } from './dropdown-context'
import PropTypes from 'prop-types'
const Option = (props) => {
  const { setShow } = useDropdown()
  const { onClick } = props

  const handleClick = () => {
    onClick && onClick()
    setShow(false)
  }
  return (
    <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100" onClick={handleClick}>
      {props.children}
    </div>
  )
}

Option.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default Option
