import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Approutes } from './app/app-route';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    // provideRouter(appRoutes),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    )
  ]
}).catch(err => console.error(err));


