const ghpages = require('gh-pages')
const gulp = require('gulp')
const del = require('del')
const gulpSequence = require('gulp-sequence');
const git = require('gulp-git');
const shell = require('gulp-shell');

const conf = {
  distDir: './dist',
  srcDir: './src-deploy/**/*',
  remoteBranch: 'dokku',
  remoteUrl: 'dokku@benwinding.com:vue'
};

gulp.task('clean', function() {
  return del(conf.distDir);
});

gulp.task('build', shell.task('vue-cli-service build', {
  env: { NODE_ENV: 'dev' },
}));

gulp.task('git-new', function() {
  return git.init({cwd: conf.distDir}, function (err) {
    if (err) throw err;
  });
});

gulp.task('git-add', function() {
  return gulp.src(conf.distDir)
    .pipe(git.add({cwd: conf.distDir}, function (err) {
      if (err) throw err;
    }));
});

gulp.task('git-addRemote', function() {
  return git.addRemote(conf.remoteBranch, conf.remoteUrl, {cwd: conf.distDir}, function (err) {
    // if (err) throw err;
  })
});

gulp.task('git-commit', function() {
  return gulp.src(conf.distDir)
    .pipe(git.commit('deployed', {cwd: conf.distDir}));
});

gulp.task('git-push', 
  shell.task(`cd ${conf.distDir} && git push -f ${conf.remoteBranch} master`)
);

gulp.task('copy-server', function() {
  return gulp.src(conf.srcDir)
    .pipe(gulp.dest(conf.distDir));
});

const deployTasks = [
  'clean',
  'build',
  'copy-server',
  'git-new',
  'git-addRemote',
  'git-add',
  'git-commit',
  'git-push'
];

gulp.task('deploy', gulpSequence(...deployTasks));
gulp.task('default', gulpSequence(...deployTasks));
