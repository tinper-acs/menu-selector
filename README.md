# menu-selector

menu-selector 结合列表跟分页的选择控制，支持单选和多选


## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

#### 组件引入


```
npm install --save menu-selector
```

组件调用

```js
import React, { Component } from 'react';
import Select from 'menu-selector';

```


#### 样式引入
```js
import  from 'menu-selector/dist/index.css';
```

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 显示清除按钮 | boolean | false |
| className | 自定义输入框样式名 | string | - |
| defaultValue | 指定默认选中的条目 | string/string\[] | - |
| disabled | 是否禁用 | boolean | false |
| defaultOpen | 默认是否打开 | boolean | -| 
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的样式 | object | - |
| notFoundContent | 设定搜索不到数据显示的内容 | String | '无匹配结果' |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
| multiple | 支持多选| boolean | false |
| placeholder | 选择框默认文字 | string | - |
| searchPlaceholder | 搜索框默认文字 | string | - |
| maxTagCount | 最多显示的tag数 | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode/function(omittedValues) | - |
| showSearch | 在下拉中显示搜索框。单选模式下搜索框在下拉框中，多选模式在input上展示 | boolean | true |
| searchValue | 搜索框值 | string | - |
| defaultValue | 指定当前选中的条目的初始值，格式参考value | string | -| 
| value | 指定当前选中的条目。可以是字符串格式或者数据格式。（一）字符串格式：其格式必须满足'{"refname":"","refpk":""}',refname是展示input框上的内容，格式自定义，多选以逗号隔开；refpk对应的是refname每项的键值，这个值要与valueField指定的值一样，此时使用inputDisplay注意，字段限制。（二）数组格式：[{value:'',label:'',refname:''...}]，必须含有valueField指定的字段，展示按照inputField| string或者[] | - |
| inputDisplay | input框展示内容格式自定义。item是选中数据。注意：初始值value和defaultValue是默认选中数据，但是初始数据只有refname和refpk，如果inputDisplay涉及其他字段，请在value和defaultValue中添加该字段| function(item) | 
| displayField | 下拉列表展示内容格式自定义。item是valueList中数据项。| function(item) | - 
| topPagination | 分页与下拉列表的位置 ，true分页在上 | boolean | false|
| onSearch | 文本框值变化时回调 | function(value: string) | - |
| onSelectorChange | input框值改变时回调。情况1.清空操作;case2:单选多选下拉选中数据;case3:多选点击单个数据项删除;case4:多选回车 | function(value, node, extra) | - 
| valueList | 下拉菜单数据 | array | [] | 
| valueField| 指定valueList数据项的键 | string | 'refpk' |
| onMenuIconClick | 汉堡按钮点击操作 | function() | 
| pageCount | 下拉菜单中分页的参数：页数。当页数小于1页，不展示分页。|number | 0|
| totalElements | 下拉菜单中分页的参数：总条数 | number | 0 | 
| currPageIndex | 下拉菜单中分页的参数：当前页  |number | 0 |
| onPaginationSelect | 下拉菜单中分页的参数：翻页函数 。index是页码 |function(index) | - |



#### 开发调试
rc-trigger只能使用3.0.0-rc版本
