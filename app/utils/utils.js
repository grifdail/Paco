import {reduce, map, filter, identity, values, uniq} from "ramda";
import {join} from 'path';

let _getState;

export const setState = fn => (_getState = fn);
export const getState = () =>  _getState();

export const getPathToCurrentLink = () => {
  const state = getState();
  return [...getPathToCurrentScene(), "links", state.selectedLink];
}

export const getPathToCurrentScene = () => {
  const state = getState();
  return ["scene", state.currentScene];
}

export const preventDefault = (fn) =>  {
  return (e, ...args) => {
    e.preventDefault();
    e.stopPropagation();
    return fn(e,...args);
  }
}

export const getImagePath = (image, name, size=200) => {
  return image
    ? join(getState().projectPath, "images", image)
    : "http://dummyimage.com/"+size+"/888/000.png&text="+encodeURIComponent(name);
}


export const getAllImages = () => uniq(filter(identity, reduce((old, scene) => ([...old, scene.image, ...map(link => link.image, scene.links)]), [], values(getState().game.scenes))))
