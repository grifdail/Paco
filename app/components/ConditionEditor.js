import React from 'react';
import LinkEditor from "./LinkEditor";
import {map, toPairs, keys} from "ramda";
import {ConditionTypes} from "../utils/Conditions";
import {getState} from "../utils/utils";
import {ListGroup, ListGroupItem, Button, FormControl, ControlLabel, Glyphicon, FormGroup, Collapse} from "react-bootstrap";
import {VariableModalWithButton} from "./VariableModal"



const Conditions = ({condition, conditionIndex, modifiers, path}) => {
  return (
    <div  className="condition">

      <a className="remove-button" onClick={() => modifiers.removeAction(path, conditionIndex)}>
        <Glyphicon glyph="remove"/>
      </a>
      <FormGroup>
        <ControlLabel>If variable</ControlLabel>
        <VariableModalWithButton modifiers={modifiers} selected={condition.variable} onSelect={value => modifiers.setActionParams(path, conditionIndex, "variable", value) }/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>is</ControlLabel>
        <FormControl componentClass="select" placeholder="select" value={condition.type} onChange={e => modifiers.setActionParams(path, conditionIndex, "type", e.target.value)}>
          {
            map(key => <option value={key}  key={key}>{key}</option>, keys(ConditionTypes))
          }
        </FormControl>
      </FormGroup>

      <FormGroup>
        <ControlLabel>than</ControlLabel>
        <FormControl value={condition.value} onChange={e => modifiers.setActionParams(path, conditionIndex, "value", e.target.value)} type="number"/>
      </FormGroup>
    </div>
  )
}



const Component = ({conditions, state, modifiers, path}) => {
  return (
    <div className="condition-list">
      <Button bsStyle="primary" onClick={() => modifiers.addCondition(path)}><Glyphicon glyph="plus"/>Add condition</Button>
      <ListGroup>
        {
          map(([i, condition]) => {
            return <ListGroupItem key={i}><Conditions condition={condition} modifiers={modifiers} conditionIndex={i} key={i} path={path}/></ListGroupItem>
          }, toPairs(conditions))
        }
      </ListGroup>
    </div>

  );
};

export default Component;
