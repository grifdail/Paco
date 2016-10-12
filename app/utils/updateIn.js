import setIn from './setIn';
import { path as getIn } from 'ramda';

const updateIn = (path, f, from) =>
  setIn(path, f(getIn(path, from)), from);

export default updateIn;
