import { AxiosRequestConfig } from 'axios';

export const setHeader = (
  config: AxiosRequestConfig,
  key: string,
  value?: string
): void => {
  if (!value) return;
  config.headers = config.headers ?? {};
  (config.headers as Record<string, string>)[key] = value;
};
