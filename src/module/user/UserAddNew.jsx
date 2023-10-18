import { Button } from '@/components/button'
import { Radio } from '@/components/checkbox'
import { Field, FieldCheckboxes } from '@/components/field'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import DashboardHeading from '../dashboard/DashboardHeading'
import {} from 'react'
import { useForm } from 'react-hook-form'
import { userStatus, userRoles } from '@/utils/constants'
import { auth, db } from '@/firebase/firebase-config'
import { addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import InputPasswordToggle from '@/components/input/InputPasswordToggle'
import ImageUpload from '@/components/image/ImageUpload'
import useFireBaseImage from '@/hooks/useFirebaseImage'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import slugify from 'slugify'

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      username: '',
      avatar: '',
      email: '',
      password: '',
      status: userStatus.ACTIVE,
      role: userRoles.USER,
      createdAt: new Date()
    }
  })

  const { image, handleResetUpload, progress, handleSelectImage, handleDeleteImage } = useFireBaseImage(setValue, getValues)
  // console.log('🐻 ~ file: UserAddNew.jsx:41 ~ UserAddNew ~ image:', image)

  const handleAddNewUser = async (values) => {
    console.log('🐻 ~ file: UserAddNew.jsx:24 ~ handleAddNewUser ~ values:', values)
    if (!isValid) return

    await createUserWithEmailAndPassword(auth, values.email, values.password)

    const colRef = collection(db, 'users')
    //clone array
    const newValues = { ...values }
    newValues.status = Number(newValues.status)
    newValues.role = Number(newValues.role)
    newValues.username = slugify(newValues.username || newValues.fullname, {
      lower: true,
      replacement: ' ',
      trim: true
    })
    newValues.avatar = image
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp()
      })
      toast.success('Created new user successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      reset({
        fullname: '',
        username: '',
        avatar: '',
        email: '',
        password: '',
        status: userStatus.ACTIVE,
        role: userRoles.USER,
        createdAt: new Date()
      })
    }
  }

  const watchStatus = watch('status')
  const watchRoles = watch('role')
  return (
    <div>
      <DashboardHeading title="New user" desc="Add new user to system"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload className="!rounded-full h-full" onChange={handleSelectImage} image={image} handleDeleteImage={handleDeleteImage} />
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
              {/* <Radio checked={Number(watchRoles) === userRoles.EDITOR} value={userRoles.EDITOR} name="role" control={control}>
                Editor
              </Radio> */}
              <Radio checked={Number(watchRoles) === userRoles.USER} value={userRoles.USER} name="role" control={control}>
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" kind="primary" className="mx-auto w-[200px]" isloading={isSubmitting} disabled={isSubmitting}>
          Add new user
        </Button>
      </form>
    </div>
  )
}

export default UserAddNew
