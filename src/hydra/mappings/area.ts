import {SearchLabels} from "~/src/hydra";

export default [
  {
    property: 'site.code',
    variable: 'site.code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'site (code)'
  },
  {
    property: 'site.name',
    variable: 'site.name[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'site (name)'
  },
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
