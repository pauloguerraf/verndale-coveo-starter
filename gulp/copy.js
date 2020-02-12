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

  if (NODE_ENV !== 'production') {
    //images
    images = gulp
      .src([
        `./${dir.paths.srcImages}/**/*.*`,
        `!./${dir.paths.srcImages}/svg-sprites/**/*.svg`
      ])
      .pipe(gulp.dest(`./${dir.paths.devImages}/`))
      .pipe(filelog('copy:images'));

    return mergeStream(fonts, images);
  }

  images = gulp
    .src([`./${dir.paths.srcImages}/svgsheet.svg`])
    .pipe(gulp.dest(`./${dir.paths.distImages}/`))
    .pipe(filelog('copy:svgsheet.svg'));

  return mergeStream(fonts, images);
}

function copyPreviewServer(){
  log(
    colors.green.bold(`
--------------------------------------------------------------
Copying files for preview server
--------------------------------------------------------------`)
  );

  const files = gulp
    .src([
      `./${dir.production}/**/*.*`,
      `!./${dir.production}/html/**/*.html`,
      `!./${dir.production}/css/**/*.css`
    ])
    .pipe(gulp.dest(`./tools/server/`))
    .pipe(filelog('copy:files'));

  const html = gulp.src('./dist/html/**/*.html')
    .pipe(gulp.dest('./tools/server/html/'))
    .pipe(filelog('copy:html'));

  const css = gulp.src('./dist/css/*.css')
    .pipe(gulp.dest('./tools/server/css/'))
    .pipe(filelog('copy:css'));

  return mergeStream(files, html, css);
}

export {
  copy,
  copyPreviewServer
};
