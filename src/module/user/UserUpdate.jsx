import { Button } from '@/components/button'
import { Radio } from '@/components/checkbox'
import { Field, FieldCheckboxes } from '@/components/field'
import InputPasswordToggle from '@/components/input/InputPasswordToggle'
import { Label } from '@/components/label'
import { userRoles, userStatus } from '@/utils/constants'
import { Input } from '@/components/input'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import DashboardHeading from '../dashboard/DashboardHeading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '@/firebase/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import slugify from 'slugify'

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange'
  })

  const [params] = useSearchParams()
  const userId = params.get('id')
  const navigate = useNavigate()

  useEffect(() => {
    async function getUserById() {
      if (!userId) return
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        reset(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getUserById()
  }, [userId, reset])

  const handleUpdateUser = async (values) => {
    if (!isValid) return
    try {
      const newValues = { ...values }
      newValues.role = Number.parseInt(newValues.role)
      newValues.status = Number.parseInt(newValues.status)
      newValues.username = slugify(newValues.username || newValues.fullname, {
        lower: true,
        replacement: ' ',
        strict: true,
        trim: true,
        remove: true
      })

      const docRef = doc(db, 'users', userId)

      await updateDoc(docRef, {
        ...newValues
      })
      toast.success('Update category successfully!!!')
      setTimeout(() => {
        navigate('/manage/user')
      }, 1000)
    } catch (error) {
      console.log('🐻 ~ file: UserUpdate.jsx:70 ~ handleUpdateUser ~ error:', error.message)
      toast.error('Update user failed!!!')
    }
  }

  const watchStatus = watch('status')
  const watchRoles = watch('role')

  if (!userId) return null
  return (
    <div>
      <DashboardHeading title="Update user" desc="Update user infomation"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          {/* <ImageUpload className="!rounded-full h-full" onChange={handleSelectImage} image={image} handleDeleteImage={handleDeleteImage} /> */}
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input name="fullname" placeholder="Enter your fullname" control={control}></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input name="username" placeholder="Enter your username" control={control}></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input name="email" placeholder="Enter your email" control={control} type="email"></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle unLabel={true} name="password" placeholder="Enter your password" control={control} type="password"></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio checked={Number(watchStatus) === userStatus.ACTIVE} value={userStatus.ACTIVE} name="status" control={control}>
                Active
              </Radio>
              <Radio checked={Number(watchStatus) === userStatus.PENDING} value={userStatus.PENDING} name="status" control={control}>
                Pending
              </Radio>
              <Radio checked={Number(watchStatus) === userStatus.BANNED} value={userStatus.BANNED} name="status" control={control}>
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio checked={Number(watchRoles) === userRoles.ADMIN} value={userRoles.ADMIN} name="role" control={control}>
                Admin
              </Radio>
              <Radio checked={Number(watchRoles) === userRoles.MODERATOR} value={userRoles.MODERATOR} name="role" control={control}>
                Moderator
              </Radio>
              <Radio checked={Number(watchRoles) === userRoles.USER} value={userRoles.USER} name="role" control={control}>
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" kind="primary" className="mx-auto w-[200px]" isloading={isSubmitting} disabled={isSubmitting}>
          Update User
        </Button>
      </form>
    </div>
  )
}

export default UserUpdate
