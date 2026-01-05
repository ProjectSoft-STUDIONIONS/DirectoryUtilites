module.exports = function(grunt) {
	var fs = require('fs'),
		PACK = grunt.file.readJSON('package.json'),
		path = require('path');
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : {},
		pkg : PACK,
		pug: {
			main: {
				options: {
					doctype: 'html',
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ 'index.pug' ],
						dest: __dirname + '/docs/',
						ext: '.html'
					},
				]
			},
		}
	});
	grunt.registerTask('default',[
		'pug'
	]);
}
