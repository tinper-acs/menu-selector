/**
 *
 * @title 单选
 * @description 单选
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect from '../../src/index';
import Icon from 'bee-icon';
import 'bee-icon/build/Icon.css'
import '../../src/index.less';
import '../demo.scss';


class Demo extends React.Component {
  state = {
    tsOpen: false,
    visible: false,
    searchValue: '1',
    value: [{label:'2',value:'test2'}],
    // value:'{"refname":"test2","refpk":"2"}',
    valueList:[ {label:'2',value:'test2'},
    {label:'22',value:'test22'},
    {label:'222',value:'test222'}, 
    {label:'2222',value:'test2222'},
    {label:'22212',value:'test22212'},
    {label:'98',value:'test98'},
    {label:'9898',value:'test9898'},
    {label:'989898',value:'test989898'}, 
    {label:'98989898',value:'test98989898'},
    {label:'989898198',value:'test989898198'},
    {label:'78',value:'test78'},
    {label:'7878',value:'test7878'},
    {label:'787878',value:'test787878'}, 
    {label:'78787878',value:'test78787878'},
    {label:'787878178',value:'test787878178'},],
    currPageIndex:1,
    loading:false,
   
  };
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        loading:true
      })
    }, 4000);
  }
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

  onSelect = (status,id,item,arr) => {
    // use onChange instead
    this.setState({
      value:arr.length === 0 ? '':arr[0].value,
      
    })
  };

  onPaginationSelect=(index)=>{
    this.setState({
      currPageIndex:index,
      valueList : [
        {label:'3page',value:'v3page'},
      ]
    })
  }
  render() {
    const {
      value,
      searchValue,
      tsOpen,
      valueList
    } = this.state;
    return (
      <div>
        <TreeSelect
          // prefixCls = {'u-select'}
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<span>请下拉选择</span>}
          searchPlaceholder="please search"
          showSearch
          allowClear
          searchValue={searchValue}
          value={value}
          filterTreeNode={false}
          onSearch={this.onSearch}
          open={tsOpen}
          valueList={valueList}
          valueField={'label'}
          inputDisplay = {
            record=>{return `${record.value}-la-${record.label}`}
          }
          // displayField = {record=>{if(record.refname){ return  record.refname } return record.value}}
          displayField={(record)=>{
            return <div > <Icon type="uf-personin-o" style={{ color: 'red' }} /> {record.value}-{record.label}</div>
           
          }}
          showMenuIcon
          onDropdownVisibleChange={(v, info) => {
            // console.log('single onDropdownVisibleChange', v, info);
            // document clicked
            this.setState({
              tsOpen: v,
            });
            return true;
          }}
          onSelect={this.onSelect}
          onPaginationSelect={this.onPaginationSelect}
          pageCount={1}
          totalElements={92}
          currPageIndex={this.state.currPageIndex}
          topPagination
        />
      </div>
    );
  }
}

export default Demo;
