import React, {Component} from 'react';
import DropZone from "react-dropzone";
import UploadedImageVisualiser from "./UploadedImageVisualiser";
import {Tabs, Tab, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem} from "react-bootstrap";


const ImageField = ({path, value, onFile}) => {
  const onDrop = (files) => {
    if (files && files[0]) {
      onFile(path, files[0].path);
    }
  }
  return (
    <DropZone onDrop={onDrop} accept="image/*" className="image-field">
      <div>Try dropping some files here, or click to select files to upload.</div>
    </DropZone>
  )
}

class ImageFieldWithDropDown extends Component {
  _handleSelect = () => {
    this.refs.modal.open();
  }
  render() {
    const {path, value, onFile, label, onSelect} = this.props;
    return (
      <div>
        <InputGroup>
          <DropdownButton
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title={label}
            >
              <MenuItem key="1" onClick={this._handleSelect}>Image allready used</MenuItem>
          </DropdownButton>
          <ImageField path={path} value={value} onFile={onFile}/>
        </InputGroup>
        <UploadedImageVisualiser ref="modal" onSelect={onSelect}/>
      </div>

    )
  }
}


export default ImageFieldWithDropDown
