module.exports = {
	main: {
		files: [
			{ src: "src/index.html", dest: "dist/index.html" },
			{ src: "src/unmerge.html", dest: "dist/unmerge.html"},
			{ expand: true, cwd: "src/css/", src: ["**/*.css"], dest: "dist/css"},
			{ expand: true, cwd: "src/img/", src: ["**/*"], dest: "dist/img/"},
			{ expand: true, cwd: "src/fonts/", src: ["**/*"], dest: "dist/fonts"},
			{ expand: true, cwd: "src/js/controls/*/", src: ["**/*"], dest: "dist/controls"}
		]
	}
};