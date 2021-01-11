import link from '../../html/components/link.hbs';

export default {
  title: 'Components/Link',
  argTypes: {
    classes: {
      name: 'Classes',
      description: 'Variations that a link can have.',
      control: 'text'
    },
    title: {
      name: 'Title',
      description: 'Text that goes inside the link.',
      control: 'text',
      type: { required: true }
    },
    link: {
      name: 'Link URL',
      description: 'Specifies the URL of the page the link goes to.',
      control: 'text',
      type: { required: true }
    },
    target: {
      name: 'Link URL',
      description: 'Specifies where to open the linked document.',
      control: {
        type: 'select',
        options: [
          '_blank',
          '_parent',
          '_self',
          '_top'
        ],
      },
    }
  }
};

const Default = story.build(link, {
  title: 'Title',
  link: 'https://verndale.com'
}, 'padded');

const Variation = story.build(link, {
  ...Default.args,
  classes: 'class-name'
}, 'padded');

const External = story.build(link, {
  ...Default.args,
  target: '_blank'
}, 'padded');

export { Default, Variation, External };
