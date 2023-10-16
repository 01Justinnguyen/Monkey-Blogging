import { ActionDelete, ActionEdit, ActionView } from '@/components/action'
import { Button } from '@/components/button'
import { LabelStatus } from '@/components/label'
import { Table } from '@/components/table'
import { db } from '@/firebase/firebase-config'
import { collection, deleteDoc, doc, limit, onSnapshot, query, where } from 'firebase/firestore'
import { debounce } from 'lodash'
import { useState } from 'react'
import { useEffect } from 'react'
import {} from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeading from '../dashboard/DashboardHeading'
import Swal from 'sweetalert2'
import { userRoles, userStatus } from '@/utils/constants'
import UserTable from './UserTable'

const UserManage = () => {
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create user
        </Button>
      </DashboardHeading>
      {/* <div className="flex items-center justify-end mb-10">
        <input onChange={handleSearchChange} type="text" placeholder="Type anything..." className="px-5 py-4 border border-gray-300 rounded-lg" />
      </div> */}
      <UserTable />
      <div className="mt-10">
        <Button kind="primary" className="mx-auto w-[250px] flex items-center">
          Load More <span className="block mr-2 text-3xl">+</span>
        </Button>
      </div>
    </div>
  )
}

export default UserManage
