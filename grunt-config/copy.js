module.exports = {
	main: {
		files: [
			{ src: "src/index.html", dest: "dist/index.html" },
			{ expand: true, cwd: "src/css/", src: ["**/*.css"], dest: "dist/css"},
			{ expand: true, cwd: "src/img/", src: ["**/*"], dest: "dist/img/"},
		]
	}
};