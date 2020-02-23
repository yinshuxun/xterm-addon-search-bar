import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

import baseConfig from './rollup.config.base';
import { name, version, author, global } from '../package.json';

const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

export default [
  {
    ...baseConfig,
    output: [
      {
        file: `lib/${name}.cjs.js`,
        format: 'cjs',
        banner
      },
      {
        file: `lib/${name}.esm.js`,
        format: 'es',
        banner
      }
    ],
    plugins: [...baseConfig.plugins, filesize()]
  },
  {
    ...baseConfig,
    output: [
      {
        file: `lib/${name}.js`,
        format: 'umd',
        name: global,
        banner
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify(
        {
          compress: {
            drop_console: true
          }
        },
        minify
      ),
      filesize()
    ]
  }
];
