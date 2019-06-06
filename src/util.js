
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
 * @param {ObjectValue} ObjectValue :经过refValParse处理的value，是个对象
 */
export function formatInternalValue (ObjectValue,nextProps) {
  //当""{"refname":"","refpk":""}"，ObjectValue.refname是undefined
  if(!ObjectValue.refname || !ObjectValue.refpk){
    let selectorValueList = [],selectorValueMap={};
    return {selectorValueList,selectorValueMap}
  }
  let valueList  = typeof(ObjectValue.refname) === 'string'? (ObjectValue.refname).split(','):JSON.stringify(ObjectValue.refname).split(',');
  let idList = typeof(ObjectValue.refpk) === 'string'? ObjectValue.refpk.split(',') :JSON.stringify(ObjectValue.refpk).split(',');
  if(valueList.length !== idList.length ){
    warning(
      false,
      `refname and refpk in value or defaultValue do not contains same length`,
    );
    let selectorValueList = [],selectorValueMap={};
    return {selectorValueList,selectorValueMap}
  }else{
    let selectorValueList = [],selectorValueMap={},{ valueList:newValueList,valueField} = nextProps;
    //20190606修改，这里改成idList从props的valueList中拿数据，若是valueList为空，则还是用refname和refpk
    // selectorValueList 两种，1.从valueList抽取的 2.refname+refpk 组合的
    idList.forEach((id,index)=>{
      if(newValueList.length === 0 ){
        selectorValueList.push({refname:valueList[index],refpk:id});
        selectorValueMap[id] = {refname:valueList[index],refpk:id};
        return false;
      }else{
        newValueList.some((item,index)=>{
          if(item[valueField] === id){
            selectorValueList.push(item);
            selectorValueMap[id] = item;
            return true;//跳出循环
          }else{
            return false;
          }
        });
      }
      
    })
    return {selectorValueList,selectorValueMap}
  }
}
export function formatDisplayValue(item,inputDisplay,valueList) {
  // 传入时做兼容
  //selectorValueList的取值符合refname+refpk 组合的
  if(item.refname && valueList.length===0 ){ 
    return item.refname;
  }
  //selectorValueList的取值符合从valueList抽取的
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