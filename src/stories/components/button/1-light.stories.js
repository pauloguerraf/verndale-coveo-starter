import button from '../../../html/components/button.hbs';

export default {
  title: 'Components/Button/On Light',
  argTypes: {
    label: {
      name: 'Label',
      description: 'Text that goes inside the button.',
      control: 'text',
      type: { required: true }
    },
    type: {
      name: 'Type',
      description:
        'Indicates if the component is of type button, submit or link.',
      defaultValue: 'button',
      control: 'radio',
      options: ['button', 'submit', 'link'],
      type: { required: true }
    },
    className: {
      name: 'Class name',
      description: 'Indicates the styles of the button.',
      defaultValue: 'primary',
      control: 'radio',
      options: ['primary', 'secondary'],
      type: { required: true }
    },
    style: {
      name: 'Style',
      description: 'Indicates the styles of the button.',
      defaultValue: 'solid',
      type: 'radio',
      options: ['solid', 'outline']
    },
    size: {
      name: 'Size',
      description: 'Indicates if the size is large or small.',
      defaultValue: 'large',
      control: 'radio',
      options: ['large', 'small']
    },
    icon: {
      name: 'Icon',
      description: 'Indicates if the button displays an icon.',
      control: 'object'
    },
    disabled: {
      name: 'Disabled',
      description: 'Indicates if the button is disabled.',
      defaultValue: false,
      control: 'boolean'
    }
  }
};

export const Default = story.build(
  button,
  {
    label: 'Buy Now',
    type: 'button',
    className: 'primary'
  },
  'padded'
);

export const Submit = story.build(
  button,
  {
    ...Default.args,
    type: 'submit'
  },
  'padded'
);

export const Link = story.build(
  button,
  {
    ...Default.args,
    type: 'link'
  },
  'padded'
);

export const Outline = story.build(
  button,
  {
    ...Default.args,
    style: 'outline'
  },
  'padded'
);

export const WithIcon = story.build(
  button,
  {
    ...Default.args,
    icon: {
      name: 'file-pdf',
      viewBox: '0 0 30 30'
    }
  },
  'padded'
);

export const Small = story.build(
  button,
  {
    ...Default.args,
    size: 'small'
  },
  'padded'
);

export const Disabled = story.build(
  button,
  {
    ...Default.args,
    disabled: true
  },
  'padded'
);

const DisabledLink = story.build(
  button,
  {
    ...Disabled.args,
    type: 'link'
  },
  'padded'
);
DisabledLink.storyName = 'Disabled (Link)';

export { DisabledLink };
