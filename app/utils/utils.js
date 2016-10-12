
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
