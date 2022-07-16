import {SearchLabels} from "~/src/hydra";

export default [
  {
    property: 'code',
    variable: 'code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'code'
  },
  {
    property: 'name',
    variable: 'name[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'name'
  },
  {
    property: 'description',
    variable: 'description',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'description'
  },
]
