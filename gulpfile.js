var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var include = require("gulp-include");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var PrettyError = require("pretty-error");
var watch = require("gulp-watch");
var coffee = require("gulp-coffee");
var replace = require("gulp-replace");
var exec = require("child_process").exec;
var prefixer = require("gulp-autoprefixer");

var srcPath = "./src";
var dstPath = "./www";

var errorRenderer = null;
var errorNotifier = null;

function _error(cb) {
  if (errorRenderer == null) {
    errorNotifier = notify.onError("Runtime error! See terminal log for details.");
    errorRenderer = new PrettyError();
    errorRenderer.skipNodeFiles();
  }
  return function(error) {
    var text = errorRenderer.render(error);
    errorNotifier(error);
    console.log(text);
    if (cb != null) cb();
  }
}

function _src(file, cb) {
  var path = srcPath + "/" + file;
  var s1 = gulp.src(path);
  var s2 = plumber({errorHandler: _error(cb)});
  s1.pipe(s2);
  return s2;
}

function _dst(file, cb) {
  var path = dstPath + "/" + file;
  var s1 = rename(file);
  var s2 = gulp.dest(dstPath);
  var s3 = browser.reload({stream: true});
  s1.pipe(s2);
  s2.on("end", cb);
  s2.pipe(s3);
  return s1;
}

function _watch(glob, task) {
  var files = srcPath + "/" + glob;
  watch(files, function() { gulp.start(task); });
}

function _templates() {
  var p1 = /<!--\s+template\s+(\w+)\s+-->/gi;
  var p2 = /<!--\s+endtemplate\s+-->/gi;
  var s1 = replace(p1, "<script type='text/template' id='$1'>");
  var s2 = replace(p2, "</script>");
  s1.pipe(s2);
  return s1;
}

function _bem() {
  var p1 = /\sclass\s*=\s*['"][^'"]+['"]/gi;
  var p2 = /^\sclass\s*=\s*['"]/gi;
  var p3 = /["']$/g;
  return replace(p1, function(text) {
    var content = text.replace(p2, "").replace(p3, "");
    var list = content.split(" ");
    var result = [];
    for (var i = 0; i < list.length; i += 1) {
      if (!list[i]) continue;
      var values = list[i].split("--");
      result.push(values[0]);
      for (var j = 1; j < values.length; j += 1) {
        var value = values[0] + "--" + values[j];
        result.push(value);
      }
    }
    return ' class="' + result.join(" ") + '"';
  });
}

function _exec(command) {
  var current = exec(command, {}, function(error, stdout, stderr) {
    if (error != null) throw error;
    console.log(stdout);
    console.log(stderr);
  });
  current.stderr.pipe(process.stderr);
  current.stdout.pipe(process.stdout);
  current.stdin.pipe(process.stdin);
}

function _prefixer() {
  return prefixer();
}

process.on("uncaughtException", _error());

gulp.task("build:css", function(cb) {
  _src("./main.sass", cb)
    .pipe(sass())
    .pipe(include())
    .pipe(_prefixer())
    .pipe(_dst("styles.css", cb));
});

gulp.task("build:js", function(cb) {
  _src("./main.js", cb)
    // .pipe(include())
    // .pipe(coffee({bare: true}))
    .pipe(include())
    .pipe(_dst("scripts.js", cb));
});

gulp.task("build:html", function(cb) {
  _src("./main.html")
    .pipe(include())
    .pipe(_bem())
    .pipe(_templates())
    .pipe(_dst("index.html", cb));
});

gulp.task("build", ["build:css", "build:js", "build:html"]);

gulp.task("serve", function() {
  _watch("./**/*.html", "build:html");
  _watch("./**/*.js", "build:js");
  _watch("./**/*.sass", "build:css");
  browser({
    server: {baseDir: dstPath}
  });
});

gulp.task("default", ["build", "serve"]);