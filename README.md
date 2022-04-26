# Front end toolkit

[![npm][npm-image]]()

> Front end toolkit used to package and compile projects at Verndale

![Verndale | verndale.com](src/static/images/logo-verndale.png 'Verndale')

## Getting Started

### Requirements

Download/install these tools/packages in order to run the toolkit locally.

- [Node][node-url] - `~14.x.x`
- [Yarn][yarn-url] - `~1.x.x`

### Install requirements

#### Install Node JS

Installing Node will also install the Node Package Manager ([npm][npm-url])

- Click [here][node-url] to grab the package
- Download the most current node which has the latest features
- Follow on screen instructions to complete installation

To make sure Node is installed properly, launch your terminal or command line and type:

```sh
node --version
```

#### Install Yarn

- Follow instructions [here][yarn-url]
- After installation, you should be able to run yarn on the command line

To make sure Yarn installed properly, launch your terminal or command line and type:

```sh
yarn --version
```

_You should see a version number such as this: `1.22.4`_

---

### Install dependencies

Once you have your requirements installed, navigate to the root of the toolkit in terminal or command line and run:

```sh
yarn
```

This will bring down all `dependencies` and `devDependencies` for the project that are defined in the `package.json` file so you can properly run a build and work on the project.

---

## Running the application

The toolkit uses [storybook](https://storybook.js.org/) to deliver all components (and modules) within an interactive UI. Developers should write one or multiple stories per component that describe all the states a component can support.

To start storybook run the following at the root of the project:

```sh
yarn start
```

---

## Scripts

When working in the development environment, you will use the `yarn start` task to view up-to-date changes while you work.

For individual tasks, the following can be used:

- Lint JavaScript files - `yarn js-lint`
- Lint Styles files - `yarn style-lint`
- Build - `yarn build`
- Build static version of storybook - `yarn build-storybook`

---

## Scaffolding

The toolkit provides tools that help to generate resource files faster with a predefined standard structure.

The following available tasks can be used:

- Scaffold a new page - `yarn create-page`
- Scaffold a new module - `yarn create-module`
- Scaffold a new javascript module - `yarn create-js`
- Scaffold a new react module - `yarn create-react`

---

## Production build

The compiled and minified assets can be created by running `yarn build`. This will put all compiled and minified
files in the `dist` folder.

---

## Source code

### Page templates

The page templates can be found under the following folder:

- HTML - `src/html/templates`

> **Note:** each page template contains a collection of individual modules.
> To view the source code for these modules see the "Module source code" section below.

### Module source code

The module source code can be found under the following:

- HTML - `src/html/modules`
- SCSS - `src/scss/modules`
- JS - `src/js/modules`

### Component source code

The component source code can be found under the following:

- HTML - `src/html/components`
- SCSS - `src/scss/components`
- JS - `src/js/components`

### Stories source code

The stories source code can be found under the following:

- Components - `src/stories/components`
- Modules - `src/stories/modules`
- Templates - `src/stories/templates`

[node-url]: https://nodejs.org/en/
[yarn-url]: https://classic.yarnpkg.com/en/docs/install/#mac-stable
[npm-url]: https://www.npmjs.com/
[verndale-logo]: src/images/logo-verndale.png?raw=true 'Verndale'
[npm-image]: https://img.shields.io/npm/v/npm.svg

### Static files

All static files, such as images or fonts, should be located under `src/static`. SVG files to be included in the svgstore spritesheet should be located under `src/static/svg-sprites`.
