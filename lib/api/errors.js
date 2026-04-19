export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{status:number, code:string, details:Record<string, unknown>, endpoint:string}} meta
   */
  constructor(message, meta) {
    super(message)
    this.name = 'ApiError'
    this.status = meta.status
    this.code = meta.code
    this.details = meta.details
    this.endpoint = meta.endpoint
  }
}

/**
 * @param {unknown} error
 * @param {string} endpoint
 * @returns {ApiError}
 */
export function normalizeApiError(error, endpoint) {
  if (error instanceof ApiError) return error

  if (error instanceof Error) {
    return new ApiError(error.message, {
      status: 500,
      code: 'internal_error',
      details: {},
      endpoint,
    })
  }

  return new ApiError('Unexpected API error.', {
    status: 500,
    code: 'internal_error',
    details: {},
    endpoint,
  })
}
