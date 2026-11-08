import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin'
import path from 'path'

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    header: 'header@http://localhost:3001/mf-manifest.json',
    products: 'products@http://localhost:3002/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  runtimePlugins: [
    [
      path.resolve(__dirname, './plugin.ts'),
      {
        fromHost: 'registry.example.com',
        toHost: 'cdn.example.com',
      },
    ],
  ],
})
