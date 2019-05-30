

// =================== MISC ====================
export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}
export function toArray(data) {
  if (data === undefined || data === null) return [];

  return Array.isArray(data) ? data : [data];
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

// =============== Legacy ===============
export const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

export const UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable',
};


// =================== Value ===================
/**
 * Convert value to array format to make logic simplify.
 */
export function formatInternalValue(value, props) {
  const valueList = toArray(value);

  // Parse label in value
  if (isLabelInValue(props)) {
    return valueList.map(val => {
      if (typeof val !== 'object' || !val) {
        return {
          value: '',
          label: '',
        };
      }

      return val;
    });
  }

  return valueList.map(val => ({
    value: val,
  }));
}

export function getRefname(wrappedValue) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }
  // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.
  return wrappedValue.label;
}

/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 *
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */
export function formatSelectorValue(valueList) {
  return valueList.map(wrappedValue => ({
    label: getRefname(wrappedValue),
    value: wrappedValue.value,
  }));
}