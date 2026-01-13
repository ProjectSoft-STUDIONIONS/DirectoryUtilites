module.exports = function(grunt) {
	var fs = require('fs'),
		PACK = grunt.file.readJSON('package.json'),
		COPYPACK = {
			dest: false
		},
		path = require('path'),
		date = new  Date(),
		year = date.getFullYear(),
		month = String(date.getMonth() + 1).padStart(2, "0"),
		day = String(date.getDate()).padStart(2, "0");
	PACK.site = "https://projectsoft-studionions.github.io";
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	if(fs.existsSync('copypack.json')) {
		COPYPACK = grunt.file.readJSON('copypack.json');
	}

	grunt.initConfig({
		globalConfig : {},
		pkg : PACK,
		clean: {
			zip: ['*.zip']
		},
		'string-replace': {
			tpl: {
				files: {
					'install/assets/plugins/': 'install/assets/plugins/**',
					'assets/plugins/utilites/directory/': 'assets/plugins/utilites/directory/**',
					'assets/plugins/utilites/renderparams/': 'assets/plugins/utilites/renderparams/**',
					'assets/plugins/utilites/tinymce4css/': 'assets/plugins/utilites/tinymce4css/**',
					'assets/plugins/utilites/treemanager/': 'assets/plugins/utilites/treemanager/**',
				},
				options: {
					replacements: [
						{
							pattern: /[ ]+\*(?:\s+)\@version(\s+)([\d.]+)/gi,
							replacement: ` * @version$1${PACK.version}`,
						},
						{
							pattern: /[ ]+\*(?:\s+)\@lastupdate(\s+)([\d.-]+)/gi,
							replacement: ` * @lastupdate$1${year}-${month}-${day}`,
						},
						{
							pattern: /\@modx_category(\s+).+/gi,
							replacement: `@modx_category Utilites`,
						},
					],
				},
			},
		},
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [],
				},
				files : {
					// docs
					'src/css/main.css': [
						'src/css/main.less'
					]
				},
			},
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			css: {
				files: {
					// docs
					'src/css/main.css': [
						'src/css/main.css'
					],
				},
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					// docs
					'src/css/main.css': [
						'src/css/main.css'
					],
				},
			}
		},
		pug: {
			main: {
				options: {
					doctype: 'html',
					client: false,
					pretty: '', //'\t',
					separator:  '', //'\n',
					data: function(dest, src) {
						return PACK
					},
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ 'index.pug' ],
						dest: __dirname + '/docs/',
						ext: '.html',
					},
				],
			},
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'assets/plugins',
						src: ['**/*.*'],
						dest: COPYPACK.dest ? COPYPACK.dest : __dirname + "/test/",
					},
				],
			},
		},
		compress: {
			main: {
				options: {
					archive: `${PACK.title}.zip`,
				},
				files: [
					{
						src: [
							'assets/**',
							'install/**',
						],
						dest: `${PACK.title}/`,
					},
				],
			},
		},
	});
	grunt.registerTask('default', [
		'clean',
		// Компиляция CSS
		'less',
		'autoprefixer',
		'cssmin',
		'string-replace',
		'pug',
		'copy',
		'compress'
	]);
}
