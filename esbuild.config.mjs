import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'
import fs from 'fs'

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === 'production');

const moveStyles = {
	name: 'move-styles',
	setup(build) {
		build.onEnd(() => {
			fs.copyFileSync('./plugin/styles.css', './styles.css');
		});
	}
}


esbuild.build({
	banner: {
		js: banner,
	},
	entryPoints: ['plugin/main.ts', "plugin/styles.css"],
	bundle: true,
	external: ['obsidian', 'electron', ...builtins],
	sourcemap: prod ? false : "inline",
	format: 'cjs',
	watch: !prod,
	target: 'es2016',
	logLevel: "info",
	minify: prod,
	treeShaking: true,
	outdir: './',
	plugins: [moveStyles],
}).catch(() => process.exit(1));
