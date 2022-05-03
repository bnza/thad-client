import {clone, has} from 'ramda'

interface HydraMapping {
  '@type': string,
  variable: string,
  property: string,
  required: boolean
}

interface HydraSearch {
  '@type': string,
  'hydra:template': string,
  'hydra:variableRepresentation': string,
  'hydra:mapping': Array<HydraMapping>
}

interface AppFilterMapping {
  operator: string,
  variable: string,
  property: string,
  multiple: boolean
}

interface AppFilter {
  mapping: AppFilterMapping,
  value?: string|boolean
}

interface QueryStringObject extends Object {
  [key: string]: any
  [key: number]: any
}

const testSearchArrayVariableExists =
  (mappings: Array<HydraMapping>, property: string): boolean =>
    !!(mappings.filter(
      mapping => (new RegExp(`^${property}\\[\\]`)).test(mapping.variable)
    ).length)

export const parseHydraSearchMapping = ( hydraSearch: HydraSearch): Array<AppFilterMapping> => {
  const mappings = clone(hydraSearch['hydra:mapping']).filter(mapping=>!/^order\[/.test(mapping.variable))
  const appMappings: Array<AppFilterMapping> = [];
  for (const mapping of mappings) {
    const appMapping: AppFilterMapping = {
      operator: '',
      variable: mapping.variable,
      property: mapping.property,
      multiple: false
    }
    if (mapping.variable === mapping.property && testSearchArrayVariableExists(mappings, mapping.property)) {
      continue
    }
    if (/^exists\[/.test(mapping.variable)) {
      appMapping.operator = 'exists'
    } else {
      const matches = mapping.variable.match(/\[(?<type>\w+)\]/)
      appMapping.operator = matches?.groups?.type || 'search'
    }
    // @TODO implement between filter in FilterCollectionAddDialog component
    if (appMapping.operator === 'between') {
      continue
    }
    appMapping.multiple = /\w+\[\]/.test(mapping.variable)
    appMappings.push(appMapping)
  }
  return appMappings
}

export const appFiltersToQueryStringObject = (appFilters: Array<AppFilter>): QueryStringObject => {
  const filters: QueryStringObject = {};
  for (const filter of appFilters) {
    if (filter.mapping.operator === 'exists') {
      if (!has(filter.mapping.operator, filters)) {
        // @ts-ignore
        filters[filter.mapping.operator] = {}
      }
      // @ts-ignore
      filters[filter.mapping.operator][filter.mapping.property] = `${filter.value}`
    } else  {
      if (!has(filter.mapping.property, filters)) {
        // @ts-ignore
        filters[filter.mapping.property] = {}
      }
      const filterPropertyKey = filter.mapping.operator === 'search'
        // @ts-ignore
        ? Object.keys(filters[filter.mapping.property]).length
        : filter.mapping.operator

        // @ts-ignore
        filters[filter.mapping.property][filterPropertyKey] = filter.value
    }
  }
  return filters
}
