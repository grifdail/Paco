import React from 'react';
import { PanelGroup, Panel, Button, Glyphicon } from "react-bootstrap";
import LinkEditor from "./LinkEditor";



const List = ({list, selected, onClick, onAdd, onDelete, getName, modifiers}) => {
  return (
    <div>
      <div className="image-list">
        {
          Object.keys(list).map(id => {
           const name = getName(id, list[id]);
           const isSelected = selected == id;
           return (
             <Button
               key={id}
               bsStyle={isSelected ? "primary" : "default"}
               onClick={e => isSelected ? onClick(null) : onClick(id, list[id])}
             >
             {name}
             </Button>

           );
         })
        }
        <Button onClick={onAdd} bsStyle="success"><Glyphicon glyph="plus"/> Add Image</Button>
      </div>
      {selected ? <LinkEditor link={list[selected]} id={selected} modifiers={modifiers} /> : <h3>No image selected</h3>}
    </div>
  );
};

export default List;
