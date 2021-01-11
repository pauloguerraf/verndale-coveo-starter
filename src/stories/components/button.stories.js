import button from '../../html/components/button.hbs';

export default {
  title: 'Components/Button',
  argTypes: {
    classes: {
      name: 'Classes',
      description: 'Variations that a button can have.',
      control: 'text'
    },
    title: {
      name: 'Title',
      description: 'Text that goes inside the button.',
      control: 'text',
      type: { required: true }
    }
  }
};

const Default = story.build(button, {
  title: 'Title'
}, 'padded');

const Variation = story.build(button, {
  ...Default.args,
  classes: 'class-name'
}, 'padded');

export { Default, Variation };
