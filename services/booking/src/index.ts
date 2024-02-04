import { Server } from './server';
import { appConfig } from './config/Config';
import { logger } from './logger';

const port = appConfig.get('server.port');

const server = new Server();

server.start(port!).then(() => {
  logger.info(`Server is running at http://localhost:${port}`);
});
