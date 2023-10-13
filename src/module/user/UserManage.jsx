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

const UserManage = () => {
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
  const handleSearchChange = debounce((e) => {
    setSearchValue(e.target.value)
  }, 500)

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

  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create user
        </Button>
      </DashboardHeading>
      <div className="flex items-center justify-end mb-10">
        <input onChange={handleSearchChange} type="text" placeholder="Type anything..." className="px-5 py-4 border border-gray-300 rounded-lg" />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + '…'}</td>
                <td>{user?.email}</td>

                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      className="flex-shrink-0 object-cover w-12 h-12 rounded-md"
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt=""
                    />
                    <div className="flex-1">
                      <h3>{user?.fullname}</h3>
                      <time className="text-sm text-gray-300">{new Date().toLocaleDateString()}</time>
                    </div>
                  </div>
                </td>
                <td>{user?.password}</td>
                {/* <td>
                  <span className="italic text-gray-400">12312</span>
                </td> */}
                <td>
                  <LabelStatus>Success</LabelStatus>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete onClick={() => handleDeleteUser(user.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10">
        <Button kind="primary" className="mx-auto w-[250px] flex items-center">
          Load More <span className="block mr-2 text-3xl">+</span>
        </Button>
      </div>
    </div>
  )
}

export default UserManage
