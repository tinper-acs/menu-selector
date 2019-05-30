/**
 *
 * @title 多选
 * @description 多选
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect from '../../src/index';
import '../../src/index.less';
import '../demo.scss';


class Demo2 extends React.Component {
  state = {
    tsOpen: false,
    visible: false,
    searchValue: '1',
    value: 'test1',
    valueList:[
      {label:'563',value:'test563'},
      {label:'563563',value:'test563563'},
      {label:'563563563',value:'test563563563'}, 
      {label:'563563563563',value:'test563563563563'},
      {label:'5631563563',value:'test5631563563'},
    ],
   
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
      valueList,
      multipleValue
    } = this.state;
    return (
      <div>

        <TreeSelect
          // prefixCls = {'u-select'}
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>请下拉选择</i>}
          searchPlaceholder="please search"
          multiple
          value={multipleValue}
          valueList={valueList}
          treeNodeFilterProp="title"
          onChange={this.onMultipleChange}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          allowClear
        />
      </div>
    );
  }
}

export default Demo2;
