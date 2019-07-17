
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
//方法2 不按照refname和refpk来解析
// export function refValParse(value) {
//   if(!value){
//     warning(
//       true,
//       `value or defaultValue cant not be empty`,
//     );
//     return '{"refname":"",refpk:""}';
//   }
//   if(Object.prototype.toString.call(value)==='[object Object]'){
//     return value
//   }
//   if (typeof value === 'string') {
//     try {
//       let valueMap = JSON.parse(value);
//       if (typeof valueMap === 'object' && valueMap) {
//         return valueMap;
//       } else {
//         warning(
//           false,
//           `JSON parse解析报错`,
//         );
//         return '{"refname":"",refpk:""}';
//       }
//     } catch (error) {
//       warning(
//         false,
//         `JSON parse解析报错 ${error}`,
//       );
//       return '{"refname":"",refpk:""}';
//     }
//   }
// }
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

export function formatDisplayValue(item,inputDisplay,valueList) {
  // 传入时做兼容
  // selectorValueList的取值符合refname+refpk 组合的，即没从valueList中取出完整数据
  // 20190716修改因为selectorValueList的取值符合refname+refpk 组合的即从value属性取出来的也会有其他key，value的
  // if(Object.keys(item).length===2 && item.refname && valueList.length===0 ){ 
  //   return item.refname;
  // }
  //selectorValueList的取值符合从valueList抽取的
  if (typeof inputDisplay === 'function') {
     return inputDisplay(item) || item.refname;
  }else{
    return inputDisplay.format(item) || item.refname;
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

/**
 * 获取selectorValueList,selectorValueMap
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
  let ObjectValueNew = Object.assign({},ObjectValue)
  if(!ObjectValueNew || Object.prototype.toString.call(ObjectValue)!=='[object Object]'){
    let selectorValueList = [],selectorValueMap={};
    return {selectorValueList,selectorValueMap}
  } 
  let valueList  = typeof(ObjectValueNew.refname) === 'string'? (ObjectValueNew.refname).split(';'):JSON.stringify(ObjectValueNew.refname).split(';');
  let idList = typeof(ObjectValueNew.refpk) === 'string'? ObjectValueNew.refpk.split(';') :JSON.stringify(ObjectValueNew.refpk).split(';');
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
    // selectorValueList 两种，1.从valueList抽取的 2.refname+refpk组合的（从value中获取的）
    try{
      idList.forEach((id,index)=>{
        let objItem = {};
         //20190716取出value中所有的key，不仅仅有refname和refpk
          Object.keys(ObjectValueNew).forEach(key=>{
            let allKeysVal =  typeof(ObjectValueNew[key]) === 'string'? (ObjectValueNew[key]).split(';'):JSON.stringify(ObjectValueNew[key]).split(';');
            if(allKeysVal[index] === undefined){
              throw Error('value的每个键值长度不一致');
            }
            objItem[key] = allKeysVal[index];
          });
        if(newValueList.length === 0 ){
          selectorValueList.push(objItem);
          selectorValueMap[id] = objItem;
          return false;
        }else{
          let isExist = newValueList.some((item,valueIndex)=>{
            if(item[valueField] === id){
              selectorValueList.push(item);
              selectorValueMap[id] = item;
              return true;//跳出循环
            }else{
              return false;
            }
          });
          if(!isExist){
            //考虑，选中的数据不在下拉数据中
            selectorValueList.push(objItem);
            selectorValueMap[id] = objItem;
          }
          
        }
      })
      return {selectorValueList,selectorValueMap}

    } catch(e){
      warning(
        false,
        `${e}`,
      );
      return {selectorValueList:[],selectorValueMap:{}}
    }
  }
}