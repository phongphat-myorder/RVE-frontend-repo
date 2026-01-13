import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
// import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, 
  {
    providers: [
      provideHttpClient(),
      provideRouter([])
    ]
  }
)
  .catch((err) => console.error(err));
