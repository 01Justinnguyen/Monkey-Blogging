import Heading from '@/components/layout/Heading'
import { db } from '@/firebase/firebase-config'
import PostFeatureItem from '../post/PostFeatureItem'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
const HomeFeatureStyles = styled.div``

const HomeFeature = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const colRef = collection(db, 'posts')
    const queries = query(colRef, where('status', '==', 1), where('hot', '==', true), limit(3))
    onSnapshot(queries, (snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPosts(results)
    })
  }, [])

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  )
}

export default HomeFeature
