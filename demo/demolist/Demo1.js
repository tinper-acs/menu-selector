/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect from '../../src/index';
import '../../src/index.scss';
import '../demo.scss';


class Demo extends React.Component {
  state = {
    tsOpen: false,
    visible: false,
    searchValue: '1',
    value: 'test1',
    valueList:[{label:'2',value:'test2'},],
   
  };
  onSearch = (value, ...args) => {
    console.log('Do Search:', value, ...args);
    let valueList = [];
    if(value==='2'){
      valueList = [
        {label:'2',value:'test2'},
        {label:'22',value:'test22'},
        {label:'222',value:'test222'}, 
        {label:'2222',value:'test2222'},
        {label:'22212',value:'test22212'},
      ]
    }else{
      valueList = [
        {label:'3',value:'test3'},
        {label:'33',value:'test33'},
        {label:'333',value:'test333'}, 
        {label:'3333',value:'test3333'},
        {label:'3133',value:'test3133'},
      ]
    }
    this.setState({ searchValue: value,valueList });
  };

  onChange = (value, ...rest) => {
    console.log('onChange', value, ...rest);
    this.setState({ value });
  };

  onMultipleChange = value => {
    console.log('onMultipleChange', value);
    this.setState({ multipleValue: value });
  };

  onSelect = (item) => {
    // use onChange instead
    this.setState({
      value:item.length === 0 ? '':item[0].value
    })
  };


  render() {
    const {
      value,
      searchValue,
      tsOpen,
      valueList
    } = this.state;
    return (
      <div>
        <h3>single select</h3>
        <TreeSelect
          prefixCls = {'u-select'}
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>请下拉选择</i>}
          searchPlaceholder="please search"
          showSearch
          allowClear
          searchValue={searchValue}
          value={value}
          filterTreeNode={false}
          onSearch={this.onSearch}
          open={tsOpen}
          valueList={valueList}
          onChange={(val, ...args) => {
            console.log('onChange', val, ...args);
            if (val === 'test1') {
              this.setState({ tsOpen: true });
            } else {
              this.setState({ tsOpen: false });
            }
            this.setState({ value: val });
          }}
          onDropdownVisibleChange={(v, info) => {
            console.log('single onDropdownVisibleChange', v, info);
            // document clicked
            if (info.documentClickClose && value === 'test1') {
              return false;
            }
            this.setState({
              tsOpen: v,
            });
            return true;
          }}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default Demo;
