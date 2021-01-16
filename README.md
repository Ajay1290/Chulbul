# Chulbul 

Chulbul is the Minimalistic Static Site Generator which is simple, fast and easy to use which is intended to be used for creating documentations.

[![](https://img.shields.io/github/license/Ajay1290/Chulbul)](LICENCE)

## Why Chulbul ?
It uses `HTML`, `CSS`, `JS` and `Markdown` to write code for the docs which means it is highly customizable.

## What about boilerplate code ?
To deal with boilerplate code chulbul uses nunjucks as a templating engine so that you can inherit your layout to each html or md file to reduce boilerplate code. Also you can get benifit of A rich and powerful templating features of it.

## Features
- Uses HTML, CSS, JS and Markdown to build static sites
- Minifies all static files which are suitable for production use.
- Auto Url Routing (it does automatically by your folder structure)
- Boilerplate code (nunjucks helps in it)
- Easy to extend features via plugins

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
const Chulbul = require('Chulbul');

const config = {
    name: "My Site",
    description: "My static site is Awesome.",
    title: "My Site | The Awesome site of 2021",
    env: 'development',
    minify: true,
    verbose: true,
}

Chulbul(__dirname, config)
    .listen(5000)
```
It create a folder structure for you which you can use like below.\
( To know more look [patl.json](docs/patl.json) )
```
|build
    | ... (all genrated optimized static files) ...
|static
    |main.css
    |power.js
|templates
    |layouts
        |base.html
        |docs.html
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
© Ajay Patil 2021-present. Code released under the [MIT license](LICENSE).