import {} from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  ${(props) =>
    props.textColor === 'primary' &&
    css`
      color: ${(props) => props.theme.gray6B};
    `};

  ${(props) =>
    props.textColor === 'secondary' &&
    css`
      color: white;
    `};

  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`

const PostMeta = ({ date = 'Mar 23', authorName = 'Andiez Le', textColor = 'primary' }) => {
  return (
    <PostMetaStyles textColor={textColor}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
    </PostMetaStyles>
  )
}

PostMeta.propTypes = {
  // children: PropTypes.node,
  textColor: PropTypes.oneOf(['priamary', 'secondary']),
  className: PropTypes.string,
  date: PropTypes.string,
  authorName: PropTypes.string
}

export default PostMeta
