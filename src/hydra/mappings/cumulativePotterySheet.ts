import {RangeLabels, SearchLabels} from "~/src/hydra";
type FilterMapping = {
  property: string;
  variable: string;
  multiple: boolean;
  label: string;
  operator: any
}

const operators = [
  {type: SearchLabels, key: 'equals' },
  {type: RangeLabels, key: 'gt' },
  {type: RangeLabels, key: 'gte' },
  {type: RangeLabels, key: 'lt' },
  {type: RangeLabels, key: 'lte' },
]

const wareMappings = [
  {
    property: 'stratigraphicUnit.number',
    label: 'number'
  },
  {
    property: 'commonWareNonDiagnosticCount',
    label: 'common ware non diagnostic sherd count'
  },
  {
    property: 'commonWareDiagnosticCount',
    label: 'common ware diagnostic sherd count',
  },
  {
    property: 'fineWareNonDiagnosticCount',
    label: 'fine ware non diagnostic sherd count',
  },
  {
    property: 'fineWareDiagnosticCount',
    label: 'fine ware diagnostic sherd count',
  },
  {
    property: 'coarseWareNonDiagnosticCount',
    label: 'coarse ware non diagnostic sherd count',
  },
  {
    property: 'coarseWareDiagnosticCount',
    label: 'coarse ware diagnostic sherd count',
  },
  {
    property: 'kitchenWareNonDiagnosticCount',
    label: 'kitchen ware non diagnostic sherd count',
  },
  {
    property: 'kitchenWareDiagnosticCount',
    label: 'kitchen ware diagnostic sherd count',
  },
  {
    property: 'cumulativeWareCount',
    label: 'cumulative ware sherd count',
  },
  {
    property: 'diagnosticWareCount',
    label: 'diagnostic ware sherd count',
  },
  {
    property: 'subperiodEPNCount',
    label: 'subperiod Early Pottery Neolithic sherd count',
  },
  {
    property: 'subperiodHASCount',
    label: 'subperiod Hassuna sherd count',
  },
  {
    property: 'subperiodSAMCount',
    label: 'subperiod Samarra sherd count',
  },
  {
    property: 'subperiodHALCount',
    label: 'subperiod Halaf sherd count',
  },
  {
    property: 'subperiodNUBCount',
    label: 'subperiod Northern Ubaid sherd count',
  },
  {
    property: 'subperiodLCACount',
    label: 'subperiod Late Chalcolithic (generic) sherd count',
  },
  {
    property: 'subperiodLCA1Count',
    label: 'subperiod Late Chalcolithic 1 sherd count',
  },
  {
    property: 'subperiodLCA2Count',
    label: 'subperiod Late Chalcolithic 2 sherd count',
  },
  {
    property: 'subperiodLCA3Count',
    label: 'subperiod Late Chalcolithic 3 sherd count',
  },
  {
    property: 'subperiodLCA4Count',
    label: 'subperiod Late Chalcolithic 4 sherd count',
  },
  {
    property: 'subperiodLCA5Count',
    label: 'subperiod Late Chalcolithic 5 sherd count',
  },
  {
    property: 'subperiodSURCount',
    label: 'subperiod Southern Uruk sherd count',
  },
  {
    property: 'subperiodEMTCount',
    label: 'subperiod Early Middle Tigris (generic) sherd count',
  },
  {
    property: 'subperiodEMT0Count',
    label: 'subperiod Early Middle Tigris 0 sherd count',
  },
  {
    property: 'subperiodEMT1Count',
    label: 'subperiod Early Middle Tigris 1 sherd count',
  },
  {
    property: 'subperiodEMT2Count',
    label: 'subperiod Early Middle Tigris 2 sherd count',
  },
  {
    property: 'subperiodEMT3Count',
    label: 'subperiod Early Middle Tigris 3 sherd count',
  },
  {
    property: 'subperiodEMT4Count',
    label: 'subperiod Early Middle Tigris 4 sherd count',
  },
  {
    property: 'subperiodEMT5Count',
    label: 'subperiod Early Middle Tigris 5 sherd count',
  },
  {
    property: 'subperiodMBACount',
    label: 'subperiod Middle Bronze Age (generic) sherd count',
  },
  {
    property: 'subperiodMBA1Count',
    label: 'subperiod Middle Bronze Age 1 sherd count',
  },
  {
    property: 'subperiodMBA2Count',
    label: 'subperiod Middle Bronze Age 2 sherd count',
  },
  {
    property: 'subperiodLBA1Count',
    label: 'subperiod Late Bronze Age 2 / Middle Assyrian sherd count',
  },
  {
    property: 'subperiodLBA2Count',
    label: 'subperiod Late Bronze Age 2 / Middle Assyrian sherd count',
  },
  {
    property: 'subperiodIRA1Count',
    label: 'subperiod Iron Age 1-2 / Neo Assyrian sherd count',
  },
  {
    property: 'subperiodIRA2Count',
    label: 'subperiod Iron Age 3 / Achaemenid sherd count',
  },
  {
    property: 'subperiodHELCount',
    label: 'subperiod Hellenistic sherd count',
  },
  {
    property: 'subperiodPARCount',
    label: 'subperiod Parthian sherd count',
  },
  {
    property: 'subperiodBYZCount',
    label: 'subperiod Byzantine sherd count',
  },
  {
    property: 'subperiodSASCount',
    label: 'subperiod Sasanian sherd count',
  },
  {
    property: 'subperiodISLCount',
    label: 'subperiod Islamic (generic) sherd count',
  },
  {
    property: 'subperiodISL1Count',
    label: 'subperiod Early Islamic sherd count',
  },
  {
    property: 'subperiodISL2Count',
    label: 'subperiod Middle Islamic sherd count',
  },
  {
    property: 'subperiodISL3Count',
    label: 'subperiod Late Islamic sherd count',
  },
  {
    property: 'periodEPNCount',
    label: 'period Early Pottery Neolithic sherd count',
  },
  {
    property: 'periodHASCount',
    label: 'period Hassuna sherd count',
  },
  {
    property: 'periodSAMCount',
    label: 'period Samarra sherd count',
  },
  {
    property: 'periodHALCount',
    label: 'period Halaf sherd count',
  },
  {
    property: 'periodNUBCount',
    label: 'period Northern Ubaid sherd count',
  },
  {
    property: 'periodLCACount',
    label: 'period Late Chalcolithic sherd count',
  },
  {
    property: 'periodEBACount',
    label: 'period Early Bronze Age sherd count',
  },
  {
    property: 'periodEBACount',
    label: 'period Early Bronze Age sherd count',
  },
  {
    property: 'periodEBACount',
    label: 'period Early Bronze Age sherd count',
  },
  {
    property: 'periodMBACount',
    label: 'period Middle Bronze Age sherd count',
  },
  {
    property: 'periodLBACount',
    label: 'period Late Bronze Age sherd count',
  },
  {
    property: 'periodIRACount',
    label: 'period Iron Age sherd count',
  },
  {
    property: 'periodHELCount',
    label: 'period Hellenistic sherd count',
  },
  {
    property: 'periodPARCount',
    label: 'period Parthian sherd count',
  },
  {
    property: 'periodBYZCount',
    label: 'period Byzantine sherd count',
  },
  {
    property: 'periodSASCount',
    label: 'period Sasanian sherd count',
  },
  {
    property: 'periodISLCount',
    label: 'period Islamic sherd count',
  },
]

const generateMapping: (mapping: { property: string; label: string }) => Array<FilterMapping> = (mapping: {property: string, label: string}) => operators.map(
  ({type, key}) => {
    const variableKey = type === SearchLabels ? '' : key
    return {
      property: mapping.property,
      variable: `${mapping}[${variableKey}]`,
      // @ts-ignore
      operator: type[key],
      multiple: type === SearchLabels,
      label: mapping.label
    }
  }
)

/* const generateMappings = () => wareMappings.map(
  generateMapping
) */

const generateMappings = () => {
  let _mapping: Array<FilterMapping> = []
  for (const wareMapping of wareMappings) {
    _mapping = _mapping.concat(generateMapping(wareMapping))
  }
  return _mapping
}

const mappings = [
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
    property: 'compiler',
    variable: 'compiler',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'compiler'
  },
  {
    property: 'notes',
    variable: 'notes',
    operator: SearchLabels.contains,
    multiple: false,
    label: 'notes'
  },
]

// @ts-ignore
const _exported =  mappings.concat(generateMappings())

export default _exported
