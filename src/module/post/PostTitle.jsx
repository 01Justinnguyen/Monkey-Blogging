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
      color: ${(props) => props.theme.third};
      text-shadow: 3px 0px 7px rgba(81, 67, 21, 0.8), -3px 0px 7px rgba(81, 67, 21, 0.8), 0px 4px 7px rgba(81, 67, 21, 0.8);
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
