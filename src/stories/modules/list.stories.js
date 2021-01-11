import list from '../../html/modules/list.hbs';

export default {
  title: 'Modules/List',
  argTypes: {
    items: {
      name: 'Items',
      description: 'Items that conform the list.',
      control: 'text'
    },
  }
};

const Default = story.build(list, {
  items: ['Item 1', 'Item 2', 'Item 3']
});

export { Default };
