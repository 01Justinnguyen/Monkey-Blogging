import { ActionDelete, ActionEdit, ActionView } from '@/components/action'
import { Button } from '@/components/button'
import { LabelStatus } from '@/components/label'
import { Table } from '@/components/table'
import { db } from '@/firebase/firebase-config'
import { categoryStatus } from '@/utils/constants'
import { collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, onSnapshot, or, orderBy, query, startAfter, startAt, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DashboardHeading from '../dashboard/DashboardHeading'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import ReactPaginate from 'react-paginate'
import { async } from '@firebase/util'

const itemsPerPage = 5

const CategoryManage = () => {
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([])
  const [queryValue, setQueryValue] = useState('')
  // const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const colRef = collection(db, 'categories')

    async function test() {
      const first = query(colRef, orderBy('name'), limit(10))
      const documentSnapshots = await getDocs(first)

      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      console.log('last', lastVisible.data())

      const next = query(colRef, orderBy('name'), startAfter(lastVisible), limit(10))
      console.log('🐻 ~ file: CategoryManage.jsx:36 ~ test ~ next:', next.firestore)
    }

    test()

    // async function test() {
    //   const colRef = collection(db, 'categories')
    //   const snapshot = await getCountFromServer(colRef)
    //   setTotalItems(snapshot.data().count)
    // }
    // test()

    // const colRef = db.collection('categories')
    // const newRef = queryValue ? query(colRef, where('name', '==', queryValue)) : colRef

    // const fuzzySearch = (query, colRef) => {
    //   return ;
    // }

    // const newRef2 = queryValue ? query(colRef, orderBy('name'), startAt(queryValue), endAt(queryValue + '\uf8ff')) : colRef

    const newRef = queryValue ? query(colRef, where('name', '>=', queryValue), where('name', '<=', queryValue + 'utf8')) : colRef
    // const sortedRef = query(newRef3, orderBy ('name'))

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

  // // Here we use item offsets; we could also use page offsets
  // // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0)

  // // Simulate fetching items from another resources.
  // // (This could be items from props; or items loaded in a local state
  // // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage
  // const pageCount = Math.ceil(totalItems / itemsPerPage)

  // // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % totalItems
  //   console.log(`User requested page number ${event.selected + 1}, which is offset ${newOffset}`)
  //   // setItemOffset(newOffset)
  // }

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
      {/* <ReactPaginate breakLabel="..." nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="< previous" renderOnZeroPageCount={null} /> */}
    </div>
  )
}

export default CategoryManage
