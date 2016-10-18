import React from 'react';
import {map, values} from 'ramda';

import {getState, getImagePath} from "../utils/utils";


const SceneList = ({projectPath, scene, modifiers}) => {

  return (
    <div className="game-canvas">
      <img src={getImagePath(scene.image, scene.name, 800)} className="background"/>
      {
        values(map(({image, x, y, width, height, name}) => {
          return <img key={name} src={getImagePath(image, name)} style={{
            top: y, left:x, width: width, height: height
          }} />
        }, scene.links))
      }
    </div>
  );
};

export default SceneList;
