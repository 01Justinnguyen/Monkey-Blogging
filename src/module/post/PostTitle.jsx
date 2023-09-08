import {} from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }

  ${(props) =>
    props.size === 'normal' &&
    css`
      font-size: 18px;
    `};

  ${(props) =>
    props.size === 'big' &&
    css`
      font-size: 22px;
    `};
`

const PostTitle = ({ children, className = '', size = 'normal', to = '/' }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  )
}

PostTitle.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['normal', 'big']),
  className: PropTypes.string,
  to: PropTypes.string
}

export default PostTitle
