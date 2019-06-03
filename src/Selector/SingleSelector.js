import React from 'react';
import generateSelector, { selectorPropTypes } from '../Base/BaseSelector';
import { toTitle, createRef,formatDisplayValue } from '../util';

const Selector = generateSelector('single'); //来自BaseSelector

class SingleSelector extends React.Component {
  static propTypes = {
    ...selectorPropTypes,
  };

  constructor() {
    super();
    this.selectorRef = createRef();
  }

  focus = () => {
    this.selectorRef.current.focus();
  };

  blur = () => {
    this.selectorRef.current.blur();
  };

  renderSelection = () => {
    const { selectorValueList, placeholder, prefixCls,inputDisplay } = this.props;

    let innerNode;

    if (selectorValueList.length) {
      const displayVal = formatDisplayValue(selectorValueList[0],inputDisplay)
      innerNode = (
        <span
          key="value"
          title={toTitle(displayVal)}
          className={`${prefixCls}-selection-selected-value`}
        >
          {displayVal || ''}
        </span>
      );
    } else {
      innerNode = (
        <span key="placeholder" className={`${prefixCls}-selection__placeholder`}>
          {placeholder}
        </span>
      );
    }

    return <span className={`${prefixCls}-selection__rendered`}>{innerNode}</span>;
  };

  render() {
    return (
      <Selector {...this.props} ref={this.selectorRef} renderSelection={this.renderSelection} />
    );
  }
}

export default SingleSelector;
