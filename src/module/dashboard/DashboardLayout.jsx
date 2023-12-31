import { useAuth } from '@/contexts/auth-context'
import Homepage from '@/pages/Homepage'
import NotFoundPage from '@/pages/NotFoundPage'
import {} from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'
import Sidebar from './Sidebar'
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
    &-heading {
      font-weight: bold;
      font-size: 35px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.primary};
    }
  }
`
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth()
  if (!userInfo) return <Homepage />
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  )
}

export default DashboardLayout
