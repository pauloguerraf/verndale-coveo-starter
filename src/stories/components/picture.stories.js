import button from '../../html/components/picture.hbs';

export default {
  title: 'Components/Picture',
  argTypes: {}
};

export const Picture = story.build(
  button,
  {
    srcset: {
      639: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=639&h=300',
      1023: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=1023&h=500'
    },
    src: 'https://verndale-image-tools.herokuapp.com/id/Bkci_8qcdvQ?w=1280&h=500',
    imageDescription: 'Image Description'
  },
  'padded'
);
