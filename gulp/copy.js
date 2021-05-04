import gulp from 'gulp';
import mergeStream from 'merge-stream';
import filelog from 'gulp-filelog';
import { log, colors } from 'gulp-util';
import config from '../config';

const { NODE_ENV } = process.env;
const { dir } = config;

function copy() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Copying global files
--------------------------------------------------------------`)
  );

  const outFonts =
    NODE_ENV === 'production'
      ? `./${dir.paths.distFonts}`
      : `./${dir.paths.devFonts}`;

  let fonts, images;

  //fonts
  fonts = gulp
    .src(`./${dir.paths.srcFonts}/**/*.*`)
    .pipe(gulp.dest(outFonts))
    .pipe(filelog('copy:fonts'));

  //images
  if (NODE_ENV !== 'production') {
    images = gulp
      .src([
        `./${dir.paths.srcImages}/**/*.*`,
        `!./${dir.paths.srcImages}/svg-sprites/**/*.svg`
      ])
      .pipe(gulp.dest(`./${dir.paths.devImages}/`))
      .pipe(filelog('copy:images'));
  } else {
    images = gulp
      .src([`./${dir.paths.srcImages}/svgsheet.svg`])
      .pipe(gulp.dest(`./${dir.paths.distImages}/`))
      .pipe(filelog('copy:svgsheet.svg'));
  }

  return mergeStream(fonts, images);
}

export default copy;
