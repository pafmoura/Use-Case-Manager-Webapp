import {
  ApplicationConfig,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { TokenInterceptor } from './helper/token.interceptor';
import { CustomReuseStrategy } from './app.strategies';

const tokenInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    tokenInterceptorProvider,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy,
    },
  ],
};
