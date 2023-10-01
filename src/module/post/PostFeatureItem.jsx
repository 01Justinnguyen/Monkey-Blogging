import styled from 'styled-components'
import slugify from 'slugify'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(179.77deg, #6b6b6b 36.45%, rgba(163, 163, 163, 0.622265) 63.98%, rgba(255, 255, 255, 0) 99.8%);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`
const PostFeatureItem = (props) => {
  const { data } = props
  const [category, setCategory] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'categories', data.categoryId)
      const docSnap = await getDoc(docRef)
      setCategory(docSnap.data())
    }
    fetchData()
  }, [data.categoryId])

  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, 'users', data.userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.data) {
          setUser(docSnap.data())
        }
      }
    }
    fetchUser()
  }, [data.userId])
  if (!data || !data.id) return null
  const date = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(date)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    .split(' ')
    .join('-')

  function getMainName(name) {
    return name?.split(' ').slice(-1).join(' ')
  }

  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} alt="unsplash"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && <PostCategory to={category?.slug}>{category.name}</PostCategory>}
          <PostMeta to={slugify(user?.fullname || '', { lower: true })} authorName={getMainName(user?.fullname)} textColor="secondary" date={formatDate}></PostMeta>
        </div>
        <PostTitle to={data.slug} size="big">
          {data.title || 'This is my title'}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  )
}

export default PostFeatureItem
