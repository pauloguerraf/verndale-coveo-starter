import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir } = config;

function styleLint() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Running SCSS linter
--------------------------------------------------------------`)
  );

  return gulp
    .src([
      `./${dir.paths.srcStyles}/**/*.scss`,
      `!./${dir.paths.srcStyles}/core/*.scss`,
      `!./${dir.paths.srcStyles}/components/vendor/**/*.scss`,
      `!./${dir.paths.srcStyles}/modules/vendor/**/*.scss`,
      `!./${dir.paths.srcStyles}/core/vendor/**/*.scss`
    ])
    .pipe(
      gulpStylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    );
}

export default styleLint;
