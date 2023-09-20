import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ImageUpload = (props) => {
  const { name, className = '', progress = 0, image = '', ...rest } = props
  return (
    <label className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}>
      <input type="file" name={name} className="hidden-input" onChange={() => {}} {...rest} />

      {!image && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img src="/img-upload.png" alt="upload-img" className="max-w-[80px] mb-5" />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}

      {image && <img src={image} alt="image" className="object-cover w-full h-full " />}

      {!image && (
        <div
          className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`
          }}></div>
      )}
    </label>
  )
}
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string
}
export default ImageUpload
