var gulp = require('gulp');

var paths = {
    nodeModules: "./node_modules/",
    clientDeps: "./wwwroot/lib/"
};

var clientLibraries = [
    "core-js",
    "zone-js",
    "reflect-metadata",
    "systemjs",
    "@angular",
    "rxjs"
];

gulp.task("copyClientDeps",
    function() {
        for (var i = 0; i < clientLibraries.length; i++) {
            gulp.src(paths.nodeModules + clientLibraries[i] + "/**/*")
                .pipe(gulp.dest(paths.clientDeps + clientLibraries[i]));
        }
    });