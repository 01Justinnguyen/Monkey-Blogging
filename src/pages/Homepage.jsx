import React from 'react'
import { auth, db } from '@/firebase/firebase-config'
import { signOut } from 'firebase/auth'
import { styled } from 'styled-components'
import HomeBanner from '@/module/home/HomeBanner'
import Layout from '@/components/layout/Layout'
import HomeFeature from '@/module/home/HomeFeature'
import HomeNewest from '@/module/home/HomeNewest'

const HomePageStyles = styled.div``

const Homepage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  )
}

export default Homepage
