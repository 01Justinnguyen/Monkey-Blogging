import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import Homepage from './pages/Homepage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
