import { ActionDelete, ActionEdit, ActionView } from '@/components/action'
import { Button } from '@/components/button'
import { LabelStatus } from '@/components/label'
import { Table } from '@/components/table'
import { db } from '@/firebase/firebase-config'
import { categoryStatus, ITEM_PER_PAGE } from '@/utils/constants'
import { collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, onSnapshot, or, orderBy, query, startAfter, startAt, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardHeading from '../dashboard/DashboardHeading'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

const CategoryManage = () => {
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([])
  const [queryValue, setQueryValue] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [totalDocument, setTotalDocument] = useState(0)

  const handleLoadMoreCategory = async () => {
    // Query the first page of docs
    // const first = query(collection(db, 'categories'), limit(ITEM_PER_PAGE))

    // console.log('last', lastVisible)

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const nextRef = query(collection(db, 'categories'), startAfter(lastDoc), limit(ITEM_PER_PAGE))

    onSnapshot(nextRef, (snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategoryList([...categoryList, ...results])
    })
    const documentSnapshots = await getDocs(nextRef)

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
    setLastDoc(lastVisible)
  }

  //handle search and initialValue
  useEffect(() => {
    async function fetchData() {
      try {
        const colRef = collection(db, 'categories')
        const newRef = queryValue ? query(colRef, where('name', '>=', queryValue), where('name', '<=', queryValue + 'utf8')) : query(colRef, limit(ITEM_PER_PAGE))

        const documentSnapshots = await getDocs(newRef)

        // Get the last visible document
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        setLastDoc(lastVisible)
        // console.log('last', lastVisible)

        // const snapshot = await getCountFromServer(colRef)

        onSnapshot(colRef, (snapshot) => {
          setTotalDocument(snapshot.size)
        })

        onSnapshot(newRef, (snapshot) => {
          let results = []
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data()
            })
          })
          setCategoryList(results)
        })
      } catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [queryValue])

  const handleInputFilter = debounce((e) => {
    setQueryValue(e.target.value)
  }, 500)

  //End handle search and initialValue

  //handle delete category
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

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex items-center justify-end mb-10">
        <input onChange={handleInputFilter} type="text" placeholder="Type anything..." className="px-5 py-4 border border-gray-300 rounded-lg" />
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
      {totalDocument > categoryList.length && (
        <div className="mt-10">
          <Button kind="primary" className="mx-auto w-[250px] flex items-center" onClick={handleLoadMoreCategory}>
            Load More <span className="block mr-2 text-3xl">+</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryManage
