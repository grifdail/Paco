import React from 'react';
import {map, values} from 'ramda';
import {join} from 'path';
import {getState} from "../utils/utils";

const getImage = (image, name, size=200) => {
  return image
    ? join(getState().projectPath, "images", image)
    : "http://dummyimage.com/"+size+"/888/000.png&text="+encodeURIComponent(name);
}

const SceneList = ({projectPath, scene, modifiers}) => {

  return (
    <div className="game-canvas">
      <img src={getImage(scene.image, scene.name, 800)} className="background"/>
      {
        values(map(({image, x, y, width, height, name}) => {
          return <img key={name} src={getImage(image, name)} style={{
            top: y, left:x, width: width, height: height
          }} />
        }, scene.links))
      }
    </div>
  );
};

export default SceneList;
