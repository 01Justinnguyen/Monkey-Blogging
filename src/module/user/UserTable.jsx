import {} from 'react'
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
const UserTable = () => {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const colRef = collection(db, 'users')
        const newRef = searchValue ? query(colRef, where('fullname', '>=', searchValue), where('fullname', '<=', searchValue + 'utf8')) : query(colRef)

        onSnapshot(newRef, (snapshot) => {
          let results = []
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data()
            })
          })
          setUserList(results)
        })
      } catch (error) {
        console.log('Errors: ', error)
      }
    }
    fetchData()
  }, [searchValue])

  //handle searchValue change
  // const handleSearchChange = debounce((e) => {
  //   setSearchValue(e.target.value)
  // }, 500)

  //handle delete category
  const handleDeleteUser = async (docId) => {
    const colRef = doc(db, 'users', docId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef)
        Swal.fire('Deleted!', 'Your user has been deleted.', 'success')
      }
    })
  }

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRoles.ADMIN:
        return 'Admin'
      case userRoles.MODERATOR:
        return 'Moderator'
      case userRoles.USER:
        return 'User'

      default:
        break
    }
  }

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case userStatus.BANNED:
        return <LabelStatus type="danger">Rejected</LabelStatus>

      default:
        break
    }
  }

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + '…'}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img className="flex-shrink-0 object-cover w-12 h-12 rounded-md" src={user?.avatar} alt="" />
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-300">{new Date(user.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}</time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user.email}>{user?.email.slice(0, 5) + '…'}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderRoleLabel(Number(user.role))}</td>
        <td>
          <div className="flex items-center gap-x-3">
            {/* <ActionView></ActionView> */}
            <ActionEdit></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user.id)}></ActionDelete>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userList.length > 0 && userList.map((user) => renderUserItem(user))}</tbody>
      </Table>
    </>
  )
}

export default UserTable
