import React from 'react';
import LinkEditor from "./LinkEditor";
import {map, toPairs} from "ramda";
import Actions from "../utils/Actions";
import {getState} from "../utils/utils";
import {ListGroup, ListGroupItem, Button, FormControl, ControlLabel, Glyphicon, FormGroup, Collapse} from "react-bootstrap";
import {VariableModalWithButton} from "./VariableModal"

const VariableControlls = ({modifiers, actionIndex, action, path}) => {
  const state = getState();
  return (
    <div>
      <FormGroup>
        <ControlLabel>variable</ControlLabel>
        <VariableModalWithButton modifiers={modifiers} selected={action.variable} onSelect={value => modifiers.setActionParams(path, actionIndex, "variable", value) }/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>value</ControlLabel>
        <FormControl value={action.value} onChange={e => modifiers.setActionParams(path, actionIndex, "value", e.target.value)} type="number"/>
      </FormGroup>
    </div>
  );
}

const SceneControlls = ({modifiers, actionIndex, action, path}) => {
  const state = getState();
  return (
    <div>
    <ControlLabel>scene</ControlLabel>
    <FormControl componentClass="select" placeholder="select" value={action.target} onChange={e => modifiers.setActionParams(path, actionIndex, "target", e.target.value)}>
      {
        map(([key, value]) => <option value={key}  key={key}>{value.name || key}</option>, toPairs(state.game.scenes))
      }
    </FormControl>
    </div>
  );
}

const params = {
  [Actions.goTo]: SceneControlls,
  [Actions.load]: SceneControlls,
  [Actions.setVariable]: VariableControlls,
  [Actions.incrementVariable]: VariableControlls,
  [Actions.multiplyVariable]: VariableControlls,
  [Actions.toggle]: ({modifiers, actionIndex, action, path}) => {
    const state = getState();
    return (
      <div>
        <FormGroup>
          <ControlLabel>variable</ControlLabel>
          <VariableModalWithButton modifiers={modifiers} selected={action.variable} onSelect={value => modifiers.setActionParams(path, actionIndex, "variable", value) }/>
        </FormGroup>
      </div>
    );
  }
}

const Action = ({action, actionIndex, modifiers, path}) => {
  const ParamsEditor = params[action.type];
  return (
    <div  className="action">
      <ControlLabel>Action</ControlLabel>
      <a className="remove-button" onClick={() => modifiers.removeAction(path, actionIndex)}>
        <Glyphicon glyph="remove"/>
      </a>
      <FormGroup>
        <FormControl componentClass="select" placeholder="select" value={action.type} onChange={e => modifiers.setActionParams(path, actionIndex, "type", e.target.value)}>
          {
            map(([key, value]) => <option value={value}  key={key}>{key}</option>, toPairs(Actions))
          }
        </FormControl>
      </FormGroup>
      <ParamsEditor modifiers={modifiers} action={action} actionIndex={actionIndex} path={path}/>
    </div>
  )
}



const Component = ({actions, state, modifiers, path}) => {
  return (
    <div className="action-list">
      <Button bsStyle="primary" onClick={() => modifiers.addAction(path)}><Glyphicon glyph="plus"/>Add action</Button>
      <ListGroup>
        {
          map(([i, action]) => {
            return <ListGroupItem key={i}><Action action={action} modifiers={modifiers} actionIndex={i} key={i} path={path}/></ListGroupItem>
          }, toPairs(actions))
        }
      </ListGroup>
    </div>

  );
};

export default Component;
