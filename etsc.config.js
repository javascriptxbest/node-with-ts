module.exports = {
	tsConfigFile: "./tsconfig.etsc.json",
	esbuild: {
		minify: false,
		target: "esnext",
		outdir: "./dist",
	}
}