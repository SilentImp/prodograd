var gulp = require('gulp')
    , svgstore = require('gulp-svgstore')
    , replace = require('gulp-regex-replace')
    , svgmin = require('gulp-svgmin')
    , svgSprite = require("gulp-svg-sprites")
    , sourcemaps = require('gulp-sourcemaps')
    , jade = require('gulp-jade')
    , babel = require('gulp-babel')
    , imagemin = require('gulp-imagemin')
    , plumber = require('gulp-plumber')
    , pngquant = require('imagemin-pngquant')
    , svgo = require('imagemin-svgo')
    , order = require("gulp-order")
    , postcss = require('gulp-postcss')
    , custom = require('postcss-custom-properties')
    , nested = require('postcss-nested')
    , color = require('postcss-color-function')
    , vars = require('postcss-simple-vars')
    , mixin = require('postcss-mixins')
    , imprt = require('postcss-import')
    , autoprefixer = require('autoprefixer-core')
    , concat = require('gulp-concat')
    , find = require('find')
    , path = require('path')
    , gulpif = require('gulp-if')
    , rename = require("gulp-rename")
    , iconfont = require('gulp-iconfont')
    , uglify = require('gulp-uglify')
    , cssnano = require('cssnano')
    , dirs = {
      'source': {
        'jade': ['./source/elements/**/*.jade','./source/pages/*.jade','./source/partials/*.jade']
        , 'page': './source/pages/*.jade'
        , 'list': './source/list/index.jade'
        , 'copy': './source/copy/**/*'
        , 'js': ['./source/elements/**/*.js', './source/js/*.js']
        , 'css': ['./source/elements/**/*.css', './source/css/*.css']
        , 'csswatch': ['./source/elements/**/*.css', './source/css/*.css', './source/helpers/*.css']
        , 'svg': './source/images/**/*.svg'
        , 'images': './source/images/**/*'
        , 'fonts': './source/fonts/**/*'
        , 'icofont': './source/svg-font/**/*.svg'
        , 'svgicon': './source/svg-sprite/**/*.svg'
        , 'svgicontmp': './source/svg-sprite-tmp/'
      }
      , 'build': {
        'html': './build/'
        , 'fonts': './build/fonts/'
        , 'js': './build/js/'
        , 'css': './build/css/'
        , 'images': './build/images/'
        , 'svg': './build/images/'
      }
    };

  gulp.task('svgstore', function () {
      return gulp.src(dirs.source.svgicon)
        .pipe(svgSprite({
          mode: "symbols",
          selector: "icon-%f",
          preview: false,
          svg: {
            symbols: 'icons.svg'
          }
        }))
        .pipe(replace({regex:'<style.*</style>', replace:''}))
        .pipe(gulp.dest(dirs.source.svgicontmp));
  });

gulp.task('iconfont', function(){
  return gulp.src(dirs.source.icofont)
    .pipe(plumber())
    .pipe(iconfont({
      fontName: 'icons',
      appendCodepoints: true,
      appendUnicode: true,
      normalize: true,
      centerHorizontally: true
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      })
    .pipe(gulp.dest(dirs.build.fonts));
});

gulp.task('list', function () {
  find.file(/\.html$/, dirs.build.html, function (files){
    var names = []
        , file;
    for(var i=0; i<files.length; i++){
      file = files[i];
      if(file.indexOf('index.html')>-1 || (file.match(/\//g) || []).length>1){
        continue;
      }
      names.push(path.basename(file))
    }
    gulp.src(dirs.source.list)
      .pipe(plumber())
      .pipe(jade({
        pretty: true
        , locals: {'pages': names}
        }))
      .pipe(gulp.dest(dirs.build.html));
  });
});

gulp.task('copy', function () {
  gulp.src(dirs.source.copy).pipe(gulp.dest(dirs.build.html));
});

gulp.task('fonts', function () {
  gulp.src(dirs.source.fonts).pipe(gulp.dest(dirs.build.fonts));
});

gulp.task('images', ['svg'], function () {
  return gulp.src(dirs.source.images)
    .pipe(plumber())
    // .pipe(gulpif(/[.](png|jpeg|jpg)$/, imagemin({
    //     progressive: true,
    //     svgoPlugins: [{removeViewBox: false}],
    //     optimizationLevel: 1,
    //     use: [pngquant()]
    //   })
    // ))
    .pipe(gulp.dest(dirs.build.images));
});

gulp.task('svg', function () {
  gulp.src(dirs.source.svg).pipe(gulp.dest(dirs.build.images));
});

gulp.task('html', ['svgstore'], function() {
  return gulp.src(dirs.source.page)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(dirs.build.html));
});

gulp.task('js', function() {
  return gulp.src(dirs.source.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
        "presets": ["es2015"]
    }))
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.build.js));
});

gulp.task('build', function () {
  console.log('deploying');
  return gulp.src('build/**')
    .pipe(plumber())
    .pipe(build({
      branch:     'gh-pages',
      cacheDir:   'gh-cache',
      remoteUrl:  'git@github.com:SilentImp/prodograd.git'
    }).on('error', function(){
      console.log('error', arguments);
    }));
});

gulp.task('css', function() {
  var processors = [
    imprt({
      from: process.cwd()+'/source/elements/layout/layout.css'
      , glob: true
      })
    , mixin
    , vars
    , nested
    , color
    , autoprefixer({
        browsers: ['last 2 version', 'IE 8', 'IE 9', 'IE 10', 'IE 11', 'Opera 12']
        })
    ];

  return gulp.src(dirs.source.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(order(['reset.css', 'fonts.css']))
    .pipe(postcss(processors))
    .pipe(concat("styles.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.build.css));
});

gulp.task('watch', function () {
  gulp.watch([dirs.source.csswatch], ['css']);
  gulp.watch(dirs.source.jade, ['html']);
  gulp.watch(dirs.source.js, ['js']);
});

gulp.task('default', ['copy', 'fonts', 'iconfont', 'html', 'css', 'js', 'images']);
