import homePage from '../../html/templates/home-page.hbs';

export default {
  title: 'Templates/Home Page',
  argTypes: {
    accordion: {
      name: 'Accordion Module',
      control: 'object'
    }
  }
};

export const HomePage = story.build(homePage, {
  accordion: {
    title: 'Accordion Heading',
    description:
      'Praesent dui elit, porttitor sed vulputate id, mollis sed nibh. Morbi molestie scelerisque diam, at efficitur erat auctor vitae. Proin vehicula volutpat consequat. Donec sit amet magna sed urna egestas feugiat in et nisi. Suspendisse risus dolor, maximus sit amet pharetra sed, convallis sed orci. Nulla sit amet nisi cursus, blandit ipsum vel, feugiat nisl.',
    items: [
      {
        title: 'Accordion Tab Title',
        heading: 'Accordion Tab Heading',
        copy: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.'
      },
      {
        title: 'Accordion Tab With Image',
        heading: 'Accordion Tab Heading',
        copy: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.<br><img src="/images/image.jpeg" alt="Image Description" />'
      }
    ]
  }
});
