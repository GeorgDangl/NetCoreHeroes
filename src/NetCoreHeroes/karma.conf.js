module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'systemjs.chutzpah.config.js',
            'App/hero.ts',
            'App/**/*.service.ts',
            'App/**/*.spec.ts'
        ],
        preprocessors: {
            'App/**/*.ts': [ 'karma-typescript']
        },
        reporters: ['progress', 'dots', 'karma-typescript', 'junit'],
        browsers: ['PhantomJS'],
        singleRun: true,
        junitReporter: {
            outputDir: '',
            outputFile: 'karma-results.xml',
            useBrowserName: false
        }
    });
}