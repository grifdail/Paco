import {keys, zipObj} from "ramda";


const Condition = {
  less: (a,b) => a<b,
  lessOrEqual: (a,b) => a<=b,
  greater: (a,b) => a>b,
  greaterOrEqual: (a,b) => a>=b,
  equal: (a,b) => a==b,
  different: (a,b) => a!=b,
}

export const ConditionKeys = keys(Condition)
export const ConditionTypes = zipObj(ConditionKeys, ConditionKeys);

console.log(ConditionTypes)
export default Condition;
