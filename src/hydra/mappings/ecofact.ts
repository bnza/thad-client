import {RangeLabels, SearchLabels, ExistsLabels, DateLabels} from "~/src/hydra";

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
    property: 'quantity',
    variable: 'quantity[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'quantity'
  },
  {
    property: 'quantity',
    variable: 'quantity[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'quantity'
  },
  {
    property: 'quantity',
    variable: 'quantity[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'quantity'
  },
  {
    property: 'quantity',
    variable: 'quantity[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'quantity'
  },
  {
    property: 'quantity',
    variable: 'quantity[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'quantity'
  },
  {
    property: 'stratigraphicUnit.year',
    variable: 'stratigraphicUnit.year[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'year'
  },
  {
    property: 'stratigraphicUnit.year',
    variable: 'stratigraphicUnit.year[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'year'
  },
  {
    property: 'stratigraphicUnit.year',
    variable: 'stratigraphicUnit.year[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'year'
  },
  {
    property: 'stratigraphicUnit.year',
    variable: 'stratigraphicUnit.year[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'year'
  },
  {
    property: 'stratigraphicUnit.year',
    variable: 'stratigraphicUnit.year[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'year'
  },
  {
    property: 'type.id',
    variable: 'type.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'sampleType',
    label: 'type'
  },
  {
    property: 'material.id',
    variable: 'material.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'material',
    label: 'material'
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
    property: 'notes',
    variable: 'notes',
    operator: SearchLabels.contains,
    multiple: false,
    label: ' notes'
  },
  {
    property: 'length',
    variable: 'length[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'length (cm)'
  },
  {
    property: 'length',
    variable: 'length[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'length (cm)'
  },
  {
    property: 'length',
    variable: 'length[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'length (cm)'
  },
  {
    property: 'length',
    variable: 'length[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'length (cm)'
  },
  {
    property: 'width',
    variable: 'width[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'width (cm)'
  },
  {
    property: 'width',
    variable: 'width[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'width (cm)'
  },
  {
    property: 'width',
    variable: 'width[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'width (cm)'
  },
  {
    property: 'width',
    variable: 'width[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'width (cm)'
  },
  {
    property: 'height',
    variable: 'height[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'height (cm)'
  },
  {
    property: 'height',
    variable: 'height[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'height (cm)'
  },
  {
    property: 'height',
    variable: 'height[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'height (cm)'
  },
  {
    property: 'height',
    variable: 'height[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'height (cm)'
  },
  {
    property: 'thickness',
    variable: 'thickness[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'thickness (cm)'
  },
  {
    property: 'thickness',
    variable: 'thickness[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'thickness (cm)'
  },
  {
    property: 'thickness',
    variable: 'thickness[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'thickness (cm)'
  },
  {
    property: 'thickness',
    variable: 'thickness[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'thickness (cm)'
  },
  {
    property: 'minDiameter',
    variable: 'minDiameter[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'min diameter (cm)'
  },
  {
    property: 'minDiameter',
    variable: 'minDiameter[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'min diameter (cm)'
  },
  {
    property: 'minDiameter',
    variable: 'minDiameter[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'min diameter (cm)'
  },
  {
    property: 'minDiameter',
    variable: 'minDiameter[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'min diameter (cm)'
  },
  {
    property: 'maxDiameter',
    variable: 'maxDiameter[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'max diameter (cm)'
  },
  {
    property: 'maxDiameter',
    variable: 'maxDiameter[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'max diameter (cm)'
  },
  {
    property: 'maxDiameter',
    variable: 'maxDiameter[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'max diameter (cm)'
  },
  {
    property: 'maxDiameter',
    variable: 'maxDiameter[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'max diameter (cm)'
  },
  {
    property: 'weight',
    variable: 'weight[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'weight (g)'
  },
  {
    property: 'weight',
    variable: 'weight[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'weight (g)'
  },
  {
    property: 'weight',
    variable: 'weight[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'weight (g)'
  },
  {
    property: 'weight',
    variable: 'weight[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'weight (g)'
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
    property: 'collectionDate',
    variable: 'collectionDate[]',
    operator: SearchLabels.equals,
    multiple: true,
    label: 'date of collection',
    type: Date
  },
  {
    property: 'collectionDate',
    variable: 'collectionDate[before]',
    operator: DateLabels.before,
    multiple: false,
    label: 'date of collection',
    type: Date
  },
  {
    property: 'collectionDate',
    variable: 'collectionDate[strictly_before]',
    operator: DateLabels.strictlyBefore,
    multiple: false,
    label: 'date of collection',
    type: Date
  },
  {
    property: 'collectionDate',
    variable: 'collectionDate[after]',
    operator: DateLabels.after,
    multiple: false,
    label: 'date of collection',
    type: Date
  },
  {
    property: 'collectionDate',
    variable: 'collectionDate[strictly_after]',
    operator: DateLabels.strictlyAfter,
    multiple: false,
    label: 'date of collection',
    type: Date
  },
]
