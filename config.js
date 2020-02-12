export default {
  //Development server and proxy
  server: {
    proxy: {
      url: '',
      route: ''
    },
    publicPath: 'js'
  },

  //Directory names
  dir: {
    source: 'src',
    development: 'dev',
    production: 'dist',
    documentation: 'docs',
    html: 'html',
    assets: {
      javascript: 'js',
      css: 'css',
      scss: 'scss',
      images: 'images',
      fonts: 'fonts',
      htmlTemplates: 'templates',
      htmlModules: 'modules'
    },

    //Asset paths
    get paths(){
      return {
        //js
        srcJS: `${this.source}/${this.assets.javascript}`,
        //fonts
        srcFonts: `${this.source}/${this.assets.fonts}`,
        devFonts: `${this.development}/${this.assets.fonts}`,
        distFonts: `${this.production}/${this.assets.fonts}`,
        //images
        srcImages: `${this.source}/${this.assets.images}`,
        devImages: `${this.development}/${this.assets.images}`,
        distImages: `${this.production}/${this.assets.images}`,
        //styles
        srcStyles: `${this.source}/${this.assets.scss}`,
        devStyles: `${this.development}/${this.assets.css}`,
        distStyles: `${this.production}/${this.assets.css}`,
        //templates
        srcTemplates: `${this.source}/${this.html}/${this.assets.htmlTemplates}`,
        devTemplates: `${this.development}/${this.html}/${this.assets.htmlTemplates}`,
        distTemplates: `${this.production}/${this.html}/${this.assets.htmlTemplates}`,
        //modules
        srcModules: `${this.source}/${this.html}/${this.assets.htmlModules}`,
        devModules: `${this.development}/${this.html}/${this.assets.htmlModules}`,
        distModules: `${this.production}/${this.html}/${this.assets.htmlModules}`
      }
    }
  }
};
