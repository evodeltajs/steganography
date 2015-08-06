module.exports = {
	js: {
		files: "src/js/**/*.js",
		tasks: ["jshint", "browserify:client"],
		options: {
			spawn: false
		}
	},

	htmlCss: {
		files: [
			"src/index.html",
			"src/unmerge.html",
			"src/img/**/*",
			"src/css/**/*.css"
		],
		tasks: ["copy"],
		options: {
			spawn: false,
		}
	},
};