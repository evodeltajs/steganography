module.exports = function(grunt) {
	var path = require("path");

    require("load-grunt-config")(grunt, {
        configPath: path.join(process.cwd(), "grunt-config"),
        init: true
    });

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("assemble-less");

	grunt.registerTask("default", ["jshint", "less", "browserify:vendor", "browserify:client", "copy", "connect", "watch"]);
};