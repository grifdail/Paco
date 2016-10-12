import {assoc, assocPath, merge, path as propPath, remove, equals, dissocPath} from "ramda";
import {generate as shortId} from "shortid";
import Actions from "./Actions";
import setIn from "./setIn";
import {defaultScene, defaultImage, defaultAction, defaultConditions, defaultGame} from "./defaultStates";
import {setUpProject, loadState, saveLastOpenedProject, saveImage} from "./stateSave";

///////////////////////
     // EDITOR //
///////////////////////

export const setProjectPath = (state, projectPath) => {
  setUpProject(projectPath);
  const game = loadState(projectPath) || defaultGame()
  return changeCurrentScene(merge(state, {
    projectPath,
    game,
  }), 'origin')
};
export const closeProject = (state, projectPath) => {
  saveLastOpenedProject(null);
  return merge(state, { projectPath: null });
};
export const changeCurrentScene = (state, newScene) => {
  return merge(state, {
    selectedLink: null,
    currentScene: newScene
  });
};
export const changeCurrentLink = (state, newScene) => {
  return merge(state, {
    selectedLink: newScene,
  });
};

///////////////////////
      // SCENE //
///////////////////////
export const addScene = (state) => {
  const name = shortId();
  const scene = defaultScene(name)
  return assocPath(['game', 'scenes', name], scene, state);
}


export const updateCurrentSceneName = (state, value) => {
  return setIn(['game', 'scenes', state.currentScene, 'name'], value, state);
}


export const setImage = (state, pathFromScene, file) => {
  const newName = saveImage(state.projectPath, file);
  return setIn(['game', 'scenes', state.currentScene, ...pathFromScene], newName, state);
}

///////////////////////
      // LINK //
///////////////////////

export const addLink = (state) => {
  const name = shortId();
  const links = state.game.scenes[state.currentScene].links;
  const newLink = defaultImage(links.length);
  return setIn(['game', 'scenes', state.currentScene, 'links'], [...links,newLink], state);
}
export const setLinkField = (state, link, field, value) => {
  return setIn(['game', 'scenes', state.currentScene, 'links', link|0, field], value, state);
}
export const removeLink = (state, link) => {
  const path = ['game', 'scenes', state.currentScene, 'links'];
  const value = remove(link|0, 1, propPath(path,state))
  const updated = changeCurrentLink(setIn(path, value , state), null);
  return changeCurrentLink(setIn(path, value , state), null);
}

////////////////////////
// ACTION & CONDITION //
////////////////////////
export const addAction = (state, pathFromScene) => {
  const name = shortId();
  const path = ['game', 'scenes', state.currentScene, ...pathFromScene]
  const links = propPath(path, state) || [];
  const newLink = defaultAction();
  return setIn(path, [...links,newLink], state);
}
export const addCondition = (state, pathFromScene) => {
  const name = shortId();
  console.log(name, pathFromScene);
  const path = ['game', 'scenes', state.currentScene, ...pathFromScene]
  const links = propPath(path, state) || [];
  const newLink = defaultConditions();
  return setIn(path, [...links,newLink], state);
}
export const removeAction = (state, pathFromScene, actionID) => {
  const path = ['game', 'scenes', state.currentScene, ...pathFromScene]
  const value = remove(actionID, 1, propPath(path,state))
  return setIn(path, value , state);
}
export const setActionParams = (state, path, action, field, value) => {
  return setIn(['game', 'scenes', state.currentScene, ...path, action|0, field], value, state);
}
///////////////////////
    // Variable //
///////////////////////
export const addVariable = (state) => {
  const name = shortId()
  return assocPath(['game', 'variables', name], name, state)
}
export const removeVariable = (state, oldId) => {
  return dissocPath(['game', 'variables', oldId], state)
}
export const renameVariable = (state, oldId, newName) => {
  return assocPath(['game', 'variables', oldId], newName, state)
}
