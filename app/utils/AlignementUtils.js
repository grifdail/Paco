export const top = (setField, id, link) => () => {
  setField(id, 'y', 0)
};
export const bottom = (setField, id, link) => () => {
  setField(id, 'y', 800-link.height)
};
export const center = (setField, id, link) => () => {
  setField(id, 'y', 400-link.height/2);
};

export const left = (setField, id, link) => () => {
  setField(id, 'x', 0)
};
export const right = (setField, id, link) => () => {
  setField(id, 'x', 800-link.width)
};
export const middle = (setField, id, link) => () => {
  setField(id, 'x', 400-link.width/2);
};
