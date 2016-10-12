import React from 'react';
import {Nav, NavItem, Button, Glyphicon} from "react-bootstrap";

const List = ({list, selected, onClick, onAdd, getName}) => {
  const a = Object.keys(list).map(id => {
    const name = getName(id, list[id]);
    return <NavItem key={id} onClick={e => onClick(id, list[id])} active={selected===id}>{name}</NavItem>;
  });
  return (
    <Nav bsStyle="pills" stacked>
      {
        a
      }
      <div className="list-add-btn">
        <Button onClick={onAdd} block bsStyle="success"><Glyphicon glyph="plus"/></Button>

      </div>
    </Nav>
  );
};

export default List;
