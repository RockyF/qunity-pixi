/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity-pixi';

const prod = process.env.BUILD === 'production';

const options = {
	input: 'src/index.ts',
	output: [
		/*{
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
		},*/
		{
			file: prod ? 'dist/index.min.js' : 'dist/index.js',
			sourcemap: !prod,
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

if (prod) {
	options.plugins.push(uglify({}));
}

export default options;
