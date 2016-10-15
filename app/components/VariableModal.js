import React, {Component} from 'react';
import {Modal, Button, ListGroup, ListGroupItem, Glyphicon } from "react-bootstrap";
import { equals, when} from "ramda";
import {getState, preventDefault} from "../utils/utils";

const Header = Modal.Header;
const Title = Modal.Title;
const Body = Modal.Body;
const Footer = Modal.Footer;

class VariableModal extends Component {
  state={showModal: false}
  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {variables, selected, modifiers, onSelect} = this.props;
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Header closeButton>
          <Title>Modal heading</Title>
        </Header>
        <Body>
          <ListGroup>
            {
              Object.keys(variables).map(item => (
                <ListGroupItem key={item} active={item===selected} onClick={e => (e.target === e.currentTarget ? this.close(onSelect(item, variables[item])) : null)} >
                  <input className="invisible-input" onChange={preventDefault((e) => modifiers.renameVariable(item, e.target.value)) }  onKeyDown={ e=> e.keyCode == 32 ?  e.preventDefault() : null } value={variables[item]} key={item} />
                </ListGroupItem>
              ))
            }
            <ListGroupItem onClick={() => modifiers.addVariable()} ><Glyphicon glyph="plus"/> Add variable</ListGroupItem>
          </ListGroup>

        </Body>
        <Footer>
          <Button onClick={this.close}>Close</Button>
        </Footer>
      </Modal>
    );
  }
}



export default VariableModal;

export class VariableModalWithButton extends Component {
  render() {
    const {selected, modifiers} = this.props;
    const variables = getState().game.variables || {};
    return (
      <div>
        <VariableModal ref="modal" {...this.props} variables={variables}/>
        <Button onClick={() => this.refs.modal.open()}>variable : <strong>{variables[selected]}</strong></Button>
      </div>
    )
  }
}
