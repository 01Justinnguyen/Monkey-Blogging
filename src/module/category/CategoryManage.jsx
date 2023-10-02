import { ActionDelete, ActionEdit, ActionView } from '@/components/action'
import { Button } from '@/components/button'
import { LabelStatus } from '@/components/label'
import { Table } from '@/components/table'
import { db } from '@/firebase/firebase-config'
import { categoryStatus } from '@/utils/constants'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardHeading from '../dashboard/DashboardHeading'

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const colRef = collection(db, 'categories')
    onSnapshot(colRef, (snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategoryList(results)
    })
  }, [])
  console.log('🐻 ~ file: CategoryManage.jsx:12 ~ CategoryManage ~ categoryList:', categoryList)
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
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
                  <LabelStatus type={category.status === categoryStatus.APPROVED ? 'success' : 'warning'}>{category.status === categoryStatus.APPROVED ? 'Approved' : 'Unapproved'}</LabelStatus>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete></ActionDelete>
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
