import { Path, PathValue } from '../types';

import config from './vars';

class AppConfig {
  get<T = typeof config, P extends Path<T> = any, R = PathValue<T, P>>(key: P): R | undefined {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return keys.reduce((acc, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return acc[b];
    }, config);
  }
}

export const appConfig = new AppConfig();
