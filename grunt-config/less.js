module.exports = {
	options: {
		cleancss: true,
		/*imports: {
			less: ["common.less"]
		}*/
	},

	styles: {
		files: {
			"dist/css/main.css": ["src/less/vendor/*.less", "src/**/*.less"]
		}
	}
};