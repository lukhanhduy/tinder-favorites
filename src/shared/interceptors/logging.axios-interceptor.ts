import { HttpService, Injectable } from "@nestjs/common";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AxiosInterceptor,
  AxiosFulfilledInterceptor,
  AxiosRejectedInterceptor,
  AxiosResponseCustomConfig,
} from "@narando/nest-axios-interceptor";

// logging.axios-interceptor.ts
const LOGGING_CONFIG_KEY = Symbol("kLoggingAxiosInterceptor");

// Merging our custom properties with the base config
interface LoggingConfig extends AxiosRequestConfig {
  [LOGGING_CONFIG_KEY]: {
    id: number;
  };
}
@Injectable()
export class LoggingAxiosInterceptor extends AxiosInterceptor<LoggingConfig> {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  requestFulfilled(): AxiosFulfilledInterceptor<LoggingConfig> {
    return (config) => {
      const requestId = 1234;

      config[LOGGING_CONFIG_KEY] = {
        id: requestId,
      };
      // Log outgoing request
      console.log(`Request(ID=${requestId}): ${config.method} ${config['path']}`);

      return config;
    };
  }

  // requestRejected(): AxiosRejectedInterceptor {}

  responseFulfilled(): AxiosFulfilledInterceptor<
    AxiosResponseCustomConfig<LoggingConfig>
  > {
    return (response) => {
      const requestId = response.config[LOGGING_CONFIG_KEY].id;
      // Log response
      console.log(`Response(ID=${requestId}): ${response.status}`);

      return response;
    };
  }

  // responseRejected(): AxiosRejectedInterceptor {}
}