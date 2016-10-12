import React, { Component } from 'react';
import * as modifiers from '../utils/modifiers';
import {setState} from '../utils/utils';
import {map, partial} from 'ramda';
import { loadState, saveState, getLastOpenedProject } from '../utils/stateSave';
import { defaultGame } from '../utils/defaultStates';

import Home from "./Home"

export default class App extends Component {
  state = loadState() || {
    currentScene: "origin",
    selectedLink: null,
    projectPath: null,
    game: null
  }
  updatedState(newState) {
    saveState(this.state);
  }
  componentWillMount() {
    const lastOpenedProject = getLastOpenedProject();
    if (lastOpenedProject) {
      this._modifiers.setProjectPath(lastOpenedProject);
    }
    setState(() => this.state);
  }
  _modifiers = map(fn => (...args) => this.setState(state => fn(state, ...args), this.updatedState) ,modifiers)
  render() {
    return (
      <Home state={this.state} modifiers={this._modifiers}/>
    );
  }
}
