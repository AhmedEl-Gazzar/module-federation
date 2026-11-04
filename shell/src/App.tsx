import './App.css'
import React, { useEffect, useState } from 'react'
import Header from 'header'
import Products from 'products'
import { loadRemote } from '@module-federation/enhanced/runtime'

type Add = (a: number, b: number) => number

const RemoteButton = React.lazy(async () => {
  const module = await loadRemote<{ default: React.FC }>('utils/button')
  if (!module?.default) {
    throw new Error('Failed to load utils/button')
  }
  return { default: module.default }
})

const App = () => {
  const [add, setAdd] = useState<Add>()

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
      <Products />
      <p>2 + 3 = {add ? add(2, 3) : 'loading...'}</p>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  )
}

export default App
