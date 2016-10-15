import React from 'react';
import {Nav, NavItem, Button, Glyphicon, ButtonGroup} from "react-bootstrap";
import {preventDefault} from "../utils/utils";

const List = ({list, selected, onClick, onAdd, getName, cloneScene, removeScene}) => {
  const a = Object.keys(list).map(id => {
    const name = getName(id, list[id]);
    return <NavItem key={id} onClick={e => onClick(id, list[id])} active={selected===id}>
    {name}
    <ButtonGroup>
      <Button onClick={ preventDefault(() => cloneScene(id)) }><Glyphicon glyph='duplicate'/></Button>
      {id === 'origin' ? null : <Button onClick={ preventDefault(() => removeScene(id)) }><Glyphicon glyph='remove'/></Button>}

    </ButtonGroup>
    </NavItem>;
  });
  return (
    <Nav bsStyle="pills" stacked>
      {
        a
      }
      <div className="list-add-btn">
        <Button onClick={onAdd} block bsStyle="success"><Glyphicon glyph="plus"/>Add a scene</Button>

      </div>
    </Nav>
  );
};

export default List;
