const chokidar = require('chokidar');
const { resolve } = require('path');
const fs = require('fs');

// Defaults
const defaults = {
  paths: ['src/scss/components/**/*.scss', 'src/scss/modules/**/*.scss'],
  entry: 'src/scss/styles.scss'
};

class StylesWatchPlugin {
  constructor(options = {}) {
    this.options = { ...defaults, ...options };
    this.fileDependencies = [];
    this.firstRun = true;
  }

  handleAddedFile(path) {
    if (
      !this.fileDependencies.find(fd => fd === resolve(path)) &&
      !this.firstRun
    ) {
      fs.readFile(this.options.entry, 'utf8', (err, data) => {
        if (err) throw err;
        fs.writeFile(this.options.entry, data, function (err) {
          if (err) throw err;
        });
      });
    }
  }

  apply(compiler) {
    const { paths } = this.options;
    const watcher = chokidar.watch(paths, {
      persistent: true
    });

    compiler.hooks.initialize.tap('StylesWatchPlugin', () => {
      watcher.on('add', this.handleAddedFile.bind(this));
    });

    compiler.hooks.thisCompilation.tap('StylesWatchPlugin', compilation => {
      const { fileDependencies } = compilation;
      this.fileDependencies = [...fileDependencies];
    });

    compiler.hooks.done.tap('StylesWatchPlugin', () => {
      this.firstRun = false;
    });
  }
}

module.exports = StylesWatchPlugin;
