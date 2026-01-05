module.exports = function(grunt) {
	var fs = require('fs'),
		PACK = grunt.file.readJSON('package.json'),
		COPYPACK = grunt.file.readJSON('copypack.json'),
		path = require('path');
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : {},
		pkg : PACK,
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'assets/plugins',
						src: ['**/*.*'],
						dest: COPYPACK.dest,
					},
				]
			}
		},
		pug: {
			main: {
				options: {
					doctype: 'html',
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"pagetitle": PACK.description
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
		'pug',
		'copy'
	]);
}
