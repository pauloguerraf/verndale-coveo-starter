const { nanoid } = require('nanoid');

const searchResults = () => ({
  Results: [
    {
      Label: 'Result 1',
      Id: nanoid(),
      Url: '#'
    },
    {
      Label: 'Result 2',
      Id: nanoid(),
      Url: '#'
    },
    {
      Label: 'Result 3',
      Id: nanoid(),
      Url: '#'
    }
  ]
});

module.exports = searchResults;
