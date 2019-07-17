import { isLabelInValue } from './util';
import PropTypes from 'prop-types';

const internalValProp = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.object),
]);


export function genArrProps(propType) {
  return PropTypes.oneOfType([
    propType,
  ]);
}


/**
 * Origin code check `multiple` is true when `treeCheckStrictly` & `labelInValue`.
 * But in process logic is already cover to array.
 * Check array is not necessary. Let's simplify this check logic.
 */
export function valueProp(...args) {
  const [props, propName, Component] = args;
  if (typeof (props[propName]) === 'string') {
    if (!/refname/.test(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${Component}\`. ` +
        `缺少refname 。You should use '{ "refname": string, "refpk": string  } 'instead. `
      );
    }
    if (!/refpk/.test(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${Component}\`. ` +
        `缺少refpk 。You should use '{ "refname": string, "refpk": string  } 'instead. `
      );
    }
    // if (props.valueField !== 'refpk') {
    //   return new Error(
    //     `Invalid prop \`${propName}\` supplied to \`${Component}\`. ` +
    //     `when you  use '{ "refname": string, "refpk": string  } ',please let valueField equals 'refpk'. `
    //   );
    // }
    return null;
  }

const err = genArrProps(internalValProp)(...args);
  if (err) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${Component}\`. ` +
      `You should use string or [object] instead.`
    );
  }
  return null;
}