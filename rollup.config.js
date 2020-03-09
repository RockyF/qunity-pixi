/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity-pixi';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: `dist/index.js`,
			sourcemap: true,
			format: 'cjs',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			}
		},
		{
			file: `dist/index.es.js`,
			sourcemap: true,
			format: 'es',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
		},
		{
			file: `dist/index.umd.js`,
			sourcemap: true,
			format: 'umd',
			globals: {
				'pixi.js': 'PIXI',
				'qunity': 'qunity',
			},
			name,
		}
	],
	plugins: [
		resolve({
			browser: true,
		}),
		typescript({
			typescript: require('typescript'),
		}),
		//uglify({}),
	],
	external: ['pixi.js', 'qunity', ]
};

