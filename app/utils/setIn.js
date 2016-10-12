import { update, assoc } from 'ramda';

// We can't just check the type in case path was serialised to string (For instance to be send as an url).
const isNumeric = value => typeof value === 'number' || /^\d+$/.test(value);

// We use setIn because assocPath is unable to handke array correctly
// [Ramda#assocPath](http://ramdajs.com/docs/#assocPath) turns arrays into objects

const setIn = (fullPath, value, target) =>
  (function recur (path, value, target) {
    if (!path.length) return target;

    const [segment, ...rest] = path;
    const setter = isNumeric(segment) ? update(segment | 0) : assoc(segment);
    const set = value => setter(value, target);

    if (!rest.length) return set(value);

    if (!target.hasOwnProperty(segment)) {
      const pos = fullPath.indexOf(segment);
      const prettified = `[${fullPath.map(segment => `'${segment}'`).join(', ')}]`;

      throw new Error(`Unexpected segment '${segment}' of path ${prettified} at position '${pos}'`);
    }

    return set(recur(rest, value, target[segment]));
  }(fullPath, value, target));

export default setIn;
