// add these to package.json
// "gulp": "^4.0.2",
// "gulp-clean": "^0.4.0",
// "gulp-concat": "^2.6.1",
// "gulp-rev": "^9.0.0",
// "gulp-rev-all": "^3.0.0",
// "gulp-sourcemaps": "^3.0.0",
// "gulp-terser": "^2.0.1",

// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const sourcemaps = require('gulp-sourcemaps');
// const terser = require('gulp-terser');
// const rev = require('gulp-rev');

// const clean = require('gulp-clean');
// gulp.task('clean_vendors', function() {
//   return gulp.src(['public/javascripts/vendors_generic*',
//     'public/javascripts/rev-manifest.json'], {read: false})
//       .pipe(clean());
// });

// // Update important front end libraries
// // Run update_packages after npm update #{...packages}
// // Run Gulp compress_vendors after
// // Run UI tests after
// gulp.task('update_packages', async function() {
//   const jsFiles = [
//     'pell/dist/pell.min.js',
//     '@yaireo/tagify/dist/tagify.min.js',
//   ].map((a) => 'node_modules/' + a);

//   gulp.src(jsFiles)
//       .pipe(gulp.dest('vendors'));

//   const cssFiles = [
//     'pell/dist/pell.min.css',
//     '@yaireo/tagify/dist/tagify.css',
//   ].map((a) => 'node_modules/' + a);

//   gulp.src(cssFiles)
//       .pipe(gulp.dest('public/stylesheets/'));
// });

// gulp.task('compress_vendors', async function() {
//   gulp.src(['vendors/pell.min.js',
//     'vendors/tagify.min.js',
//     'vendors/toasty.min.js',
//     'vendors/holmes.js',
//     'vendors/microlight.js',
//     'vendors/dz.js',
//     'vendors/auto-complete.min.js',
//     'vendors/jsi18n.js',
//     'vendors/avatar.js',
//     'vendors/FontPicker.js',
//     'vendors/stretchy.min.js',
//     'vendors/svg-injector.min.js'])
//       .pipe(sourcemaps.init())
//       .pipe(concat({path: 'vendors_generic.js', cwd: ''}))
//       .pipe(terser())
//       .pipe(rev())
//       .pipe(sourcemaps.write('.'))
//       .pipe(gulp.dest('public/javascripts/'))
//       .pipe(rev.manifest())
//       .pipe(gulp.dest('public/javascripts/'));
// });
