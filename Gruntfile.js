module.exports = function(grunt) {
	var path = require("path");

    require("load-grunt-config")(grunt, {
        configPath: path.join(process.cwd(), "grunt-config"),
        init: true
    });

	grunt.loadNpmTasks("grunt-browserify");

	grunt.registerTask("default", ["jshint", "browserify:vendor", "browserify:client", "copy", "connect", "watch"]);
};