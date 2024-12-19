import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const tracingInfo = {
    apiRequestId: event.requestContext.requestId,
    lambdaRequestId: context.awsRequestId,
  }

  // logs consumes memory and increase the time of the lambda function, so it also increase the costs per use.
  console.log(
    `API Gateway RequestId: ${tracingInfo.apiRequestId} \nLambda RequestId: ${tracingInfo.lambdaRequestId}`
  )

  const method = event.httpMethod

  if (event.resource !== '/products' || method !== 'GET') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad request',
      }),
    }
  }

  console.log('GET')

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GET Products - OK',
    }),
  }
}
