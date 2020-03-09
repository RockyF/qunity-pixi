/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'umd',
		name: 'qunity-pixi-samples',
		sourcemap: true,
		globals: {
			'pixi.js': 'PIXI',
			'qunity-core': 'qunity-core',
			'qunity-pixi': 'qunity-pixi',
		}
	},
	plugins: [
		typescript({
			typescript: require('typescript'),
			include: ['**/*.ts+(|x)', '../src/**/*.ts+(|x)',]
		}),
	],
	external: ['pixi.js', 'qunity-core', 'qunity-pixi', ]
};
