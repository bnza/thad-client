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
    vocabulary: 'objectType',
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
    property: 'preservation.id',
    variable: 'preservation.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'objectPreservation',
    label: 'preservation'
  },
/*   {
    property: 'preservation.id',
    variable: 'exists[preservation]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'preservation'
  }, */
  {
    property: 'preservationState.id',
    variable: 'preservationState.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'objectpreservationState',
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
    property: 'externalSurfaceColour.id',
    variable: 'externalSurfaceColour.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'objectColour',
    label: 'colour (external)'
  },
  {
    property: 'externalSurfaceColour.id',
    variable: 'exists[externalSurfaceColour]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'colour (external)'
  },
  {
    property: 'internalSurfaceColour.id',
    variable: 'internalSurfaceColour.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'objectColour',
    label: 'colour (internal)'
  },
  {
    property: 'internalSurfaceColour.id',
    variable: 'exists[internalSurfaceColour]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'colour (internal)'
  },
  {
    property: 'fractureColour.id',
    variable: 'fractureColour.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'objectColour',
    label: 'colour (fracture)'
  },
  {
    property: 'fractureColour.id',
    variable: 'exists[fractureColour]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'colour (fracture)'
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
    property: 'subperiod.id',
    variable: 'subperiod.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'subperiod',
    label: 'sub period'
  },
  {
    property: 'subperiod.id',
    variable: 'exists[subperiod]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'sub period'
  },
  {
    property: 'notes',
    variable: 'notes',
    operator: SearchLabels.contains,
    multiple: false,
    label: ' notes'
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
    operator: SearchLabels.equals,
    multiple: false,
    label: 'summary'
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
    property: 'minWidth',
    variable: 'minWidth[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'min width (cm)'
  },
  {
    property: 'minWidth',
    variable: 'minWidth[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'min width (cm)'
  },
  {
    property: 'minWidth',
    variable: 'minWidth[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'min width (cm)'
  },
  {
    property: 'minWidth',
    variable: 'minWidth[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'min width (cm)'
  },
  {
    property: 'maxWidth',
    variable: 'maxWidth[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'max width (cm)'
  },
  {
    property: 'maxWidth',
    variable: 'maxWidth[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'max width (cm)'
  },
  {
    property: 'maxWidth',
    variable: 'maxWidth[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'max width (cm)'
  },
  {
    property: 'maxWidth',
    variable: 'maxWidth[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'max width (cm)'
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
    property: 'baseDiameter',
    variable: 'baseDiameter[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'base diameter (cm)'
  },
  {
    property: 'baseDiameter',
    variable: 'baseDiameter[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'base diameter (cm)'
  },
  {
    property: 'baseDiameter',
    variable: 'baseDiameter[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'base diameter (cm)'
  },
  {
    property: 'baseDiameter',
    variable: 'baseDiameter[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'base diameter (cm)'
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
    property: 'decorations.decoration',
    variable: 'decorations.decoration[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'decoration',
    label: 'decoration'
  },
  {
    property: 'decorations',
    variable: 'exists[decorations]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'decoration (has any value)'
  },
]
