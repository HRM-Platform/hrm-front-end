export const STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request. Please check your input.',
  401: 'Unauthorized. Please log in again.',
  403: 'Forbidden. You do not have permission.',
  404: 'Not Found. The requested resource was not found.',
  408: 'Request Timeout. Please try again later.',
  422: 'Unprocessable Entity. Validation failed.',
  429: 'Too Many Requests. Please wait a moment.',
  500: 'Internal Server Error. Please try again later.',
  502: 'Bad Gateway. Server communication error.',
  503: 'Service Unavailable. Please try again soon.',
  504: 'Gateway Timeout. The server took too long to respond.',
};
