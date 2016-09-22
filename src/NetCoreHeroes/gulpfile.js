var gulp = require('gulp');
var merge = require('merge-stream');
var rimraf = require('rimraf');

var paths = {
    nodeModules: './node_modules/',
    clientDeps: './wwwroot/lib/'
};

var clientLibraries = [
    'core-js',
    'zone.js',
    'reflect-metadata',
    'systemjs',
    '@angular',
    'rxjs',
    'es6-shim'
];

gulp.task('copyClientDeps',
    function () {
        var mergeStream = merge();
        for (var i = 0; i < clientLibraries.length; i++) {
            mergeStream.add(gulp.src([paths.nodeModules + clientLibraries[i] + '/**/*.js'])
                .pipe(gulp.dest(paths.clientDeps + clientLibraries[i])));
        }
        return mergeStream;
    });

gulp.task('cleanClientDeps',
    function(cb) {
        return rimraf(paths.clientDeps, cb);
    });