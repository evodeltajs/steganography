var browserifyExternal = [
	"jquery"
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
	client: {
		files: {
			"dist/js/client.js": ["src/js/**/*.js"]
		},
		options: {
			external: browserifyExternal,
			browserifyOptions: {				
				debug: true
			},
		},
	},
};