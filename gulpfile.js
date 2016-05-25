var gulp = require("gulp")
var clean = require("gulp-clean")
var tsc = require("gulp-typescript")
var runElectron = require("gulp-run-electron");

var tsProject = tsc.createProject("./tsconfig.json");

var paths = {
    typescript_src: [
        "./app/scripts/**/*.ts",
        "./app/scripts/**/*.tsx"
    ],
    typescript_typings: [
        "./typings/browser/**/*.d.ts",
        "./typings/browser.d.ts"
    ],
    app_assets: [
        "./app/**",
        "!./app/scripts/**"
    ]
}

gulp.task("clean:assets", function() {
    return gulp.src(["./build/*", "!./build/scripts"], {read: false})
        .pipe(clean());
});

gulp.task("clean:scripts", function() {
    return gulp.src("./build/scripts", {read: false})
        .pipe(clean());
});

gulp.task("clean", function() {
    return gulp.src("./build", {read: false})
        .pipe(clean());
});

gulp.task("copy", ["clean:assets"], function() {
    return gulp.src(paths.app_assets)
        .pipe(gulp.dest("./build"));
});

gulp.task("compile", ["clean:scripts"], function() {
    return gulp.src(paths.typescript_src.concat(paths.typescript_typings))
        .pipe(tsc(tsProject)).js
        .pipe(gulp.dest("./build/scripts"));
});

gulp.task("start", ["copy", "compile"], function () {
    return gulp.src("build")
        .pipe(runElectron());
});

gulp.task("watch", ["start"], function () {
    gulp.watch(paths.typescript_src, ["compile"]);
    gulp.watch(paths.app_assets, ["copy"]);
});
