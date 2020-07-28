import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import svg from 'rollup-plugin-svg';
import fs from 'fs';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: sveltePreprocess(),
		}),
		svg(),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ sourceMap: !production }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve({
			// Launch in browser (default: false)
			open: true,

			// Folder to serve files from
			contentBase: 'public',

			// Options used in setting up server
			host: 'local.local',
			port: 443,

			// By default server will be served over HTTP (https: false). It can optionally be served over HTTPS
			https: {
				key: fs.readFileSync('local-key.pem'),
				cert: fs.readFileSync('local-cert.pem'),
			},
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({
			watch: 'public',

			// other livereload options
			https: {
				key: fs.readFileSync('local-key.pem'),
				cert: fs.readFileSync('local-cert.pem'),
			}
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

// function serve() {
// 	let started = false;

// 	return {
// 		writeBundle() {
// 			if (!started) {
// 				started = true;

// 				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
// 					stdio: ['ignore', 'inherit', 'inherit'],
// 					shell: true
// 				});
// 			}
// 		}
// 	};
// }
