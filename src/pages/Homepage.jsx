import React from 'react'
import { auth, db } from '@/firebase/firebase-config'
import { signOut } from 'firebase/auth'
import { styled } from 'styled-components'
import Header from '@/components/layout/Header'

const HomePageStyles = styled.div``

const Homepage = () => {
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  )
}

export default Homepage
