// Generated on 2015-02-03 using generator-angular-php 0.6.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths for the application
    var appConfig = {
        name: require('./package.json').name,
        version: require('./package.json').version,
        release: require('./package.json').release,
        description: require('./package.json').description,
        homepage: require('./package.json').homepage,
        license: require('./package.json').license
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        appEnv: appConfig,
        composer: {
            options: {
                usePhp: false,
                cwd: '.',
                flags: ['ignore-platform-reqs']
            }
        },
        clean: {
            deploy: {
                src: ['deploy/*.rpm', 'deploy/*.deb']
            }
        },
        chmod: {
            options: {
                mode: '755'
            },
            pharbits: {
                // Target-specific file/dir lists and/or options go here.
                src: ['bin/visorclient.phar']
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            },
            buildcmd: {
                command: './build.sh'
            },
            mkdeploy: {
                command: 'mkdir -p deploy'
            },            
            for_centos7: {
              "command": [
                [
                  '/usr/local/bin/fpm -s dir -t rpm -n \'<%= appEnv.name %>\' -v <%= appEnv.version %> '
                ].join(' -d '),
                '--description "<%= appEnv.description %>"',
                '--url "<%= appEnv.homepage %>"',
                '--license "<%= appEnv.license %>"',
                '--vendor "University of South Florida"',
                '--iteration "<%= appEnv.release %>".el7',
                '--config-files /usr/local/etc/idm_config/VisorClient.yml',
                '-p deploy ./bin/visorclient.phar=/usr/local/bin/visorclient ./config/VisorClient.yml=/usr/local/etc/idm_config/VisorClient.yml'
              ].join(' ')
            },
            fpmrpm: {
                "command": [
                    [
                        '/usr/local/bin/fpm -s dir -t rpm -n \'<%= appEnv.name %>\' -v <%= appEnv.version %> ',
                        '"php"',
                        '"php-common"',
                        '"php-mysqlnd"',
                        '"php-pdo"',
                        '"php-devel"',
                        '"php-pear"',
                        '"php-gd"',
                        '"php-mcrypt"',
                        '"php-xml"',
                        '"php-mbstring"',
                        '"php-xml"',
                        '"php-cli"'
                    ].join(' -d '),
                    '--after-install app/setupconfig.sh -p deploy ./bin/visorclient.phar=/usr/local/bin/visorclient'
                ].join(' ')
            }
        }
    });

    grunt.registerTask('build', [
        'composer:update',
        "shell:buildcmd"
    ]);

    grunt.registerTask('buildrpm', [
        "chmod:pharbits",
        "clean:deploy",
        "shell:mkdeploy",
        "shell:fpmrpm"
    ]);

};
