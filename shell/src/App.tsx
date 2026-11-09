import './App.css'
import React, { useEffect, useState } from 'react'
import Header from 'header'
import Products from 'products'
import { getInstance, loadRemote } from '@module-federation/enhanced/runtime'
import {
  createLazyComponent,
  DataFetchParams,
  lazyLoadComponentPlugin,
} from '@module-federation/bridge-react/data-fetch'

type Add = (a: number, b: number) => number

type UtilsData = {
  message: string
  fetchedAt: string
  params?: DataFetchParams
}

const instance = getInstance()!
instance.registerPlugins([lazyLoadComponentPlugin()])

const UtilsWithData = createLazyComponent({
  instance,
  loader: async () => {
    const module = await loadRemote<{
      default: React.FC<{ mfData?: UtilsData }>
    }>('utils')
    if (!module) {
      throw new Error('Failed to load utils')
    }
    return module
  },
  loading: 'Fetching data from utils/index.data.ts...',
  export: 'default',
  dataFetchParams: { isDowngrade: false, requestedBy: 'shell' },
  fallback: <div>utils failed to load or fetch data (check the console)</div>,
})

const RemoteButton = React.lazy(async () => {
  const module = await loadRemote<{ default: React.FC }>('utils/button')
  if (!module?.default) {
    throw new Error('Failed to load utils/button')
  }
  return { default: module.default }
})

const App = () => {
  const [add, setAdd] = useState<Add>()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    loadRemote<{ add: Add }>('utils/add')
      .then(module => {
        if (!module) {
          throw new Error('Failed to load utils/add')
        }
        setAdd(() => module.add)
      })
      .catch(error => console.error('Failed to load utils/add', error))
  }, [])

  return (
    <div className="content">
      <Header collapse={true} />
      <div
        style={{
          
          padding: '15px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <button onClick={() => setToggle(!toggle)}>Toggle</button>
      </div>
      {toggle && (
        <React.Suspense fallback="Loading Button">
          <RemoteButton />
        </React.Suspense>
      )}
      <section>
        <UtilsWithData />
      </section>
      <Products />
      <p>Remote add function: 2 + 3 = {add ? add(2, 3) : 'loading...'}</p>
    </div>
  )
}

export default App
