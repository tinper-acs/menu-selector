/**
 * ARIA: https://www.w3.org/TR/wai-aria/#combobox
 * Sample 1: https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/combobox/aria1.1pattern/listbox-combo.html
 * Sample 2: https://www.w3.org/blog/wai-components-gallery/widget/combobox-with-aria-autocompleteinline/
 *
 * Tab logic:
 * Popup is close
 * 1. Focus input (mark component as focused)
 * 2. Press enter to show the popup
 * 3. If popup has input, focus it
 *
 * Popup is open
 * 1. press tab to close the popup
 * 2. Focus back to the selection input box
 * 3. Let the native tab going on
 *
 * TreeSelect use 2 design type.
 * In single mode, we should focus on the `span`
 * In multiple mode, we should focus on the `input`
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import raf from 'raf';
import KeyCode from 'rc-util/lib/KeyCode';
import Icon from 'bee-icon';
import SelectTrigger from './SelectTrigger';
import { selectorContextTypes } from './Base/BaseSelector';
import { popupContextTypes } from './Base/BasePopup';
import SingleSelector from './Selector/SingleSelector';
import SinglePopup from './Popup/SinglePopup';
import MultiplePopup from './Popup/MultiplePopup';
import MultipleSelector, { multipleSelectorContextTypes } from './Selector/MultipleSelector';
import {
  createRef,
  generateAriaId,
  formatInternalValue,
  refValParse,
  formatSelectorValue
} from './util';
import { valueProp } from './propTypes';
class Select extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    prefixAria: PropTypes.string,
    multiple: PropTypes.bool,
    showArrow: PropTypes.bool,
    open: PropTypes.bool,
    value: valueProp,
    autoFocus: PropTypes.bool,

    defaultOpen: PropTypes.bool,
    defaultValue: valueProp,

    showSearch: PropTypes.bool,
    placeholder: PropTypes.node,
    // inputValue: PropTypes.string, // [Legacy] Deprecated. Use `searchValue` instead.
    searchValue: PropTypes.string,
    // autoClearSearchValue: PropTypes.bool,// [Legacy] Deprecated.
    searchPlaceholder: PropTypes.node, // [Legacy] Confuse with placeholder
    disabled: PropTypes.bool,
    // children: PropTypes.node,
    maxTagCount: PropTypes.number,
    maxTagPlaceholder: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    // maxTagTextLength: PropTypes.number,

    dropdownMatchSelectWidth: PropTypes.bool,
    notFoundContent: PropTypes.node,

    onSearch: PropTypes.func,
    // onSelect: PropTypes.func,//Update state selectorValueList.
    onSelectorChange: PropTypes.func,//selector的值改变就会调用此方法，清空，单选多选选择数据，多选删除单个数据，多选delete删除
    // onDeselect: PropTypes.func,// [Legacy] Deprecated.
    // onChange: PropTypes.func,//Update state valueList. // [Legacy] Deprecated.
    onDropdownVisibleChange: PropTypes.func,

    // inputIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),// [Legacy] Deprecated.
    clearIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    removeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    // switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),// [Legacy] Deprecated.
    
    valueList:PropTypes.arrayOf(PropTypes.object),
    valueField: PropTypes.string,
    pageCount: PropTypes.number,
    totalElements: PropTypes.number,
    currPageIndex: PropTypes.number,
    onPaginationSelect:PropTypes.func,
    onMenuIconClick:PropTypes.func,
    inputDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),//新增input框的展示方式
    displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),//下拉列表的展示
    topPagination:PropTypes.bool,
  };

  static childContextTypes = {
    rcTreeSelect: PropTypes.shape({
      ...selectorContextTypes,
      ...multipleSelectorContextTypes,
      ...popupContextTypes,

      onSearchInputChange: PropTypes.func,
      onSearchInputKeyDown: PropTypes.func,
    }),
  };

  static defaultProps = {
    prefixCls: 'rc-tree-select',
    prefixAria: 'rc-tree-select',
    showArrow: true,
    showSearch: true,
    // autoClearSearchValue: true,// [Legacy] Deprecated.
    
    notFoundContent: 'Not Found',

    clearIcon:<Icon className={`rc-tree-select-selection-choice-clear-icon`} type={' uf-close-c'}></Icon>,//是单选最后的X
    removeIcon:<Icon className={`rc-tree-select-selection-choice-remove-icon`}type={' uf-close'}></Icon>, // 每项的关闭
    menuIcon:<Icon className={`rc-tree-select-selection-menu-icon`}type={' uf-navmenu'}></Icon>, // 每项的关闭
    
    valueList:[],
    valueField:'refpk',
    pageCount:0,
    totalElements:0,
    currPageIndex:0,
    onPaginationSelect:()=>{},
    onSelectorChange:()=>{},
    onMenuIconClick:()=>{},
    inputDisplay:'{refname}' ,
    displayField:'{refname}',
    topPagination:false,//分页在content上面
  };

  constructor(props) {
    super(props);

    const { prefixAria, defaultOpen, open,} = props;

    this.state = {
      open: open || defaultOpen,
      selectorValueList:[],
      selectorValueMap:{},
      searchValue:'',
      value:'',//接收value
      init: true,
    };

    this.selectorRef = createRef();
    this.selectTriggerRef = createRef();

    // ARIA need `aria-controls` props mapping
    // Since this need user input. Let's generate ourselves
    this.ariaId = generateAriaId(`${prefixAria}-list`);
  }

  getChildContext() {
    return {
      rcTreeSelect: {
        onSelectorFocus: this.onSelectorFocus,
        onSelectorBlur: this.onSelectorBlur,
        onSelectorKeyDown: this.onComponentKeyDown,
        onSelectorClear: this.onSelectorClear,
        onSelectorMenu: this.onSelectorMenu,//新增menu点击
        onMultipleSelectorRemove: this.onMultipleSelectorRemove,

        onPopupKeyDown: this.onComponentKeyDown,
        onMenuSelect: this.onMenuSelect,
        onMenuMultipleSelect: this.onMenuMultipleSelect, //多选与单选的方法区分开来

        onSearchInputChange: this.onSearchInputChange,
        onSearchInputKeyDown: this.onSearchInputKeyDown,
      },
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const newState = {
      prevProps: nextProps,
      init: false,
    };
    
    // Process the state when props updated
    function processState(propName, updater) {
      if (prevProps[propName] !== nextProps[propName]) {
        updater(nextProps[propName], prevProps[propName]);
        return true;
      }
      return false;
    }
    let valueRefresh = false;
    // Open
    processState('open', propValue => {
      newState.open = propValue;
    });

    // Value change
    if (prevState.init) {
      processState('defaultValue', propValue => {
        // newState.valueList = formatInternalValue(propValue, nextProps);
        if(Array.isArray(propValue)){
          //修改，允许数组
          let temp = JSON.stringify(propValue),selectorValueMap={};
          newState.value = JSON.parse(temp);
          newState.selectorValueList =JSON.parse(temp);
          JSON.parse(temp).forEach(item=>{
            selectorValueMap[item[nextProps.valueField]] = item;
          })
          newState.selectorValueMap = selectorValueMap;
          valueRefresh = false;
        }else{
          newState.value = refValParse(propValue, nextProps);
          valueRefresh = true;
        }
        
      });
    }
    processState('value', propValue => {
      if(Array.isArray(propValue)){
        //修改，允许数组
        let temp = JSON.stringify(propValue),selectorValueMap={};
        newState.value = JSON.parse(temp);
        newState.selectorValueList =JSON.parse(temp);
        JSON.parse(temp).forEach(item=>{
          selectorValueMap[item[nextProps.valueField]] = item;
        })
        newState.selectorValueMap = selectorValueMap;
        valueRefresh = false;
      }else{
        newState.value = refValParse(propValue, nextProps);
        valueRefresh = true;
      }
     
    });

     // Selector Value List
     if (valueRefresh) {
      // Calculate the value list for `Selector` usage
      if(!newState.value){
        newState.selectorValueList =[]
        newState.selectorValueMap = {};
      }else{
        let {selectorValueList,selectorValueMap} =  formatInternalValue(
          newState.value,
        );// 考虑多选
        newState.selectorValueList =selectorValueList
        newState.selectorValueMap = selectorValueMap;
      }
      
    }

    // Search value
    processState('searchValue', propValue => {
      newState.searchValue = propValue;
    });
    return newState;
  }
  componentDidMount() {
    const { autoFocus, disabled } = this.props;

    if (autoFocus && !disabled) {
      this.focus();
    }
  }
  
  // ==================== Selector ====================
  onSelectorFocus = () => {
    this.setState({ focused: true});
  };

  onSelectorBlur = () => {
    this.setState({ focused: false});

    // TODO: Close when Popup is also not focused
    // this.setState({ open: false });
  };
  // Handle key board event in both Selector and Popup
  onComponentKeyDown = event => {
    const { open } = this.state;
    const { keyCode } = event;
    if (!open) {
      if ([KeyCode.ENTER, KeyCode.DOWN].indexOf(keyCode) !== -1) {
        this.setOpenState(true);
      }
    } else if (KeyCode.ESC === keyCode) {
      this.setOpenState(false);
    } else if ([KeyCode.UP, KeyCode.DOWN, KeyCode.LEFT, KeyCode.RIGHT].indexOf(keyCode) !== -1) {
      // TODO: Handle `open` state
      event.stopPropagation();
    }
  };

  /**
   * 添加navmenu操作
   */
  onSelectorMenu = event =>{
    event.stopPropagation();
    this.props.onMenuIconClick();

  }
  /**
   * @msg: selector的值改变
   * @param {type} 
   * status:false删除，true新增，
   * id:当前操作节点的id，
   * item当前操作节点的完整数据（valueList取）;
   * selectedArray当前popup选中的节点数组
   * @return: 
   *  update selectorValueList 
   *  Fire `onChange` event to user.
   */
  triggerChange = (status,id,item,selectedArray,) =>{
    let {onSelectorChange,onChange} = this.props;
    let {selectorValueList} = this.state;
    onSelectorChange(status,id,item,selectedArray)
     // Only do the logic when `onChange` function provided
    if (onChange) {
      onChange(selectorValueList);
    }
  }
  onSelectorClear = event => {
    event.stopPropagation();
    const { disabled,onSelect } = this.props;
    if (disabled) return;
    this.setState({
      value:[],
      selectorValueList:[],
      selectorValueMap:{},
    },()=>{
      this.triggerChange(false,null,null,[])
    })
    if (!this.isSearchValueControlled()) {
      this.setUncontrolledState({
        searchValue: '',
      });
    }
    
  };
  onMultipleSelectorRemove = (event, removerId,removeValue) => {
    event.stopPropagation();
    let {selectorValueMap}  = this.state;
    let currentItem = selectorValueMap[removerId];
    delete selectorValueMap[removerId];
    let checkedArray = [];
    Object.keys(selectorValueMap).forEach(item => {
      checkedArray.push(selectorValueMap[item])
    });
    this.setState({
      value:checkedArray,
      selectorValueList:checkedArray,
      selectorValueMap,
    },()=>{
      this.triggerChange(false,removerId,currentItem,checkedArray)
    })
  };

  // ==================== Popup =====================
  /**
	 * 多选状态下表格只能通过选择 checkbox 来选值，同时触发改方法
	 * @function
	 * 
	 * @param record  当前操作的行数据
   * @param status  当前操作的行数据是选中状态还是其他
	 */
  onMenuMultipleSelect = (record,status) =>{
    if(!this.props.multiple) return;
    let { valueField } = this.props;
    let {selectorValueMap,selectorValueList} = this.state;
		if(record){
      //添加
			if( !status && !selectorValueMap[record[valueField]] ){ 
        let checkedArray =  selectorValueList;
        let checkedMap = selectorValueMap;
         checkedArray.push(record);
         checkedMap[record[valueField]] = record;
         this.setState({
          value:checkedArray,
          selectorValueList:checkedArray,
          selectorValueMap:checkedMap,
         })
	
			}else if( status && selectorValueMap[record[valueField]] ){
        //删除
				delete selectorValueMap[record[valueField]];
				let checkedArray = [];
				Object.keys(selectorValueMap).forEach(item => {
					checkedArray.push(selectorValueMap[item])
        });
        this.setState({
          value:checkedArray,
          selectorValueList:checkedArray,
          selectorValueMap,
        })
      }
      this.triggerChange(!status,record[valueField],record,this.state.selectorValueList)

		}
  }
  /**
	 * 单击行选择该行数据，只在单选状态生效
	 * @record {object} 该行数据
	 */
  onMenuSelect = (record) =>{
    let { valueField ,multiple,onSelect } = this.props;
    if(!!multiple) return;
    let {selectorValueMap={}} = this.state;
		//点击同一行数据时取消选择
		if(selectorValueMap.hasOwnProperty(record[valueField])){
      this.setState({
        value:[],
        selectorValueList:[],
        selectorValueMap:{},
      },()=>{
        this.triggerChange(false,record[valueField],record,[]);
      })
		}else{
      let checkedRecord = Object.assign({_checked: true}, record);
      let checkedArray = [checkedRecord];
			let checkedMap = {};
			checkedMap[checkedRecord[valueField]] = checkedRecord;
      this.setState({
        value:checkedArray,
        selectorValueList:checkedArray,
        selectorValueMap:checkedMap,
      },()=>{
        this.triggerChange(true,record[valueField],record,checkedArray)
      });
		}
  }

  // ==================== Trigger =====================

  onDropdownVisibleChange = open => {
    this.setOpenState(open, true);
  };

  onSearchInputChange = ({ target: { value } }) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(value);
    }
    if (!this.isSearchValueControlled()) {
      this.setUncontrolledState({
        searchValue: value,
      });
      
    }else{
      this.setState({
        searchValue: value,
      });
    }
  
    this.setOpenState(true);
  };
  onSearchInputKeyDown = event => {
    const { searchValue,selectorValueList } = this.state;
    const {multiple,valueField} = this.props;
    const { keyCode } = event;

    if (KeyCode.BACKSPACE === keyCode && multiple && !searchValue && selectorValueList.length) {
      const lastValue = selectorValueList[selectorValueList.length - 1][valueField] ||  selectorValueList[selectorValueList.length - 1].refpk;//兼容input上的值是value字段获取的
      this.onMultipleSelectorRemove(event, lastValue);
    }
  };

  // [Legacy] Origin provide `documentClickClose` which triggered by `Trigger`
  // Currently `TreeSelect` align the hide popup logic as `Select` which blur to hide.
  // `documentClickClose` is not accurate anymore. Let's just keep the key word.
  setOpenState = (open, byTrigger = false) => {
    const { onDropdownVisibleChange } = this.props;
    if (
      onDropdownVisibleChange &&
      onDropdownVisibleChange(open, { documentClickClose: !open && byTrigger }) === false
    ) {
      return;
    }
    this.setUncontrolledState({ open });
  };

  onChoiceAnimationLeave = () => {
    raf(() => {
      this.forcePopupAlign();
    });
  };

  setPopupRef = popup => {
    this.popup = popup;
  };
   /**
   * Only update the value which is not in props
   */
  setUncontrolledState = state => {
    let needSync = false;
    const newState = {};

    Object.keys(state).forEach(name => {
      if (name in this.props) return;

      needSync = true;
      newState[name] = state[name];
    });

    if (needSync) {
      this.setState(newState);
    }

    return needSync;
  };

  // [Legacy] To align with `Select` component,
  // We use `searchValue` instead of `inputValue`
  // but currently still need support that.
  // Add this method the check if is controlled
  isSearchValueControlled = () => {
    const { inputValue } = this.props;
    if ('searchValue' in this.props) return true;
    return 'inputValue' in this.props && inputValue !== null;
  };

  forcePopupAlign = () => {
    const $trigger = this.selectTriggerRef.current;

    if ($trigger) {
      $trigger.forcePopupAlign();
    }
  };

  focus() {
    this.selectorRef.current.focus();
  }

  blur() {
    this.selectorRef.current.blur();
  }


  // ===================== Render =====================

  render() {
    let {
      selectorValueList=[],
      selectorValueMap,
      open,
      focused,
      searchValue,
    } = this.state;
    const { 
      prefixCls,
      valueList,
      valueField,
      inputDisplay,
      multiple,
    } = this.props;

    const passProps = {
      ...this.props,
      searchValue,
      valueList,
      selectorValueList,
      selectorValueMap,
      open,
      focused,
      onChoiceAnimationLeave: this.onChoiceAnimationLeave,
      dropdownPrefixCls: `${prefixCls}-dropdown`,
      ariaId: this.ariaId,
      valueField,
      inputDisplay
    };

    const Popup = multiple ? MultiplePopup : SinglePopup;
    const $popup = (
      <Popup
        ref={this.setPopupRef}
        {...passProps}
      />
    );

    const Selector = multiple ? MultipleSelector : SingleSelector;
    const $selector = <Selector {...passProps} ref={this.selectorRef} />;

    return (
      <SelectTrigger
        {...passProps}
        ref={this.selectTriggerRef}
        popupElement={$popup}
        onKeyDown={this.onKeyDown}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
      >
        {$selector}
      </SelectTrigger>
    );
  }
}

// Let warning show correct component name
Select.displayName = 'MenuSelect';

polyfill(Select);

export default Select;
