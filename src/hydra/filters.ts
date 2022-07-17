import {clone, has} from 'ramda'
import mappings from './mappings'
import {RangeLabels, ExistsLabels, DateLabels} from "~/src/hydra/index";

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
  multiple: boolean,
  vocabulary?: string,
  label?: string
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

const operatorLabelToOperator = (label: string): string => {
/*   // @ts-ignore
  if ([SearchLabels.equals, SearchLabels.contains, SearchLabels.startWith, SearchLabels.endWith].includes(label)) {
    return ''
  } */
  if (RangeLabels.gt === label) {
    return  'gt'
  }
  if (RangeLabels.gte === label) {
    return  'gte'
  }
  if (RangeLabels.lt === label) {
    return  'lt'
  }
  if (RangeLabels.lte === label) {
    return  'lte'
  }
  if (RangeLabels.between === label) {
    return  'between'
  }
  if (ExistsLabels.exists === label) {
    return 'exists'
  }
  if (DateLabels.after === label) {
    return 'after'
  }
  if (DateLabels.strictlyAfter === label) {
    return 'strictly_after'
  }
  if (DateLabels.before === label) {
    return 'before'
  }
  if (DateLabels.strictlyBefore === label) {
    return 'strictly_before'
  }
  return ''
}

export const appFiltersToQueryStringObject = (appFilters: Array<AppFilter>): QueryStringObject => {
  const filters: QueryStringObject = {};
  for (const filter of appFilters) {
    const operator = operatorLabelToOperator(filter.mapping.operator)
    if (operator === 'exists') {
      if (!has(operator, filters)) {
        // @ts-ignore
        filters[operator] = {}
      }
      const property = filter.mapping.property.slice(-3) === '.id' ? filter.mapping.property.slice(0, -3) : filter.mapping.property
      // @ts-ignore
      filters[operator][property] = `${filter.value}`
    } else  {
      if (!has(filter.mapping.property, filters)) {
        // @ts-ignore
        filters[filter.mapping.property] = filter.mapping.multiple || filter.mapping.vocabulary ? [] : {}
      }
      if (filter.mapping.vocabulary) {
        // @ts-ignore
        for (const entry of filter.value) {
          // @ts-ignore
          filters[filter.mapping.property].push(entry.id)
        }
      } else if (filter.mapping.multiple) {
        // @ts-ignore
        filters[filter.mapping.property].push(filter.value)
      } else {
        // @ts-ignore
        filters[filter.mapping.property][operator] = filter.value
      }
    }
  }
  return filters
}

export const getApplicableFilters = (resourceName:string): Array<AppFilterMapping> => {
  return clone(applicableFilters[resourceName]) || []
}

const applicableFilters: Record<string, Array<AppFilterMapping>> = mappings
