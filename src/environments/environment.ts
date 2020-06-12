// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: 'http://localhost:4200',

  AUTH_CONFIG: {
    CLIENT_ID: 'n4UHo3S18ZKcfRnm6m0pCbHOUvFyvJL3',
    CLIENT_DOMAIN: 'dev-znlmob-u.auth0.com',
    AUDIENCE: 'https://dev-znlmob-u.auth0.com/api/v2/',
    REDIRECT: 'http://localhost:4200/callback',
    SCOPE: 'openid profile email'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
