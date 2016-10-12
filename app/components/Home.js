import React from 'react';
import FileSelector from './FileSelector';
import HomeEditor from './HomeEditor';

export default ({state, modifiers}) => {
  return state.projectPath ? <HomeEditor {...state} modifiers={modifiers}/> : <FileSelector modifiers={modifiers} />
}
