import './App.css'
import Header from 'header'
import Products from 'products'

import {
  registerRemotes,
  loadRemote,
} from '@module-federation/enhanced/runtime'

registerRemotes([
  {
    name: 'utils',
    entry: 'http://localhost:3003/mf-manifest.json',
  },
])

let add: ((a: number, b: number) => number) | null = null

await loadRemote<{ add: (a: number, b: number) => number }>('utils/add').then(
  module => {
    if (!module) return
    add = module.add
  },
)

const App = () => {
  console.log('2 + 3 =', add?.(2, 3))
  return (
    <div className="content">
      <Header collapse={true} />
      <Products />
    </div>
  )
}

export default App
