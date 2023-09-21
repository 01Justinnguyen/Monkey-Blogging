import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'

const useFireBaseImage = (setValue, getValues) => {
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')

  if (!setValue || !getValues) return

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setImage(downloadURL)
          setProgress(0)
        })
      }
    )
  }

  const handleSelectImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setValue('imageName', file.name)
    handleUploadImage(file)
  }

  const handleDeleteImage = () => {
    const storage = getStorage()
    const imageRef = ref(storage, 'images/' + getValues('imageName'))
    deleteObject(imageRef)
      .then(() => {
        console.log('Xoá thành công ảnh rồi nhé')
        setImage('')
        setProgress(0)
      })
      .catch((error) => {
        console.log('Errors: ', error)
      })
  }
  return {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage
  }
}

export default useFireBaseImage
