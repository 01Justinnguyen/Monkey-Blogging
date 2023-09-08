import {} from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  a {
    display: block;
    &:hover {
      color: ${(props) => props.theme.primary};
      opacity: 0.8;
      transition: all 0.5s ease;
    }
  }

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};

  ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `};
`

const PostCategory = ({ children, type = 'primary', className = '', to = '/' }) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  )
}

PostCategory.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  to: PropTypes.string
}

export default PostCategory
