import alias from 'rollup-plugin-alias';
import eslint from 'rollup-plugin-eslint';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const isProductionEnv = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  plugins: [
    postcss({
      extract: false,
      minimize: isProductionEnv,
      extensions: ['.css']
    }),
    alias({
      resolve: ['.ts']
    }),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    eslint({
      include: ['src/**/*.js']
    }),
    typescript({
      exclude: 'node_modules/**',
      declarationDir:'./typings'
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  output: [
    {
      format: 'cjs',
      file: 'xterm-addon-search-bar',
      sourcemap: true
    },
    {
      format: 'es',
      file: 'xterm-addon-search-bar',
      sourcemap: true
    }
  ]
};
