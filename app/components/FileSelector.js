import React from 'react';
import {Button, Jumbotron} from "react-bootstrap";
const {dialog, app} = require('electron').remote


export default ({state, modifiers}) => {
  const handlePick = () => {
    dialog.showOpenDialog({
      title: "Open Project",
      defaultPath: app.getPath('documents'),
      properties: ['openDirectory', 'createDirectory' ]
    }, ([path] = []) => {
      if (path) {
        modifiers.setProjectPath(path)
      }

    })
  }
  return (
    <div className="file-selector">
      <Jumbotron>
        <h1>Welcome</h1>
        <p>To start, open a project folder. To create a new project, just pick an empty folder</p>
        <p><Button bsStyle="primary" onClick={handlePick} >Open a project</Button></p>
      </Jumbotron>
    </div>


  )
}
