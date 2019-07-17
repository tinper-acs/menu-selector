import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import { createRef } from '../util';
import Pagination from 'bee-pagination';
import Loading from 'bee-loading';
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
    return this.menuRef.current;
  };


  renderNotFound = () => {
    const { prefixCls, notFoundContent } = this.props;

    return <span className={`${prefixCls}-not-found`}>{notFoundContent}</span>;
  };
  
  onItemClick = (event,item,_checked) =>{
   const {multiple} = this.props;
   const {
      rcTreeSelect: {onMenuSelect,onMenuMultipleSelect},
    } = this.context;
    if(multiple){
      onMenuMultipleSelect(item,_checked)
    }else{
      onMenuSelect(item,_checked)
    }
    
  }
  render() {
    const {
      dropdownPrefixCls,
      multiple,
      ariaId,
      renderSearch,
      valueList,
      menuProps,
      selectorValueMap,
      valueField,
      pageCount,
      totalElements,
      currPageIndex,
      onPaginationSelect,
      displayField,
      topPagination,
    } = this.props;
    const {
      rcTreeSelect: { onPopupKeyDown,onMenuSelect,onMenuMultipleSelect},
    } = this.context;
    let $notFound,$cloneMenuItems=[];
    if (!valueList || !valueList.length) {
      $notFound = this.renderNotFound();
    }else{
        valueList.forEach(item=>{
          let text = '';
          if (typeof displayField === 'string') {
            text = displayField.format(item)
          } else if (typeof displayField === 'function') {
            text = displayField(item);
          } else {
            text = item.refname || 'refname miss';
          }
          let _checked = Object.keys(selectorValueMap).indexOf(item[valueField]) > -1
          $cloneMenuItems.push(
            <li 
            role="option" 
            unselectable="on" 
            className={`${dropdownPrefixCls}-menu-item ${_checked?`${dropdownPrefixCls}-menu-item-selected`:``}`}
            key={item[valueField]} 
            // value={JSON.stringify(item)} 
            onClick={(e)=>this.onItemClick(e,item,_checked)}
            >
              {/* {item.value || item[valueField]}   */}
              {text}
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
          className={`${dropdownPrefixCls}-menu ${dropdownPrefixCls}-menu-root`}
        >
          {$cloneMenuItems}
        </ul>
      );
    }

    return (
      <div role="listbox" id={ariaId} onKeyDown={onPopupKeyDown} tabIndex={-1}>
        <Loading show={this.props.loading} container={this} />
        {renderSearch ? renderSearch() : null}
        {!topPagination && $content}
        {
          !!pageCount && 
          <div className={`${dropdownPrefixCls}-pagination`}>
            <Pagination
              first
              last
              prev
              next
              boundaryLinks
              maxButtons={3}
              items={pageCount}
              total={totalElements}
              activePage={currPageIndex}
              onSelect={onPaginationSelect}
              >
            </Pagination>
          </div>
        }
         {topPagination && $content}
        
      </div>
    );
  }
}

polyfill(BasePopup);

export default BasePopup;
