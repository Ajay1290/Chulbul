---
last_updated: 16/01/2021
next: /advance-config
---
{% extends 'layouts/docs.html' %}



{% block content %}

# Basic Configuration
Configuration is important when you want to customize built-in effects of chulbul
or to add config for plugins or even you want some config for your own stuff to use it inside templates.


## What is Config ?
Config is a javascript object of fields with information which you want to pass to chulbul it consist of field and value
there are some built-in fields which you can pass to customize chulbul's action of behaviour.

## Example
A basic config object will look like below.

```javascript
const config = {
    name: "Chulbul",
    description: "The Static Site Genrator.",
    title: "Chulbul | The Static Site Genrator",
    env: 'development',
    minify: true,
}

const chulbul = Chulbul(__dirname, config)
```

## Default Configuration
It is not necessary to add always config to chulbul function there is a default built-in config object which is look like below.

```javascript
let defaultConfig = {
    name: "Static Site",
    description: "The Static Site for you.",
    title: "Title for your static site.",
    url: "githubUserName.github.com",
    baseUrl: '/projectName',
    env: 'development',
    dir: '.',
    minify: true,
    verbose: true,
    bundleUp: true,
    versoning: true,
    tempDir: './templates',
    docsDir: './templates/docs',
    staticDir: './templates/static',
    buildDir: './build',
    scripts: [],
    styles: [],
    versions: {
        'v0.0.1': p.resolve(__dirname, './templates/docs/v0.0.1')
    },
    errors: {
        on404: p.resolve(__dirname, './templates/404.html'),
    }
}
```

## Config Variable
Because our configuration object is globalized to nunjucks enviroment you can use always use 
config object inside your templates as a variable. This will be useful when you want
to add a litlle bit of dynamicness to a static page.

```html
<h1>Name of my site is {% raw %}{{ config.name }}{% endraw %} </h1>
```

{% endblock content %}