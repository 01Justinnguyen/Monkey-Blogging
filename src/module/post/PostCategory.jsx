import {} from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

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

const PostCategory = ({ children, type = 'primary', className = '' }) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      {children}
    </PostCategoryStyles>
  )
}

PostCategory.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string
}

export default PostCategory
