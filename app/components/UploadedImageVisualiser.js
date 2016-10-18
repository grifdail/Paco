import React, {Component} from 'react';
import {Modal, Button, ListGroup, ListGroupItem, Glyphicon, Grid, Row, Thumbnail, Col } from "react-bootstrap";
import { equals, when} from "ramda";
import {getState, preventDefault, getAllImages, getImagePath, Clearfix} from "../utils/utils";

const Header = Modal.Header;
const Title = Modal.Title;
const Body = Modal.Body;
const Footer = Modal.Footer;

class UploadedImageVisualiser extends Component {
  state={showModal: false}
  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {variables, selected, modifiers, onSelect} = this.props;
    const images = getAllImages()
    const onClick = img => () => {
      console.log("ffffffffffffff", onSelect)
      if (onSelect) {
        onSelect(img);
        this.close();
      }
    }
    return (
      <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
        <Header closeButton>
          <Title>Image</Title>
        </Header>
        <Body>
          <div>
          {
            images.map((img,i) => [
              (<div className="grid-thumb">
                <Thumbnail href="#" alt="i" src={getImagePath(img)} onClick={onClick(img)}/>
              </div>),
            //  i % 3 ===2 ? <Clearfix /> : null
            ])
          }

          </div>
        </Body>
        <Footer>
          <Button onClick={this.close}>Close</Button>
        </Footer>
      </Modal>
    );
  }
}



export default UploadedImageVisualiser;
