export enum SearchLabels {
  equals = 'equals',
  contains = 'contains',
  startWith = 'start with',
  endWith = 'end with'
}

export enum RangeLabels {
  gt = 'greater than',
  gte = 'greater than or equal to',
  lt = 'lower than',
  lte = 'lower than or equal to',
  between = 'between'
}

export enum ExistsLabels {
  exists = 'has any value',
}

export enum DateLabels {
  before = 'before',
  strictlyBefore = 'strictly before',
  after = 'after',
  strictlyAfter = 'strictly after',
}
