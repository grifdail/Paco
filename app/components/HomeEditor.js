import React from 'react';
import SceneList from "./SceneList";
import SceneEditor from "./SceneEditor";
import {Button, Glyphicon} from "react-bootstrap";
export default ({currentScene, game, selectedLink, modifiers}) => {
  const currentGameScene = game.scenes[currentScene]
  return (
    <div className="root">
      <div className="left-sidebar">
        <div className="remove-button">
          <Button onClick={modifiers.closeProject}><Glyphicon glyph="remove"/></Button>
        </div>
        <div className="scenes-panel">
          <h3>Scenes</h3>
          <SceneList
            onAdd={modifiers.addScene}
            onClick={modifiers.changeCurrentScene}
            list={game.scenes}
            getName={((id, value) => (value.name || id))}
            selected={currentScene}
          />
        </div>
      </div>

      <SceneEditor scene={currentGameScene} id={currentScene} selectedLink={selectedLink} modifiers={modifiers} />
    </div>

  )
}
