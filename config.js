module.exports = {
  // Public path
  publicPath: '',

  // Directory names
  get dir() {
    return {
      source: 'src',
      production: 'dist',
      static: `static/${this.publicPath}`,

      assets: {
        html: 'html',
        javascript: 'js',
        scss: 'scss',
        svgSprites: 'svg-sprites',
        stories: 'stories',
        htmlTemplates: 'templates',
        htmlModules: 'modules',
        htmlComonents: 'components'
      },

      // Asset paths
      get paths() {
        return {
          // source
          srcStatic: `${this.source}/${this.static}`,
          srcJS: `${this.source}/${this.assets.javascript}`,
          srcStyles: `${this.source}/${this.assets.scss}`,
          srcHtml: `${this.source}/${this.assets.html}`,
          srcSvgSprites: `${this.source}/${this.static}/${this.assets.svgSprites}`,
          srcStories: `${this.source}/${this.assets.stories}`,

          // scaffold
          srcComponents: `${this.source}/${this.assets.html}/${this.assets.htmlComonents}`,
          srcModules: `${this.source}/${this.assets.html}/${this.assets.htmlModules}`,
          srcTemplates: `${this.source}/${this.assets.html}/${this.assets.htmlTemplates}`,
          storyTemplates: `${this.stories}/${this.assets.htmlTemplates}`,
          storyModules: `${this.stories}/${this.assets.htmlModules}`
        };
      }
    };
  }
};
