import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';

import { name, global } from '../package.json';

export default {
  ...baseConfig,
  output: [
    {
      file: `lib/${name}.js`,
      format: 'umd',
      name: global,
      sourcemap: true
    },
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 7000,
      contentBase: ['.']
    })
  ]
};
