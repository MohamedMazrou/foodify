import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { bootstrapApplication } from '@angular/platform-browser';

// ضيف أي icons انت محتاجها



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideClientHydration(),
      provideAnimations(),
      provideToastr(),
    
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
      defaultLanguage: 'en',
    }),
    
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),


    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    
    ]
};
