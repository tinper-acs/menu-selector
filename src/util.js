
import warning from 'warning';
import './polyfill_shim'
// =================== MISC ====================
export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}
export function toArray(data) {
  if (data === undefined || data === null) return [];

  return Array.isArray(data) ? data : [data];
}
// Shallow copy of React 16.3 createRef api
export function createRef() {
    const func = function setRef(node) {
      func.current = node;
    };
    return func;
  }


// =============== Accessibility ===============
let ariaId = 0;

export function resetAriaId() {
  ariaId = 0;
}

export function generateAriaId(prefix) {
  ariaId += 1;
  return `${prefix}_${ariaId}`;
}
export function isLabelInValue(props) {
  const { labelInValue } = props;
  return labelInValue || false;
}

// =============== Legacy ===============
export const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

export const UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable',
};


// =================== Value ===================
export function refValParse (value){
  if(!value){
    warning(
      true,
      `value or defaultValue cant not be empty`,
    );
    return '{"refname":"",refpk:""}';
  }
  try{
      let valueMap = JSON.parse(value);
      if(!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')){
        warning(
          false,
          `value or defaultValue does not contains refname or refpk`,
        );
        return '{"refname":"",refpk:""}';
      }else{
          return JSON.parse(value);
      }
  }catch(e) {
      return '{"refname":"",refpk:""}';
  }
}
/**
 * 处理传入的value或者defaultValue，将value中refname和refpk分别放入selectorValueList，selectorValueMap。
 * 多选的情况考虑
 * @param {ObjectVal} ObjectVal 
 */
export function formatInternalValue (ObjectVal) {
  //当""{"refname":"","refpk":""}"，ObjectVal.refname是undefined
  if(!ObjectVal.refname || !ObjectVal.refpk){
    let selectorValueList = [],selectorValueMap={};
    return {selectorValueList,selectorValueMap}
  }
  let valueList  = typeof(ObjectVal.refname) === 'string'? (ObjectVal.refname).split(','):JSON.stringify(ObjectVal.refname).split(',');
  let idList = typeof(ObjectVal.refpk) === 'string'? ObjectVal.refpk.split(',') :JSON.stringify(ObjectVal.refpk).split(',');
  if(valueList.length !== idList.length ){
    warning(
      false,
      `refname and refpk in value or defaultValue do not contains same length`,
    );
  }else{
    let selectorValueList = [],selectorValueMap={};
    valueList.forEach((value,index)=>{
      selectorValueList.push({refname:value,refpk:idList[index]});
      selectorValueMap[idList[index]] = {refname:value,refpk:idList[index]};
    });
    return {selectorValueList,selectorValueMap}
  }
}
export function formatDisplayValue(item,inputDisplay) {
  // 传入时做兼容
  // if(item.refname){ //为了匹配value的值
  //   return item.refname;
  // }
  if (typeof inputDisplay === 'function') {
     return inputDisplay(item)
  }else{
    return inputDisplay.format(item)
  }
}
export function getRefname(wrappedValue) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }
  // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.
  return wrappedValue.label;
}

/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 *
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */
export function formatSelectorValue(valueList) {
  return valueList.map(wrappedValue => ({
    label: getRefname(wrappedValue),
    value: wrappedValue.value,
  }));
}