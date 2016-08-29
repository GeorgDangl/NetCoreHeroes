var gulp = require('gulp');
var merge = require('merge-stream');

var paths = {
    nodeModules: "./node_modules/",
    clientDeps: "./wwwroot/lib/"
};

var clientLibraries = [
    "core-js",
    "zone.js",
    "reflect-metadata",
    "systemjs",
    "@angular",
    "rxjs",
    "es6-shim"
];

gulp.task("copyClientDeps",
    function () {
        var mergeStream = merge();
        for (var i = 0; i < clientLibraries.length; i++) {
            mergeStream.add(gulp.src([paths.nodeModules + clientLibraries[i] + "/**/*", '!' + paths.nodeModules + clientLibraries[i] + "/**/*tsconfig.json"])
                .pipe(gulp.dest(paths.clientDeps + clientLibraries[i])));
        }
        return mergeStream;
    });