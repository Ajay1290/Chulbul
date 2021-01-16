---
last_updated: 16/01/2021
next: /use-cases
---
{% extends 'layouts/docs.html' %}

{% block content %}

# Setting Up...
To setup basic chulbul development enviroment you neet to start by installing chulbul.\
To do that you can use npm
```shell
$ npm install chulbul
```
or can use yarn
```shell
$ yarn add chulbul
```

After installing chulbul create a index.js file and inside it.

{{ code('javascript', 
'const Chulbul = require(Chulbul)\n
Chulbul(__dirname, config)
    \t.listen(5000)') | safe}}

And this all now run the `index.js` file using node by `node index.js`

This will start the development server for you and will create a directory structure like below

```JSON
{
    "build": {
        ...
        "index.html": null,
        "main.css": null,
        "power.js": null,
    },
    "templates": {
        "components": {
            "footer.html": null,
            "navbar.html": null
        },
        "docs": {
            "index.html": null,
            "v0.0.1": {
                "index.md": null,
                "introduction.md": null,
                "setup.md": null
            }
        },
        "layouts": {
            "base.html": null,
        },
        "static": {
            "main.css": null,
            "power.js": null,
        }
    },
    "index.js": null,
}
```

{% endblock content %}