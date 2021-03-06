#! /usr/bin/env node

const Fontmin = require('fontmin');
const fs = require('fs');
const glob = require("glob");

var [fontRegular, fontBold] = process.argv.slice(2);

fileSources = [
    "config.toml",
    "content/**/*.md",
    "content/**/*.html",
    "layouts/**/*.html",
    "i18n/*.toml",
    "assets/css/*",
    "assets/css/vendor/*",
    "assets/js/**/*.js",
]

var files = [];
for (p of fileSources) {
  files.push(...glob.sync(p));
}

var content;
for (f of files) {
  if (!fs.lstatSync(f).isFile()) {
    continue;
  }
  content += fs.readFileSync(f, 'utf8');
}

var fontmin = new Fontmin()
  .src([fontRegular, fontBold])
  .dest('assets/fonts')
  .use(Fontmin.glyph({text: content}))
  .use(Fontmin.ttf2woff2());

fontmin.run(function (err) {
    if (err) {
        throw err;
    }
});
