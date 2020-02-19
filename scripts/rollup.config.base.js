import alias from 'rollup-plugin-alias';
import eslint from 'rollup-plugin-eslint';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  plugins: [
    alias({
      resolve: ['.ts']
    }),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**'
    }),
    eslint({
      include: ['src/**/*.js']
    }),
    // babel({
    //   runtimeHelpers: true,
    //   exclude: 'node_modules/**' // only transpile our source code
    // }),
    typescript({
      exclude: 'node_modules/**'
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
