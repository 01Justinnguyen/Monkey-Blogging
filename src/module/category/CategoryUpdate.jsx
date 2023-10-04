import { Button } from '@/components/button'
import { Radio } from '@/components/checkbox'
import { Field, FieldCheckboxes } from '@/components/field'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardHeading from '../dashboard/DashboardHeading'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'
import { categoryStatus } from '@/utils/constants'
import slugify from 'slugify'
import { toast } from 'react-toastify'

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: {}
  })
  const [params] = useSearchParams()
  const categoryId = params.get('id')
  const navigate = useNavigate()

  useEffect(() => {
    async function getCategoryById() {
      const docRef = doc(db, 'categories', categoryId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        reset(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getCategoryById()
  }, [categoryId, reset])
  const watchStatus = watch('status')

  const handleUpdateCategory = async (values) => {
    const docRef = doc(db, 'categories', categoryId)

    await updateDoc(docRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status)
    })
    toast.success('Update category successfully!!!')
    setTimeout(() => {
      navigate('/manage/category')
    }, 1000)
  }

  if (!categoryId) return null
  return (
    <div>
      <DashboardHeading title="Update category" desc={`Update your category: ${categoryId}`}></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input control={control} name="name" placeholder="Enter your category name" required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} name="slug" placeholder="Enter your slug"></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status" control={control} checked={Number(watchStatus) === categoryStatus.APPROVED} value={categoryStatus.APPROVED}>
                Approved
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus) === categoryStatus.UNAPPROVED} value={categoryStatus.UNAPPROVED}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[250px]" type="submit" isloading={isSubmitting} disabled={isSubmitting}>
          Update category
        </Button>
      </form>
    </div>
  )
}

export default CategoryUpdate
