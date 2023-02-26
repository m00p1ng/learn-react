import './env';
import express from 'express';
import cookieSession from 'cookie-session';
import routes from './src/routes';
import cors from 'cors'

const initServer = async () => {
  const app = express();

  app.use(cors())
  app.use(express.json());
  app.use(
    cookieSession({
      name: 'session',
      keys: [process.env!.COOKIE_SECRET!],
      httpOnly: true,
      sameSite: 'strict',
    })
  );
  app.use((req, _res, next) => {
    console.log(req.method.toUpperCase(), '-', req.url);
    next();
  });
  app.use(routes);

  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

initServer();
