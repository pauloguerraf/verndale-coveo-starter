export const build = (template, args, layout = 'fullscreen') => {
  const Template = (args => template(args)).bind({});

  Template.args = args;

  Template.parameters = {
    layout,
    docs: {
      source: {
        code: template(args)
          .replaceAll(/\uFEFF/gi, '')
          .replaceAll(/^\s*\n/gm, '')
          .replaceAll('&#x3D;', '=')
          .replaceAll('&amp;', '&')
          .replaceAll('&lt;', '<')
          .replaceAll('&gt;', '>')
      }
    },
    actions: { disable: true }
  };

  return Template;
};
