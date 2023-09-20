import { useState } from 'react'
import { Button } from '@/components/button'
import { Checkbox, Radio } from '@/components/checkbox'
import { Dropdown } from '@/components/dropdown'
import { Field } from '@/components/field'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import slugify from 'slugify'
import { postStatus } from '@/utils/constants'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import ImageUpload from '@/components/image/ImageUpload'
const PostAddNewStyles = styled.div``
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category: ''
    }
  })
  const watchStatus = watch('status')
  const watchCategory = watch('category')

  const addPostHandler = async (values) => {
    const cloneValues = { ...values }
    cloneValues.slug = slugify(values.slug || values.title)
    cloneValues.status = Number(values.status)
    console.log('🐻 ~ file: PostAddNew.jsx:31 ~ addPostHandler ~ cloneValues:', cloneValues)
    // handleUploadImage(cloneValues.image)
  }

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')

  const handleUploadImage = (file) => {
    const storage = getStorage()

    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progressPercent + '% done')
        setProgress(progressPercent)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            console.log('Nothing at all')
        }
      },
      (error) => {
        console.log('Error:', error.message)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setImage(downloadURL)
        })
      }
    )
  }

  const onSelectImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setValue('image', file)
    handleUploadImage(file)
  }
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
            <ImageUpload onChange={onSelectImage} progress={progress} image={image} />
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
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button kind="primary" type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  )
}

export default PostAddNew
