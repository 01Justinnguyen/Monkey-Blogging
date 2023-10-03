import { Button } from '@/components/button'
import { Radio } from '@/components/checkbox'
import { Field, FieldCheckboxes } from '@/components/field'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import DashboardHeading from '../dashboard/DashboardHeading'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase-config'

const CategoryUpdate = () => {
  const [category, setCategory] = useState({})
  const { control } = useForm({
    mode: 'onChange',
    defaultValues: {}
  })
  const [params] = useSearchParams()
  const cateId = params.get('id')
  // setCategoryId()

  useEffect(() => {
    async function getCategoryById() {
      const docRef = doc(db, 'categories', params.get('id'))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setCategory(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getCategoryById()
  }, [params])

  console.log('🐻 ~ file: CategoryUpdate.jsx:15 ~ CategoryUpdate ~ category:', category)

  if (!cateId) return null
  return (
    <div>
      <DashboardHeading title="Update category" desc={`Update your category: ${cateId}`}></DashboardHeading>
      <form>
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
              <Radio name="status" control={control} checked={true}>
                Approved
              </Radio>
              <Radio name="status" control={control}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[250px]" type="submit">
          Update category
        </Button>
      </form>
    </div>
  )
}

export default CategoryUpdate
