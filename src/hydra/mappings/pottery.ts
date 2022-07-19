import {RangeLabels, SearchLabels, ExistsLabels, DateLabels} from "~/src/hydra";

export default [
  {
    property: 'stratigraphicUnit.id',
    variable: 'stratigraphicUnit.id[]',
    operator: SearchLabels.equals,
    multiple: true,
    type: 'stratigraphicUnit',
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
    vocabulary: 'potteryType',
    label: 'type'
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
    vocabulary: 'period',
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
    property: 'material.id',
    variable: 'material.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'material',
    label: 'material'
  },
  {
    property: 'ware.id',
    variable: 'ware.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'ware',
    label: 'ware'
  },
  {
    property: 'ware.id',
    variable: 'exists[ware]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'ware'
  },
  {
    property: 'fabric.id',
    variable: 'fabric.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'fabric',
    label: 'fabric'
  },
  {
    property: 'fabric.id',
    variable: 'exists[fabric]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'fabric'
  },
  {
    property: 'surfaceTreatment.id',
    variable: 'surfaceTreatment.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'surfaceTreatment',
    label: 'surface treatment'
  },
  {
    property: 'surfaceTreatment.id',
    variable: 'exists[surfaceTreatment]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'surface treatment'
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
    property: 'surfaceCharacteristic.id',
    variable: 'surfaceCharacteristic.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'surfaceCharacteristic',
    label: 'surface characteristic'
  },
  {
    property: 'surfaceCharacteristic.id',
    variable: 'exists[surfaceCharacteristic]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'surface characteristic'
  },
  {
    property: 'manufacturingTechnique.id',
    variable: 'manufacturingTechnique.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'manufacturingTechnique',
    label: 'manufacturing technique'
  },
  {
    property: 'manufacturingTechnique.id',
    variable: 'exists[manufacturingTechnique]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'manufacturing technique'
  },
  {
    property: 'firing.id',
    variable: 'firing.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'firing',
    label: 'firing'
  },
  {
    property: 'firing.id',
    variable: 'exists[firing]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'firing'
  },
  {
    property: 'decoration.id',
    variable: 'decoration.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'decoration',
    label: 'decoration'
  },
  {
    property: 'decoration.id',
    variable: 'exists[decoration]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'decoration'
  },
  {
    property: 'vesselShape.id',
    variable: 'vesselShape.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'vesselShape',
    label: 'vessel shape'
  },
  {
    property: 'vesselShape.id',
    variable: 'exists[vesselShape]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'vessel shape'
  },
  {
    property: 'baseShape.id',
    variable: 'exists[baseShape]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'base shape'
  },
  {
    property: 'baseShape.id',
    variable: 'baseShape.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'baseShape',
    label: 'base shape'
  },
  {
    property: 'rimShape.id',
    variable: 'exists[rimShape]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'rim shape'
  },
  {
    property: 'rimShape.id',
    variable: 'rimShape.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'rimShape',
    label: 'rim shape'
  },
  {
    property: 'rimDirection.id',
    variable: 'exists[rimDirection]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'rim direction'
  },
  {
    property: 'rimDirection.id',
    variable: 'rimDirection.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'rimDirection',
    label: 'rim direction'
  },
  {
    property: 'rimCharacterization.id',
    variable: 'exists[rimCharacterization]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'rim characterization'
  },
  {
    property: 'rimCharacterization.id',
    variable: 'rimCharacterization.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'rimCharacterization',
    label: 'rim characterization'
  },
  {
    property: 'neck.id',
    variable: 'exists[neck]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'neck'
  },
  {
    property: 'neck.id',
    variable: 'neck.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'neck',
    label: 'neck'
  },
  {
    property: 'neckLength.id',
    variable: 'exists[neckLength]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'neck length'
  },
  {
    property: 'neckLength.id',
    variable: 'neckLength.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'neckLength',
    label: 'neck length'
  },
  {
    property: 'body.id',
    variable: 'exists[body]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'body'
  },
  {
    property: 'body.id',
    variable: 'body.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'body',
    label: 'body'
  },
  {
    property: 'spout.id',
    variable: 'exists[spout]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'spout'
  },
  {
    property: 'spout.id',
    variable: 'spout.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'spout',
    label: 'spout'
  },
  {
    property: 'handle.id',
    variable: 'exists[handle]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'handle'
  },
  {
    property: 'handle.id',
    variable: 'handle.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'handle',
    label: 'handle'
  },
  {
    property: 'sizeGroup.id',
    variable: 'exists[sizeGroup]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'size group'
  },
  {
    property: 'sizeGroup.id',
    variable: 'sizeGroup.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'sizeGroup',
    label: 'size group'
  },
  {
    property: 'preservation.id',
    variable: 'preservation.id[]',
    operator: SearchLabels.equals,
    multiple: false,
    vocabulary: 'preservation',
    label: 'preservation'
  },
  {
    property: 'preservation.id',
    variable: 'exists[preservationS]',
    operator: ExistsLabels.exists,
    multiple: false,
    label: 'preservation'
  },
  {
    property: 'notes',
    variable: 'notes',
    operator: SearchLabels.contains,
    multiple: false,
    label: ' notes'
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
    property: 'rimDiameter',
    variable: 'rimDiameter[gt]',
    operator: RangeLabels.gt,
    multiple: false,
    label: 'rim diameter (cm)'
  },
  {
    property: 'rimDiameter',
    variable: 'rimDiameter[gte]',
    operator: RangeLabels.gte,
    multiple: false,
    label: 'rim diameter (cm)'
  },
  {
    property: 'rimDiameter',
    variable: 'rimDiameter[lt]',
    operator: RangeLabels.lt,
    multiple: false,
    label: 'rim diameter (cm)'
  },
  {
    property: 'rimDiameter',
    variable: 'rimDiameter[lte]',
    operator: RangeLabels.lte,
    multiple: false,
    label: 'rim diameter (cm)'
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
]
