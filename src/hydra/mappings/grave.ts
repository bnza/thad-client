import {RangeLabels, SearchLabels, ExistsLabels, DateLabels} from "~/src/hydra";

export default [
  {
    property: 'area.code',
    variable: 'area.code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'area (code)'
  },
  {
    property: 'site.code',
    variable: 'site.code[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'site (code)'
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
    property: 'bottomElevation',
    variable: 'bottomElevation[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'bottom elevation (m)'
  },
  {
    property: 'bottomElevation',
    variable: 'bottomElevation[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'bottom elevation (m)'
  },
  {
    property: 'topElevation',
    variable: 'topElevation[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'top elevation (m)'
  },
  {
    property: 'topElevation',
    variable: 'topElevation[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'top elevation (m)'
  },
  {
    property: 'preservationState.id',
    variable: 'preservationState.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'preservationState',
    label: 'preservation state'
  },
  {
    property: 'preservationState.id',
    variable: 'exists[preservationState]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'preservation state'
  },
  {
    property: 'deposition.id',
    variable: 'deposition.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'deposition',
    label: 'deposition'
  },
  {
    property: 'deposition.id',
    variable: 'exists[deposition]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'deposition'
  },
  {
    property: 'ritual.id',
    variable: 'ritual.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'ritual',
    label: 'ritual'
  },
  {
    property: 'ritual.id',
    variable: 'exists[ritual]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'ritual'
  },
  {
    property: 'period.id',
    variable: 'period.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'period',
    label: 'period'
  },
  {
    property: 'period.id',
    variable: 'exists[period]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'period'
  },
  {
    property: 'type.id',
    variable: 'type.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'suType',
    label: 'type'
  },
  {
    property: 'building',
    variable: 'building[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'building'
  },
  {
    property: 'buildingSubPhase',
    variable: 'buildingSubPhase[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'building sub phase'
  },
  {
    property: 'room',
    variable: 'room[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'room'
  },
  {
    property: 'phase',
    variable: 'phase[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'phase'
  },
  {
    property: 'subPhase',
    variable: 'subPhase[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'sub phase'
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
    property: 'compiler',
    variable: 'compiler',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'compiler'
  },
  {
    property: 'date',
    variable: 'date[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'date',
    type: Date
  },
  {
    property: 'date',
    variable: 'date[before]',
    operator: DateLabels.before,
    multiple: false,
    label: 'date',
    type: Date
  },
  {
    property: 'date',
    variable: 'date[strictly_before]',
    operator: DateLabels.strictlyBefore,
    multiple: false,
    label: 'date',
    type: Date
  },
  {
    property: 'date',
    variable: 'date[after]',
    operator: DateLabels.after,
    multiple: false,
    label: 'date',
    type: Date
  },
  {
    property: 'date',
    variable: 'date[strictly_after]',
    operator: DateLabels.strictlyAfter,
    multiple: false,
    label: 'date',
    type: Date
  },
  {
    property: 'earlierThan.id',
    variable: 'earlierThan.id[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'earlier than (SU)',
    type: 'stratigraphicUnit'
  },
  {
    property: 'earlierThan.id',
    variable: 'exists[earlierThan]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'earlier than (SU)'
  },
  {
    property: 'laterThan.id',
    variable: 'laterThan.id[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'later than (SU)',
    type: 'stratigraphicUnit'
  },
  {
    property: 'laterThan.id',
    variable: 'exists[laterThan]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'later than (SU)'
  },
  {
    property: 'stratigraphicUnits.id',
    variable: 'stratigraphicUnits.id[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'stratigraphic unit',
    type: 'stratigraphicUnit'
  },
]
