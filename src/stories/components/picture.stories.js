import picture from '../../html/components/picture.hbs';

export default {
  title: 'Components/Picture',
  argTypes: {
    srcset: {
      name: 'srcset',
      control: 'object',
      type: { required: true }
    },
    src: {
      name: 'src',
      control: 'text',
      type: { required: true }
    },
    width: {
      name: 'Width',
      control: 'text',
      type: { required: true }
    },
    height: {
      name: 'Height',
      control: 'text',
      type: { required: true }
    },
    description: {
      name: 'Alt tag',
      control: 'text',
      type: { required: true }
    }
  }
};

export const Picture = story.build(
  picture,
  {
    srcset: {
      639: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=639&h=300',
      1023: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=1023&h=500'
    },
    src: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=1280&h=500',
    width: '1280px',
    height: '500px',
    description: 'Image Description'
  },
  'padded'
);
