import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {Configuration, ConfigurationParameters} from './app/services/api';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: "http://localhost:9000",
    withCredentials: true,
    credentials: {
      apiKey: "pk_12bfbd5319d6deae9cb8ec3d27b9acc61349c2d79dc5a0f2fbf02106276e7794"
    }
  };
  return new Configuration(params);
}

bootstrapApplication(AppComponent, {
  providers: [
    {provide: Configuration, useFactory: apiConfigFactory},
    provideAnimations(),
    ...appConfig.providers
  ]
}).catch((err) => console.error(err));
