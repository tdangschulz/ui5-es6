module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.initConfig({
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.es6'],
                    dest: 'webapp',
                    ext: '.js'
                }]

            }
        },
        connect: {
            server: {
                options: {
                    port: 80,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    //open: "http://localhost:8080/webapp/index.html",
                    middleware: function (connect, options, defaultMiddleware) {
                        const proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy
                        ].concat(defaultMiddleware);
                    }
                },
                proxies: [
                    {
                        context: '/destinations/northwind',
                        host: 'services.odata.org',
                        changeOrigin: true,
                        headers: {
                            'host': 'services.odata.org'
                        },
                        rewrite: {
                            "^/destinations/northwind": ''
                        }
                    },
                    {
                        context: '/es4',
                        host: 'services.odata.org',
                        changeOrigin: true,
                        headers: {
                            // 'Authorization': 'Basic <your token>'
                            'host': 'sapes4.sapdevcenter.com'
                        },
                        rewrite: {
                            "^/destinations/es4": ''
                        }
                    }
                ]
            }
        }
    });


    grunt.registerTask('server', function () {
        grunt.task.run([
            'configureProxies:server',
            'connect:server'
        ]);
    });

    grunt.registerTask('run-server', ['babel', 'server']);
};