import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import { createRef } from '../util';

export const popupContextTypes = {
  onPopupKeyDown: PropTypes.func.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
  onMenuMultipleSelect: PropTypes.func.isRequired,
};

class BasePopup extends React.Component {
  constructor() {
    super();
    this.menuRef = createRef();
  }
  static contextTypes = {
    rcTreeSelect: PropTypes.shape({
      ...popupContextTypes,
    }),
  };

  getTree = () => {
    return this.treeRef.current;
  };


  renderNotFound = () => {
    const { prefixCls, notFoundContent } = this.props;

    return <span className={`${prefixCls}-not-found`}>{notFoundContent}</span>;
  };

  render() {
    const {
      prefixCls,
      multiple,
      ariaId,
      renderSearch,
      valueList,
      menuProps,
      selectorValueMap,
      valueField
    } = this.props;
    const {
      rcTreeSelect: { onPopupKeyDown,onMenuSelect,onMenuMultipleSelect},
    } = this.context;
    // let menuItemProps = {};
    // if(multiple){
    //   menuItemProps.onSelect = onMenuMultipleSelect;
    // }else{
    //   menuItemProps.onClick = onMenuSelect
    // }
    let $notFound,$cloneMenuItems=[];
    if (!valueList || !valueList.length) {
      $notFound = this.renderNotFound();
    }else{
        valueList.forEach(item=>{
          let _checked = Object.keys(selectorValueMap).indexOf(item[valueField]) > -1
          $cloneMenuItems.push(
            <li 
            role="option" 
            unselectable="on" 
            className={`${prefixCls}-dropdown-menu-item ${_checked?`${prefixCls}-dropdown-menu-item-selected`:``}`}
            key={item[valueField]} 
            // value={JSON.stringify(item)} 
            onClick={multiple?()=>{onMenuMultipleSelect(item,_checked)}:()=>{onMenuSelect(item,_checked)}}
            >
              {item.value || item[valueField]}  
            </li>
          )
        })
    }
    let $content;
    if ($notFound) {
      $content = $notFound;
    } else {
      $content = (
        <ul
          ref={this.menuRef}
          {...menuProps}
          style={this.props.dropdownMenuStyle}
          role="listbox"
          className={`${prefixCls}-dropdown-menu ${prefixCls}-dropdown-menu-root`}
        >
          {$cloneMenuItems}
        </ul>
      );
    }

    return (
      <div role="listbox" id={ariaId} onKeyDown={onPopupKeyDown} tabIndex={-1}>
        {renderSearch ? renderSearch() : null}
        {$content}
      </div>
    );
  }
}

polyfill(BasePopup);

export default BasePopup;
