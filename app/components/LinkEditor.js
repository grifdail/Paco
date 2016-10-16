import React from 'react';
import ActionsEditor from "./ActionsEditor"
import ConditionEditor from "./ConditionEditor"
import ImageField from "./ImageField"
import * as alignement from "../utils/AlignementUtils"

import {Form, FormGroup, InputGroup, FormControl, Button, Glyphicon, ButtonGroup, Tabs, Tab, ButtonToolbar} from "react-bootstrap";
const Addon = InputGroup.Addon;
const SceneList = ({link, id, modifiers}) => {
  const {
    x, y, width, height, image, name
  } = link
  return (
    <div className="image-editor">
      <h4><input className="invisible-input" value={name} onChange={(e) => modifiers.setLinkField(id, "name", e.target.value)} /></h4>
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={() => modifiers.cloneLink(id) }><Glyphicon glyph='duplicate'/></Button>
          <Button onClick={() => modifiers.removeLink(id) }><Glyphicon glyph='remove'/></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={alignement.top(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-top'/></Button>
          <Button onClick={alignement.center(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-horizontal'/></Button>
          <Button onClick={alignement.bottom(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-bottom'/></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={alignement.left(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-left'/></Button>
          <Button onClick={alignement.middle(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-vertical'/></Button>
          <Button onClick={alignement.right(modifiers.setLinkField, id, link) }><Glyphicon glyph='object-align-right'/></Button>
        </ButtonGroup>


      </ButtonToolbar>
      <Tabs defaultActiveKey="0" id="link-tab-editor">
        <Tab title="Params" eventKey="0">
          <Form horizontal>
            <FormGroup>
              <InputGroup>
                <Addon >X</Addon>
                <FormControl value={x} onChange={(e) => modifiers.setLinkField(id, "x", e.target.value|0)} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Addon >Y</Addon>
                <FormControl value={y} onChange={(e) => modifiers.setLinkField(id, "y", e.target.value|0)} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Addon >width</Addon>
                <FormControl value={width} onChange={(e) => modifiers.setLinkField(id, "width", e.target.value|0)} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Addon >height</Addon>
                <FormControl value={height} onChange={(e) => modifiers.setLinkField(id, "height", e.target.value|0)} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Addon >image</Addon>
                <ImageField path={["links", id, "image"]} value={image} onFile={modifiers.setImage}/>
              </InputGroup>
            </FormGroup>


          </Form>
        </Tab>
        <Tab title="Action" eventKey="1">
          <ActionsEditor actions={link.actions} modifiers={modifiers} path={["links", id, "actions"]} />
        </Tab>
        <Tab title="Condition" eventKey="2">
          <ConditionEditor conditions={link.conditions} modifiers={modifiers} path={["links", id, "conditions"]} />
        </Tab>

      </Tabs>
    </div>
  );
};

export default SceneList;
