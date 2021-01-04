# Chulbul

The Minimalistic Static Site Generator which is simple, fast and easy to use which is intended to be used for creating docs for your projects

## Features
- Uses `HTML`, `CSS`, `JS` to build static sites
- Uses `nunjucks` as templating engine
- Minifies all static files which are suitable for production use.

## No Worries on
- Url Routing (it does automatically by your folder structure)
- Boilerplate code (nunjucks helps in it)
- External JS libs usage

## Installation
You can install it using npm ot yarn as below.

via npm:
```shell
npm install chulbul
```

via yarn:
```shell
yarn add swarup
```

## Quick Start
Run this file and it will start you development server
```js
const path = require('path');
const Chulbul = require('chulbul');

config = {
    name: "My Site",
    description: "The Static Docs for My Site.",
    env: 'development',
    verbose:true,
    tempDir  : path.resolve(__dirname, './templates'),
    docsDir  : path.resolve(__dirname, './templates/docs'),
    staticDir: path.resolve(__dirname, './static'),
    buildDir : path.resolve(__dirname, './build')
}

new Chulbul(config)
```
It create a folder structure for you which you can use like below.
```
|build
    | ... (all genrated optimized static files) ...
|static
    |main.css
    |power.js
|templates
    |layout.html
    |components
        |navbar.html
        |footer.html
    |docs
        |index.html
        |about.html
        |blogs
            |index.html
            |myblog.html
```
`Url Routing` happends automatically via looking at structure of your docs directory which you can better understand by example given below.
```
docs\index.html         -> '\'
docs\about.html         -> '\about'
docs\blogs\index.html   -> '\blogs'
docs\blogs\myblog.html  -> '\blogs\myblog'
```

## .idea
- Need version control for docs
- in-built highlight code block

## Also
Why was Chulbul named this way? What's the meaning behind it?
>   Chulbul is a hindi word which means mischevious,
>   who causes trouble in a playful way. Similarly
>   Chulbul solve problems in a playful way.


## Links
Website: https://ajay1290.github.io/Chulbul \
Documentation: https://ajay1290.github.io/Chulbu\documentation \
Code: https://github.com/Ajay1290/Chulbul \
Issue tracker: https://github.com/Ajay1290/Chulbul/issues


## Contributing
For guidance on setting up a development environment and how to make a contribution to Chulbul, see the contributing guidelines.

## License
© Ajay Patil 2020-present. Code released under the [MIT license](LICENSE).