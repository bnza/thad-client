/**
 * @typedef {Object} HydraProperty
 * @property {string} @id
 * @property {string} @type
 * @property {string} rdfs:label
 * @property {string} domain
 * @property {string} range
 */

/**
 * @typedef {Object} HydraSupportedProperty
 * @property {string} @type
 * @property {HydraProperty} hydra:property
 * @property {string} hydra:title
 * @property {boolean} hydra:required
 * @property {boolean} hydra:readable
 * @property {boolean} hydra:writeable
 */

/**
 * @typedef {Object} HydraSupportedOperation
 * @property {string[]} @type
 * @property {string} hydra:method
 * @property {string} hydra:title
 * @property {string} rdfs:label
 * @property {string} returns
 */

/**
 * @typedef {Object} HydraSupportedClass
 * @property {string} @id
 * @property {string} @type
 * @property {string} rdfs:label
 * @property {string} hydra:title
 * @property {HydraSupportedProperty[]} hydra:supportedProperty
 * @property {HydraSupportedOperation[]} hydra:supportedOperation
 */

/**
 * @typedef {Object} HydraVocab
 * @property {string} @id
 * @property {string} @type
 * @property {string} hydra:title
 * @property {string} hydra:entrypoint
 * @property {HydraSupportedClass[]} hydra:hydra:supportedClass
 */



