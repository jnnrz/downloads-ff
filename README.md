# Downloads for Firefox
Download history in a little box

<br />

**Getting Started**

Run the following commands to install dependencies and start developing

```
npm install
npm run dev
```

**Scripts**

-   `npm run dev` - run `webpack` in `watch` mode
-   `npm run build` - builds the production-ready unpacked extension
-   `npm run test -u` - runs Jest + updates test snapshots
-   `npm run lint` - runs EsLint
-   `npm run prettify` - runs Prettier


<details>
  <summary>Loading the extension in Mozilla Firefox</summary>

In [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), open up the [about:debugging](about:debugging) page in a new tab. Click the `Load Temporary Add-on...` button and select the `manfiest.json` from the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Mozilla Firefox](https://i.imgur.com/gO2Lrb5.png "Installed Extension in Mozilla Firefox")

</details>

**Notes**

-   Includes ESLint configured to work with TypeScript and Prettier.

-   Includes tests with Jest - note that the `babel.config.js` and associated dependencies are only necessary for Jest to work with TypeScript.

-   Recommended to use `Visual Studio Code` with the `Format on Save` setting turned on.

-   Example icons courtesy of [FontAwesome](https://fontawesome.com).

-   Includes Storybook configured to work with React + TypeScript. Note that it maintains its own `webpack.config.js` and `tsconfig.json` files.


**Built with**

-   [React](https://reactjs.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Webpack](https://webpack.js.org/)
-   [SCSS](https://sass-lang.com/)
-   [webextension-polyfill-ts](https://github.com/Lusito/webextension-polyfill-ts)

**Misc. References**

-   [Chrome Extension Developer Guide](https://developer.chrome.com/extensions/devguide)
-   [Firefox Extension Developer Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
-   [Eslint + Prettier + Typescript Guide](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)


Icons by [Icons8](https://icons8.com)
