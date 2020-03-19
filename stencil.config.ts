import { Config } from '@stencil/core';
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'jpl-web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
      sass()
  ],
  globalScript: 'src/global/jpl-global.ts',
  globalStyle: 'src/global/variables.css',
};
