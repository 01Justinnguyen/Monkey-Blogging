import { useEffect } from 'react'
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
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'
const PostAddNewStyles = styled.div``
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category: ''
    }
  })
  const watchStatus = watch('status')
  const watchHot = watch('hot')
  console.log('🐻 ~ file: PostAddNew.jsx:28 ~ PostAddNew ~ watchHot:', watchHot)
  // eslint-disable-next-line no-unused-vars
  // const watchCategory = watch('category')

  const addPostHandler = async (values) => {
    const cloneValues = { ...values }
    cloneValues.slug = slugify(values.slug || values.title)
    cloneValues.status = Number(values.status)
    console.log('🐻 ~ file: PostAddNew.jsx:31 ~ addPostHandler ~ cloneValues:', cloneValues)
    // handleUploadImage(cloneValues.image)
  }

  const { image, progress, handleSelectImage, handleDeleteImage } = useFireBaseImage(setValue, getValues)

  //handle get categories
  useEffect(() => {
    async function getCategories() {
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
      console.log('🐻 ~ file: PostAddNew.jsx:51 ~ getCategories ~ listCategories:', listCategories)
    }
    getCategories()
  }, [])

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
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
        <Button kind="primary" type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  )
}

export default PostAddNew
