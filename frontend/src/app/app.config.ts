import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { GlobalErrorHandler } from './core/handler/global-error-handler';
import { httpErrorsInterceptor } from './core/interceptors/http-errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideIonicAngular({}),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, httpErrorsInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
