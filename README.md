# guestbook

This is a browser only app backed by Dropbox for storage. It uses _localStorage_ of the browser and a folder in your Dropbox to store the files. To access the dropbox, create an app in the dropbox developer portal (I named it `miaucl-guestbook`) and grant it content read/write permissions. Then you can generate an `Access Token` and use that to set up the guestbook in the browser of your liking. The token is not shared with anyone and remains in the local storage of the browser on your device.

This is developed for tablets, so people can take a photo (or more) and write something above before posting the page. But it can also be used on any other device with a camera.

At the beginning, a PIN has to be set, so the users cannot access the settings by accident.

The built app is served on <http://guestbook.miaucl.com>, but the access key for the dropbox has to be generated manually by each admin user.

## How to generate an access token for Dropbox

- <https://dropbox.tech/developers/generate-an-access-token-for-your-own-account>
- <https://developers.dropbox.com/de-de/oauth-guide>

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
