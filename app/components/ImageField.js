import React from 'react';
import DropZone from "react-dropzone";

const ImageField = ({path, value, onFile}) => {
  const onDrop = (files) => {
    if (files && files[0]) {
      onFile(path, files[0].path);
    }
  }
  return (
    <DropZone onDrop={onDrop} accept="image/*">
      <div>Try dropping some files here, or click to select files to upload.</div>
    </DropZone>
  )
}
export default ImageField
