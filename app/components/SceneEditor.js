import React from 'react';
import ActionsEditor from "./ActionsEditor"
import ImageList from "./ImageList";
import Game from "./Game";
import {Tabs, Tab, FormGroup, ControlLabel} from "react-bootstrap";
import ImageField from "./ImageField"

const SceneEditor = ({scene, id, selectedLink, modifiers}) => {
  return (
    <div className="scene-root">

      <div className="canvas">
      <Game scene={scene} modifiers={modifiers}/>
      </div>
      <div className="scene-editor">
        <div>
          <div>
            <h3><input className="invisible-input" value={scene.name} onChange={e => modifiers.updateCurrentSceneName(e.target.value)} /></h3>
          </div>
          <Tabs defaultActiveKey={0} id="scene-tab-editor">
            <Tab title="Params" eventKey={0}>
              <FormGroup>
                  <ControlLabel>background</ControlLabel>
                  <ImageField path={["image"]} value={scene.image} onFile={modifiers.setImage}/>
              </FormGroup>
            </Tab>
            <Tab title="images" eventKey={1}>
              <ImageList
                onAdd={modifiers.addLink}
                onDelete={modifiers.removeLink}
                onClick={modifiers.changeCurrentLink}
                list={scene.links}
                getName={((id, value) => (value.name || id))}
                selected={selectedLink}
                modifiers={modifiers}
              />
            </Tab>
            <Tab title="action" eventKey={2}>
              <ActionsEditor actions={scene.actions} modifiers={modifiers} path={["actions"]} />;
            </Tab>
          </Tabs>


        </div>

      </div>
    </div>
  );
};

export default SceneEditor;
