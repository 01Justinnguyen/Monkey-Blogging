import { useEffect, useState } from 'react'
import { Button } from '@/components/button'
import { Radio } from '@/components/checkbox'
import { Field } from '@/components/field'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import slugify from 'slugify'
import { postStatus } from '@/utils/constants'
import ImageUpload from '@/components/image/ImageUpload'
import useFireBaseImage from '@/hooks/useFirebaseImage'
import Toggle from '@/components/toggle/Toggle'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'
import { Dropdown } from '@/components/dropdown'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'react-toastify'
import DashboardHeading from '../dashboard/DashboardHeading'
const PostAddNewStyles = styled.div``
const PostAddNew = () => {
  const { userInfo } = useAuth()
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      image: '',
      title: '',
      slug: '',
      status: 2,
      categoryId: '',
      hot: false
    }
  })
  const { image, handleResetUpload, progress, handleSelectImage, handleDeleteImage } = useFireBaseImage(setValue, getValues)
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState({})
  const [loading, setLoading] = useState(false)
  const watchStatus = watch('status')
  const watchHot = watch('hot')
  // eslint-disable-next-line no-unused-vars
  // const watchCategory = watch('category')

  const addPostHandler = async (values) => {
    setLoading(true)
    try {
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.title, { lower: true })
      cloneValues.status = Number(values.status)
      const colRef = collection(db, 'posts')
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp()
      })
      toast.success('Create a new post succesfully!!!')
      reset({
        title: '',
        slug: '',
        status: 2,
        categoryId: '',
        hot: false,
        image: ''
      })
      handleResetUpload()
      setSelectCategory({})
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  //handle get categories
  useEffect(() => {
    try {
      const getCategories = async () => {
        const colRef = collection(db, 'categories')
        const q = query(colRef, where('status', '==', 1))
        const querySnapshot = await getDocs(q)
        let listCategories = []
        querySnapshot.forEach((doc) => {
          listCategories.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setCategories(listCategories)
      }
      getCategories()
    } catch (error) {
      console.log('🐻 ~ file: PostAddNew.jsx:77 ~ useEffect ~ error:', error)
    }
  }, [])

  const handleClickOption = (category) => {
    setValue('categoryId', category.id)
    setSelectCategory(category)
  }

  function capitalizeFirstLetter(inputString) {
    // Kiểm tra xem chuỗi đầu vào có độ dài là 0 không
    if (inputString.length === 0) {
      return inputString
    }
    // Chuyển chữ cái đầu tiên thành chữ hoa và nối với phần còn lại của chuỗi
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
  }

  useEffect(() => {
    document.title = 'Monkey Blogging - Add New Post'
  }, [])

  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add new post" className="dashboard-heading"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input control={control} placeholder="Enter your title" name="title" required></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input control={control} placeholder="Enter your slug" name="slug"></Input>
          </Field>
          <Field>
            <Label>Image</Label>
            <ImageUpload onChange={handleSelectImage} progress={progress} image={image} handleDeleteImage={handleDeleteImage} />
          </Field>
          <Field>
            <Label>Categories</Label>
            <Dropdown>
              <Dropdown.Select placeholder={capitalizeFirstLetter(`${selectCategory?.name || 'Select category'}`)} />
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Dropdown.Option key={category.id} onClick={() => handleClickOption(category)}>
                      {category.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">{selectCategory?.name}</span>}
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio name="status" control={control} checked={Number(watchStatus) === postStatus.APPROVED} value={postStatus.APPROVED}>
                Approved
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus) === postStatus.PENDING} value={postStatus.PENDING}>
                Pending
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus) == postStatus.REJECTED} value={postStatus.REJECTED}>
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input control={control} placeholder="Find the author" name="author"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle on={watchHot === true} onClick={() => setValue('hot', !watchHot)} />
          </Field>
        </div>
        <Button className="mx-auto w-[250px]" kind="primary" type="submit" isloading={loading} disabled={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  )
}

export default PostAddNew
