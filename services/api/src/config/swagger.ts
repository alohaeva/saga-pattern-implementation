import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Saga pattern implementation',
    description: 'REST API for saga pattern implementation',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = '../swagger_output.json';
const endpointsFiles = ['../api/v1/index.ts'];

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
