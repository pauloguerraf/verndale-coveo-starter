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

export const HomePage = story.build(homePage, {});
