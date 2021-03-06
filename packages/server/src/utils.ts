import { Response } from 'express';

export function invalidCredentials(res: Response) {
  res.status(401).json({
    error: {
      message: 'Invalid credentials'
    }
  });
}

export const env = {
  get: (name: string): string => {
    const env = process.env[name];

    if (!env) {
      throw new Error(`Missing environment variable "${name}".`);
    }

    return env;
  },

  getDefault: (name: string, defaultValue: string = ''): string => {
    return process.env[name] || defaultValue;
  }
};

export const http = {
  ok: <T>(data: T, message?: string) => ({
    data,
    status: {
      ok: true,
      ...(message ? { message } : {})
    } as const
  }),

  err: <T>(message: string, code: string, data?: T) => ({
    ...(data ? { data } : {}),
    status: {
      ok: false,
      code,
      message
    } as const
  })
};
