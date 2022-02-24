import { publicPath } from '../../config';

export const build = (template, args, layout = 'fullscreen') => {
  const Template = (args => template({ ...args, publicPath })).bind({});

  Template.args = args;

  Template.parameters = {
    layout,
    docs: {
      source: {
        code: template({ ...args, showCss: true, publicPath })
          .replace(/\uFEFF/gi, '')
          .replace(/^\s*\n/gm, '')
          .replace(/&#x3D;/g, '=')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
      }
    },
    actions: { disable: true }
  };

  return Template;
};
