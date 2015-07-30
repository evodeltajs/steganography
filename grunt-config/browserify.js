var browserifyExternal = [
];

module.exports = {
	vendor: {
		files: {
			"dist/js/vendor.js": []
		},
		options: {
			require: browserifyExternal
		}
	},
	watch: {
		files: {
			"dist/js/client.js": ["src/js/**/*.js"]
		},
		options: {
			external: browserifyExternal,
			browserifyOptions: {				
				debug: true
			},
			watch: true,
		},
	},
};