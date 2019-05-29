

// =================== MISC ====================
export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}
// Shallow copy of React 16.3 createRef api
export function createRef() {
    const func = function setRef(node) {
      func.current = node;
    };
    return func;
  }


// =============== Accessibility ===============
let ariaId = 0;

export function resetAriaId() {
  ariaId = 0;
}

export function generateAriaId(prefix) {
  ariaId += 1;
  return `${prefix}_${ariaId}`;
}
export function isLabelInValue(props) {
  const { labelInValue } = props;
  return labelInValue || false;
}
