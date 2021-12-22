## Quick Start

  Install dependencies:

```bash
$ npm install
```

  Create the database

```bash
$ node_modules/.bin/sequelize db:create --env development
$ node_modules/.bin/sequelize db:migrate --env development
```

  Start the server:

```bash
$ npm start
```

  View the website at: http://localhost:3000

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```