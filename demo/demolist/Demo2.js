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
    value: 'v1',
    valueList:[
      {label:'5623',value:'v5263'},
      {label:'563563',value:'v563563'},
      {label:'v522263563',value:'v522263563'}, 
      {label:'563563563563',value:'v563563563563'},
      {label:'5631563563',value:'v5631563563'},
    ],
   
  };
  onSearch = (value, ...args) => {
    console.log('Do Search:', value, ...args);
    let valueList = [];
    if(value==='2'){
      valueList = [
        {label:'2',value:'v2'},
        {label:'22',value:'v22'},
        {label:'222',value:'v222'}, 
        {label:'2222',value:'v2222'},
        {label:'22212',value:'v22212'},
        {label:'98',value:'v98'},
        {label:'9898',value:'v9898'},
        {label:'989898',value:'v989898'}, 
        {label:'98989898',value:'v98989898'},
        {label:'989898198',value:'v989898198'},
        {label:'78',value:'v78'},
        {label:'7878',value:'v7878'},
        {label:'787878',value:'v787878'}, 
        {label:'78787878',value:'v78787878'},
        {label:'787878178',value:'v787878178'},
      ]
    }else{
      valueList = [
        {label:'3',value:'v3'},
        {label:'33',value:'v33'},
        {label:'333',value:'v333'}, 
        {label:'3333',value:'v3333'},
        {label:'3133',value:'v3133'},
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
          placeholder={"请下拉选择"}
          searchPlaceholder="please search"
          multiple
          maxTagCount={3}
          // value={multipleValue}
          valueList={valueList}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          allowClear
        />
      </div>
    );
  }
}

export default Demo2;
