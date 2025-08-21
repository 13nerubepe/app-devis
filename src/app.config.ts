    import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
    import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
    import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
    import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';
    // import { ConfirmationService, MessageService } from "primeng/api";
    // import Aura from '@primeng/themes/aura';
    // import {providePrimeNG} from 'primeng/config';
    // import {appRoutes} from './app.routes';
    // import {definePreset} from '@primeng/themes';
    // import {ConfirmationService, MessageService} from 'primeng/api';
    // import { TokenService } from '@/services/token.service';
    // import { httpInterceptorFn } from '@/services/http-interceptor';
    // import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    // import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
    // import { provideLottieOptions } from 'ngx-lottie';

    // import player from 'lottie-web';
    // import { environment } from './environments/environment';
    // import {API_AUTHSERVER_URL, API_GATEWAY_URL} from '@probmis/utils';
    const MyPreset = definePreset(Aura, {
        semantic: {
            primary: {
                50: '{blue.50}',
                100: '{blue.100}',
                200: '{blue.200}',
                300: '{blue.300}',
                400: '{blue.400}',
                500: '{blue.500}',
                600: '{blue.600}',
                700: '{blue.700}',
                800: '{blue.800}',
                900: '{blue.900}',
                950: '{blue.950}'
            },
            overlay: {
                modal: {
                    borderRadius: '1.5rem'
                },
                popover: {
                    borderRadius: '10px'
                }
            },
            colorScheme: {
                light: {
                    surface: {
                        0: 'color-mix(in srgb, {primary.950}, white 100%)',
                        50: 'color-mix(in srgb, {primary.950}, white 95%)',
                        100: 'color-mix(in srgb, {primary.950}, white 90%)',
                        200: 'color-mix(in srgb, {primary.950}, white 80%)',
                        300: 'color-mix(in srgb, {primary.950}, white 70%)',
                        400: 'color-mix(in srgb, {primary.950}, white 60%)',
                        500: 'color-mix(in srgb, {primary.950}, white 50%)',
                        600: 'color-mix(in srgb, {primary.950}, white 40%)',
                        700: 'color-mix(in srgb, {primary.950}, white 30%)',
                        800: 'color-mix(in srgb, {primary.950}, white 20%)',
                        900: 'color-mix(in srgb, {primary.950}, white 10%)',
                        950: 'color-mix(in srgb, {primary.950}, white 5%)'
                    }
                },
                dark: {
                    surface: {
                        0: 'color-mix(in srgb, var(--surface-ground), white 100%)',
                        50: 'color-mix(in srgb, var(--surface-ground), white 95%)',
                        100: 'color-mix(in srgb, var(--surface-ground), white 90%)',
                        200: 'color-mix(in srgb, var(--surface-ground), white 80%)',
                        300: 'color-mix(in srgb, var(--surface-ground), white 70%)',
                        400: 'color-mix(in srgb, var(--surface-ground), white 60%)',
                        500: 'color-mix(in srgb, var(--surface-ground), white 50%)',
                        600: 'color-mix(in srgb, var(--surface-ground), white 40%)',
                        700: 'color-mix(in srgb, var(--surface-ground), white 30%)',
                        800: 'color-mix(in srgb, var(--surface-ground), white 20%)',
                        900: 'color-mix(in srgb, var(--surface-ground), white 10%)',
                        950: 'color-mix(in srgb, var(--surface-ground), white 5%)'
                    }
                }
            }
        }
    });

    export function HttpLoaderFactory(http: HttpClient) {
        return new TranslateHttpLoader(http, './i18n/', '.json');
    }

    export const appConfig: ApplicationConfig = {
        providers: [
            MessageService,
            ConfirmationService,
            provideRouter(
                appRoutes,
                withInMemoryScrolling({
                    anchorScrolling: 'enabled',
                    scrollPositionRestoration: 'top'
                }),
                withEnabledBlockingInitialNavigation(),
            ),
            // { provide: API_GATEWAY_URL, useValue: environment.API_GATEWAY_URL },
            // { provide: API_AUTHSERVER_URL, useValue: environment.API_AUTHSERVER_URL },
            provideLottieOptions({ player: () => player }),
            provideHttpClient(withFetch(), withInterceptors([httpInterceptorFn])),
            provideAnimationsAsync(),
            providePrimeNG({theme: {preset: MyPreset, options: {darkModeSelector: '.app-dark'}}}),
            {
                provide: APP_INITIALIZER,
                useFactory: (initService: TokenService) => () => initService.init(),
                deps: [TokenService],
                multi: true
            },
            importProvidersFrom(
                TranslateModule.forRoot({
                    defaultLanguage: 'fr',
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })
            )
        ]
    };
