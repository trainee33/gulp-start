const project_name = "dist";
const src_folder = "#src";

const path = {
	build: {
		html: project_name + "/",
		js: project_name + "/js/",
		css: project_name + "/css/",
		images: project_name + "/img/",
		fonts: project_name + "/fonts/",
    resources: project_name + '/resources/',
    spriteSvg: project_name + '../sprite/icons.svg'
    //json: project_name + '/json/'
	},
	src: {		
		html: [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
		js: src_folder + "/js/*.js",
		css: src_folder + "/scss/style.scss",
		images: [src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"],
    favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		fonts: src_folder + "/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    resources: src_folder + '/resources/**/*.*',
    spriteSvg: src_folder + '/iconsprite/*.svg'
    //json: src_folder + '/json/*.*'
	},
	watch: {
		html: src_folder + "/**/*.html",
		js: src_folder + "/**/*.js",
		css: src_folder + "/scss/**/*.scss",
		images: src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: src_folder + "/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    resources: src_folder + '/resources/**/*.*',
    //json: src_folder + '/json/*.*'
	},
	clean: "./" + project_name + "/"
};

import gulp from "gulp";
import browserSync from "browser-sync";

import fs from "fs";
import del from "del";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import mediaQueries from "gulp-group-css-media-queries";
import gulpSass from "gulp-sass";
import darcSass from "sass";
import babel from "gulp-babel";
import webpack from "webpack-stream";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";
import webpHtml from "gulp-webp-html";
import webpCss from "gulp-webp-css";
import svgSprite from 'gulp-svg-sprite';
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import gulpIf from "gulp-if";

const sass = gulpSass(darcSass);

const isProd = process.argv.includes("--production");
const isDev = !isProd;

const html = () => {
  return gulp.src(path.src.html)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'html',
        message: error.message
      }))
    }))
    .pipe(fileInclude())
    .pipe(htmlmin({
      collapseWhitespace: isProd
    }))
    .pipe(webpHtml())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
}

const css = () => {
  return gulp.src(path.src.css, { sourcemaps: isDev })  
    .pipe(sass())    
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'css',
        message: error.message
      }))
    }))
    .pipe(webpCss())
   	.pipe(mediaQueries())
 	  .pipe(autoprefixer())
		.pipe(gulp.dest(path.build.css, { sourcemaps: isDev }))
		.pipe(rename({ suffix: ".min"}))    
    .pipe(csso())
    .pipe(gulp.dest(path.build.css, { sourcemaps: isDev }))
    .pipe(browserSync.stream());
}

const js = () => {
  return gulp.src(path.src.js, { sourcemaps: isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'js',
        message: error.message
      }))
    }))
    .pipe(babel())
    .pipe(webpack({
      output: {
        filename: 'script.js',
     },
      mode: isProd ? "production" : "development"
    }))
    .pipe(gulp.dest(path.build.js, { sourcemaps: isDev }))
    .pipe(browserSync.stream());
}

const img = () => {
  return gulp.src(path.src.images)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'img',
        message: error.message
      }))
    }))
    .pipe(newer(path.build.images))
    .pipe(webp())
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.images))
    .pipe(newer(path.build.images))
    .pipe(gulpIf(isProd, imagemin({
      verbose: true
    })))
    .pipe(gulp.dest(path.build.images))
    .pipe(browserSync.stream());
}

const font = () => {
  return gulp.src(path.src.fonts)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'font',
        message: error.message
      }))
    }))
    .pipe(newer(path.build.fonts))
    .pipe(fonter({
      formats:['ttf', 'woff', 'eot', 'svg']
    }))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
}

const resources = () => {
  return gulp.src(path.src.resources)
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'resources',
      message: error.message
    }))
  }))
    .pipe(gulp.dest(path.build.resources))
}

const svgSprites = () => {
  return gulp.src(path.src.spriteSvg)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite/icons.svg',
          //example: true
        }
      },
    }
    ))
    .pipe(gulp.dest(path.build.images))
}

function fontsStyle(cb) {
	let file_content = fs.readFileSync(src_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}
function cb() { }


//удаление директории
const clear = () => {
  return del(path.clean);
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: "./" + project_name + "/"
    }
  });
}
//наблюдение
const watcher = () => {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, img);
  gulp.watch(path.watch.fonts, font);
  gulp.watch(path.watch.resources, resources);
}

//задачи
export { html };
export {css};
export {js};
export {img};
export {font};
export {resources};
export {svgSprites};
export {fontsStyle};
export {watcher};
export {clear};

const dev = gulp.series(
  clear,  
  gulp.parallel(html, css, js, img, font, resources, svgSprites),
  gulp.parallel(watcher, server)  
);

const build = gulp.series(
  clear,  
  gulp.parallel(html, css, js, img, font, svgSprites)
);

export default  isProd ? build : dev