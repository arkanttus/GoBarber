import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import routes from './routes';

const FileStore = require('session-file-store')(session);

class App {
  constructor() {
    this.server = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(flash());
    this.server.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions'),
        }),
        saveUninitialized: true,
      }),
    );
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.server,
      autoescape: true,
    });

    this.server.use(express.static(path.resolve(__dirname, 'public')));
    this.server.set('view engine', 'njk');
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
