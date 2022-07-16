import {RangeLabels, SearchLabels} from "~/src/hydra";

export default [
  {
    property: 'stratigraphicUnit.id',
    variable: 'stratigraphicUnit.id[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'stratigraphic unit'
  },
  {
    property: 'stratigraphicUnit.area.code',
    variable: 'stratigraphicUnit.area.code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'area (code)'
  },
  {
    property: 'stratigraphicUnit.site.code',
    variable: 'stratigraphicUnit.site.code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'site (code)'
  },
  {
    property: 'number',
    variable: 'number[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'identification number'
  },
  {
    property: 'number',
    variable: 'number[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'identification number'
  },
  {
    property: 'number',
    variable: 'number[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'identification number'
  },
  {
    property: 'number',
    variable: 'number[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'identification number'
  },
  {
    property: 'number',
    variable: 'number[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'identification number'
  },
  {
    property: 'year',
    variable: 'year[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'year'
  },
  {
    property: 'year',
    variable: 'year[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'year'
  },
  {
    property: 'year',
    variable: 'year[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'year'
  },
  {
    property: 'year',
    variable: 'year[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'year'
  },
  {
    property: 'year',
    variable: 'year[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'year'
  },
  {
    property: 'type.id',
    variable: 'type.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'documentType',
    label: 'type'
  },
  {
    property: 'interpretation',
    variable: 'interpretation',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'interpretation'
  },
  {
    property: 'description',
    variable: 'description',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'description'
  },
  {
    property: 'summary',
    variable: 'summary',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'summary'
  },
  {
    property: 'creator',
    variable: 'creator',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'creator'
  },
  {
    property: 'areaSupervisor',
    variable: 'areaSupervisor',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'supervisor'
  },
]
