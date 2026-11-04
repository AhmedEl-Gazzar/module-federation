import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin'
import pkg from './package.json'

export default createModuleFederationConfig({
  name: pkg.name,
  exposes: {
    '.': './src/index.tsx',
    './add': './src/add.ts',
    './button': './src/button.tsx',
  },
  shared: {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
  },
})
