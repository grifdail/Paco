import Actions from "./Actions";
import { ConditionTypes } from "./Conditions";

export const defaultGame = () => ({
  scenes: {
    origin: defaultScene('origin'),
  },
  variables: {}
})

export const defaultScene = (name) => ({
  name: name,
  image: "",
  links:[],
  actions:[]
});

export const defaultImage = (id) => ({
  x:0,
  y:0,
  image: "",
  width: 200,
  height: 200,
  conditions: [],
  actions: [],
  conditions: [],
  name: "image #"+id
});

export const defaultAction = () => ({
  type: Actions.goTo,
  target: "origin",
  value: 0
});

export const defaultConditions = () => ({
  type: ConditionTypes.equals,
  value: 1
});
