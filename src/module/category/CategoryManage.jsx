import { ActionDelete, ActionEdit, ActionView } from '@/components/action'
import { Button } from '@/components/button'
import { LabelStatus } from '@/components/label'
import { Table } from '@/components/table'
import { db } from '@/firebase/firebase-config'
import { categoryStatus } from '@/utils/constants'
import { collection, deleteDoc, doc, endAt, getDoc, onSnapshot, or, orderBy, query, startAt, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardHeading from '../dashboard/DashboardHeading'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

const CategoryManage = () => {
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([])
  const [queryValue, setQueryValue] = useState('')

  useEffect(() => {
    const colRef = collection(db, 'categories')
    // const colRef = db.collection('categories')
    // const newRef = queryValue ? query(colRef, where('name', '==', queryValue)) : colRef

    // const fuzzySearch = (query, colRef) => {
    //   return ;
    // }

    // const newRef2 = queryValue ? query(colRef, orderBy('name'), startAt(queryValue), endAt(queryValue + '\uf8ff')) : colRef

    const newRef3 = queryValue ? query(colRef, where('name', '>=', queryValue), where('name', '<=', queryValue + '\uf8ff')) : colRef

    // const sortedRef = query(newRef3, orderBy('name'))

    onSnapshot(newRef3, (snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategoryList(results)
    })
  }, [queryValue])

  const hanleDeleteCategory = async (docId) => {
    const colRef = doc(db, 'categories', docId)
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  const handleFilterChange = debounce((e) => {
    setQueryValue(e.target.value)
  }, 500)

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex items-center justify-end mb-10">
        <input type="text" placeholder="Type anything..." className="px-5 py-4 border border-gray-300 rounded-lg" onChange={(e) => handleFilterChange(e)} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  <LabelStatus type={Number(category.status) === categoryStatus.APPROVED ? 'success' : 'warning'}>
                    {Number(category.status) === categoryStatus.APPROVED ? 'Approved' : 'Unapproved'}
                  </LabelStatus>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                    <ActionDelete onClick={() => hanleDeleteCategory(category.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CategoryManage
