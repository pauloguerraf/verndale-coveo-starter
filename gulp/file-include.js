import gulp from 'gulp';
import notifier from 'node-notifier';
import merge from 'merge-stream';
import gulpFileInclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import { log, colors } from 'gulp-util';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;

function fileInclude() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
HTML file include
--------------------------------------------------------------`)
  );

  const outModules =
    NODE_ENV === 'production'
      ? `./${dir.paths.distModules}`
      : `./${dir.paths.devModules}`;
  const outPages =
    NODE_ENV === 'production'
      ? `./${dir.paths.distTemplates}`
      : `./${dir.paths.devTemplates}`;

  // Modules
  const modules = gulp
    .src(`./${dir.paths.srcModules}/**/*.html`)
    .pipe(
      gulpFileInclude({
        basepath: `./${dir.source}/html`
      })
    )
    .pipe(gulp.dest(outModules))
    .pipe(gulpIf(NODE_ENV !== 'production', browserSync.stream()));

  // Templates
  const templates = gulp
    .src(`./${dir.paths.srcTemplates}/**/*.html`)
    .pipe(
      gulpFileInclude({
        basepath: `./${dir.source}/html`
      }).on('error', error => {
        log(
          colors.green.red(`
--------------------------------------------------------------
  ${error.message}
--------------------------------------------------------------`)
        );
        notifier.notify({
          title: 'Include Error',
          message: error.message,
          sound: true,
          wait: true
        });
      })
    )
    .pipe(gulp.dest(outPages))
    .pipe(gulpIf(NODE_ENV !== 'production', browserSync.stream()));

  return merge(modules, templates);
}

export default fileInclude;
