const gulp = require('gulp')
const del = require('del')
const gulpSequence = require('gulp-sequence');
const git = require('gulp-git');
const shell = require('gulp-shell');

const conf = {
  buildSrcDir: './dist/**/*',
  outputDir: './dist-deploy',
  serverSrcDir: './src-deploy/**/*',
  remoteBranch: 'dokku',
  remoteUrl: 'dokku@benwinding.com:portal'
};

gulp.task('clean', function() {
  return del([conf.buildSrcDir, conf.outputDir, '.nuxt']);
});

gulp.task('build-app', shell.task('yarn generate', {
  env: { NODE_ENV: 'production' },
}));

gulp.task('copy-build', function() {
  return gulp.src(conf.buildSrcDir)
    .pipe(gulp.dest(conf.outputDir + '/public'));
});

gulp.task('copy-server', function() {
  return gulp.src(conf.serverSrcDir)
    .pipe(gulp.dest(conf.outputDir));
});

gulp.task('git-new', function() {
  return git.init({cwd: conf.outputDir}, function (err) {
    if (err) throw err;
  });
});

gulp.task('git-add', function() {
  return gulp.src(conf.outputDir)
    .pipe(git.add({cwd: conf.outputDir, args: '-f'}, function (err) {
      if (err) throw err;
    }));
});

gulp.task('git-addRemote', function() {
  return git.addRemote(conf.remoteBranch, conf.remoteUrl, {cwd: conf.outputDir}, function (err) {
    // if (err) throw err;
  })
});

gulp.task('git-commit', function() {
  return gulp.src(conf.outputDir)
    .pipe(git.commit('deployed', {cwd: conf.outputDir}));
});

gulp.task('git-push',
  shell.task(`cd ${conf.outputDir} && git push -f ${conf.remoteBranch} master`)
);

gulp.task('run-build', shell.task(`cd ${conf.outputDir} && yarn && yarn start`))

gulp.task('run-production', gulpSequence('build', 'run-build'));

gulp.task('build', gulpSequence('clean', 'build-app', 'copy-build', 'copy-server'));
gulp.task('deploy-build', gulpSequence('git-new', 'git-add', 'git-commit', 'git-addRemote', 'git-push'));

gulp.task('deploy', gulpSequence('build', 'deploy-build'));

