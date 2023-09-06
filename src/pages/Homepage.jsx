import React from 'react'
import { auth, db } from '@/firebase/firebase-config'
import { signOut } from 'firebase/auth'
const Homepage = () => {
  const handleSignOut = () => {
    signOut(auth)
  }
  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Homepage
