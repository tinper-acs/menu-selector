import React from 'react';
import PropTypes from 'prop-types';
// import CSSMotionList from 'rc-animate/lib/CSSMotionList';
import Selection from './Selection';
import SearchInput from '../../SearchInput';
import {formatDisplayValue}  from '../../util'
const NODE_SELECTOR = 'selector';
const NODE_SEARCH = 'search';
const TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';

const SelectorList = props => {
  const {
    selectorValueList,
    choiceTransitionName,
    prefixCls,
    onChoiceAnimationLeave,
    maxTagCount,
    maxTagPlaceholder,
    showSearch,
    valueList,
    inputRef,
    onMultipleSelectorRemove,
    valueField,//key值
    inputDisplay,
  } = props;
  const nodeKeys = [];

  // Check if `maxTagCount` is set
  let myValueList = selectorValueList;
  if (maxTagCount >= 0) {
    myValueList = selectorValueList.slice(0, maxTagCount);
  }

  // Basic selectors
  myValueList.forEach((item) => {
    // const { props: { disabled } = {} } = (valueEntities[value] || {}).node || {};
    let inputVal =  formatDisplayValue(item,inputDisplay,valueList);
    let key = item[valueField] || item.refpk;//兼容初始值可能会没有valueField
    nodeKeys.push({
      key: key,
      type: NODE_SELECTOR,
      label:key,
      value:inputVal,
      disabled:false,
    });
  });

  // Rest node count
  if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
    let content = `+ ${selectorValueList.length - maxTagCount} ...`;
    if (typeof maxTagPlaceholder === 'string') {
      content = maxTagPlaceholder;
    } else if (typeof maxTagPlaceholder === 'function') {
      const restValueList = selectorValueList.slice(maxTagCount);
      content = maxTagPlaceholder(
         restValueList.map(({ value }) => value),
      );
    }

    nodeKeys.push({
      key: 'rc-tree-select-internal-max-tag-counter',
      type: NODE_SELECTOR,
      label: null,
      value: content,
      disabled: true,
    });
  }

  // Search node
  if (showSearch !== false) {
    nodeKeys.push({
      key: '__input',
      type: NODE_SEARCH,
    });
  }
  return (
    <ul
      // keys={nodeKeys}
      className={`${prefixCls}-selection__rendered`}
      // component="ul"
      role="menubar"
      // motionName={choiceTransitionName}
      // onLeaveEnd={onChoiceAnimationLeave}
    >
      {nodeKeys.map(({ type, label, value, disabled, className, style }) => {
        if (type === NODE_SELECTOR) {
          return (
            <Selection
              {...props}
              className={className}
              style={style}
              key={label || TREE_SELECT_EMPTY_VALUE_KEY}
              label={label}
              value={value}
              onRemove={disabled ? null : onMultipleSelectorRemove}
            />
          );
        }
        return (
          <li key={type} className={`${prefixCls}-search ${prefixCls}-search--inline`}>
            <SearchInput {...props} ref={inputRef} needAlign />
          </li>
        );
      })}
    </ul>
  );
};

SelectorList.propTypes = {
  selectorValueList: PropTypes.array,
  choiceTransitionName: PropTypes.string,
  prefixCls: PropTypes.string,
  onChoiceAnimationLeave: PropTypes.func,
  labelInValue: PropTypes.bool,
  showSearch: PropTypes.bool,
  maxTagCount: PropTypes.number,
  maxTagPlaceholder: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  valueEntities: PropTypes.object,
  inputRef: PropTypes.func,
  onMultipleSelectorRemove: PropTypes.func,
};

export default SelectorList;
