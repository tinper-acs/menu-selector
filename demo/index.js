import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" 单选","code":"/**\n *\n * @title 单选\n * @description 单选\n *\n */\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport TreeSelect from '../../src/index';\nimport '../../src/index.scss';\nimport '../demo.scss';\n\n\nclass Demo extends React.Component {\n  state = {\n    tsOpen: false,\n    visible: false,\n    searchValue: '1',\n    value: 'test1',\n    valueList:[{label:'2',value:'test2'},],\n   \n  };\n  onSearch = (value, ...args) => {\n    console.log('Do Search:', value, ...args);\n    let valueList = [];\n    if(value==='2'){\n      valueList = [\n        {label:'2',value:'test2'},\n        {label:'22',value:'test22'},\n        {label:'222',value:'test222'}, \n        {label:'2222',value:'test2222'},\n        {label:'22212',value:'test22212'},\n      ]\n    }else{\n      valueList = [\n        {label:'3',value:'test3'},\n        {label:'33',value:'test33'},\n        {label:'333',value:'test333'}, \n        {label:'3333',value:'test3333'},\n        {label:'3133',value:'test3133'},\n      ]\n    }\n    this.setState({ searchValue: value,valueList });\n  };\n\n  onChange = (value, ...rest) => {\n    console.log('onChange', value, ...rest);\n    this.setState({ value });\n  };\n\n  onMultipleChange = value => {\n    console.log('onMultipleChange', value);\n    this.setState({ multipleValue: value });\n  };\n\n  onSelect = (item) => {\n    // use onChange instead\n    this.setState({\n      value:item.length === 0 ? '':item[0].value\n    })\n  };\n\n\n  render() {\n    const {\n      value,\n      searchValue,\n      tsOpen,\n      valueList\n    } = this.state;\n    return (\n      <div>\n        <TreeSelect\n          prefixCls = {'u-select'}\n          style={{ width: 300 }}\n          transitionName=\"rc-tree-select-dropdown-slide-up\"\n          choiceTransitionName=\"rc-tree-select-selection__choice-zoom\"\n          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}\n          placeholder={<i>请下拉选择</i>}\n          searchPlaceholder=\"please search\"\n          showSearch\n          allowClear\n          searchValue={searchValue}\n          value={value}\n          filterTreeNode={false}\n          onSearch={this.onSearch}\n          open={tsOpen}\n          valueList={valueList}\n          onChange={(val, ...args) => {\n            console.log('onChange', val, ...args);\n            if (val === 'test1') {\n              this.setState({ tsOpen: true });\n            } else {\n              this.setState({ tsOpen: false });\n            }\n            this.setState({ value: val });\n          }}\n          onDropdownVisibleChange={(v, info) => {\n            console.log('single onDropdownVisibleChange', v, info);\n            // document clicked\n            if (info.documentClickClose && value === 'test1') {\n              return false;\n            }\n            this.setState({\n              tsOpen: v,\n            });\n            return true;\n          }}\n          onSelect={this.onSelect}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 单选"},{"example":<Demo2 />,"title":" 多选","code":"/**\n *\n * @title 多选\n * @description 多选\n *\n */\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport TreeSelect from '../../src/index';\nimport '../../src/index.scss';\nimport '../demo.scss';\n\n\nclass Demo2 extends React.Component {\n  state = {\n    tsOpen: false,\n    visible: false,\n    searchValue: '1',\n    value: 'test1',\n    valueList:[{label:'2',value:'test2'},],\n   \n  };\n  onSearch = (value, ...args) => {\n    console.log('Do Search:', value, ...args);\n    let valueList = [];\n    if(value==='2'){\n      valueList = [\n        {label:'2',value:'test2'},\n        {label:'22',value:'test22'},\n        {label:'222',value:'test222'}, \n        {label:'2222',value:'test2222'},\n        {label:'22212',value:'test22212'},\n      ]\n    }else{\n      valueList = [\n        {label:'3',value:'test3'},\n        {label:'33',value:'test33'},\n        {label:'333',value:'test333'}, \n        {label:'3333',value:'test3333'},\n        {label:'3133',value:'test3133'},\n      ]\n    }\n    this.setState({ searchValue: value,valueList });\n  };\n\n  onChange = (value, ...rest) => {\n    console.log('onChange', value, ...rest);\n    this.setState({ value });\n  };\n\n  onMultipleChange = value => {\n    console.log('onMultipleChange', value);\n    this.setState({ multipleValue: value });\n  };\n\n  onSelect = (item) => {\n    // use onChange instead\n    this.setState({\n      value:item.length === 0 ? '':item[0].value\n    })\n  };\n\n\n  render() {\n    const {\n      value,\n      searchValue,\n      tsOpen,\n      valueList\n    } = this.state;\n    return (\n      <div>\n        <TreeSelect\n          prefixCls = {'u-select'}\n          style={{ width: 300 }}\n          transitionName=\"rc-tree-select-dropdown-slide-up\"\n          choiceTransitionName=\"rc-tree-select-selection__choice-zoom\"\n          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}\n          placeholder={<i>请下拉选择</i>}\n          searchPlaceholder=\"please search\"\n          showSearch\n          allowClear\n          multiple\n          searchValue={searchValue}\n          value={value}\n          filterTreeNode={false}\n          onSearch={this.onSearch}\n          open={tsOpen}\n          valueList={valueList}\n          onChange={(val, ...args) => {\n            console.log('onChange', val, ...args);\n            if (val === 'test1') {\n              this.setState({ tsOpen: true });\n            } else {\n              this.setState({ tsOpen: false });\n            }\n            this.setState({ value: val });\n          }}\n          onDropdownVisibleChange={(v, info) => {\n            console.log('single onDropdownVisibleChange', v, info);\n            // document clicked\n            if (info.documentClickClose && value === 'test1') {\n              return false;\n            }\n            this.setState({\n              tsOpen: v,\n            });\n            return true;\n          }}\n          onSelect={this.onSelect}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 多选"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code.replace('../../src/index',COMPONENT).replace('../../src',COMPONENT) }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
