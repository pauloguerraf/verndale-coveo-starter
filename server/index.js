const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
app.use(cors());

// API
const searchResults = require('./api/search-results');
const port = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Verndale Toolkit API',
      description: 'Verndale Toolkit API Information',
      servers: ['http://localhost:5000']
    }
  },
  apis: [__filename]
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

// REFERENCE https://editor.swagger.io/

/**
 * @openapi
 * /search-results:
 *  get:
 *    summary: Gets search results
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - name: query
 *      in: query
 *      description: Text entered in search field
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: OK
 */
app.get('/search-results', (req, res) => {
  res.status(200).jsonp(searchResults());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
