import type { DataFetchParams } from '@module-federation/bridge-react/data-fetch'

export type Data = {
  message: string
  fetchedAt: string
  params?: DataFetchParams
}

export const fetchData = async (params?: DataFetchParams): Promise<Data> => {
  console.log('[utils] fetchData invoked with params:', params)

  // Simulate an async request so the loading state is visible in the consumer.
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    message: 'Hello from utils/src/index.data.ts',
    fetchedAt: new Date().toLocaleTimeString(),
    params,
  }
}
