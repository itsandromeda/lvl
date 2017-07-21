var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


var config = {
    source: './src/',
    dist: './public/',
    modules: './node_modules/'
};

var paths = {
    assets: "assets/",
    html: "**/*.html",
    json: '**/*.json',
    png: "img/**/*.png",
    jpg: "img/**/*.jpg",
    js: "js/*.js",

    components: "components/**",
    utils: "utils/**",

    css: "css",
    sass: "scss/**/*.scss",
    mainSass: "scss/main.scss",
    mainJS: "js/**/*.js",
    SASS: 'scss/**/*.scss',
    bootstrap: 'bootstrap/dist/'
};

var sources = {
    assets: config.source + paths.assets,
    html: config.source + paths.html,
    json: config.source + paths.json,
    png: config.source + paths.assets + paths.png,
    jpg: config.source + paths.assets + paths.jpg,
    js: config.source + paths.assets + paths.js,
    sass: config.source + paths.assets + paths.sass,
    rootSass: config.source + paths.assets + paths.mainSass,
    rootJS: config.source + paths.assets + paths.mainJS,
    bootstrapCSS: config.modules + paths.bootstrap + 'css/bootstrap.min.css',
    bootstrapJS: config.modules + paths.bootstrap + 'js/bootstrap.min.js'
};

gulp.task('html', () => {
    gulp.src(sources.html)
        .pipe(gulp.dest(config.dist));
});

gulp.task('json', () => {
    gulp.src(sources.json)
        .pipe(gulp.dest(config.dist));
})

gulp.task('img', () => {
    gulp.src([sources.png, sources.jpg])
        .pipe(gulp.dest(config.dist + paths.assets + "img"));
});

gulp.task('sass', () => {
    gulp.src([sources.bootstrapCSS, sources.rootSass])
        .pipe(sass({
            outputStyle: 'expanded'
        }).on("error", sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.dist + paths.assets + "css"));
});

gulp.task('js', () => {
    gulp.src([sources.bootstrapJS, sources.rootJS])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.dist + paths.assets + "js"));
});

gulp.task("html-watch", ["html"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("json-watch", ["json"], function (donde) {
    browserSync.reload();
    done();
})

gulp.task("img-watch", ["img"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("js-watch", ["js"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("sass-watch", ["sass"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("serve", () => {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });

    gulp.watch(sources.html, ["html-watch"]);
    gulp.watch(sources.json, ["json-watch"]);
    gulp.watch([sources.jpg, sources.png], ["img-watch"]);
    gulp.watch(sources.fonts, ["fonts-watch"]);
    gulp.watch(sources.sass, ["sass-watch"]);
    gulp.watch(sources.rootJS, ["js-watch"]);

});