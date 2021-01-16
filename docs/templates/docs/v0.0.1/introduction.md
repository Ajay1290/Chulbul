---
last_updated: 16/01/2021
next: /download
---
{% extends 'layouts/docs.html' %}

{% block content %}

# Introduction
Chulbul is the Minimalistic Static Site Generator which is simple, fast and easy to use 
which is intended to be used for creating documentations.

## Why Chulbul ?
It uses `HTML`, `CSS`, `JS` and `Markdown` to write code for the docs which means it is highly customizable.

## What about boilerplate code ?
To deal with boilerplate code chulbul uses [nunjucks](https://mozilla.github.io/nunjucks/) as a templating engine 
so that you can inherit your layout to each html or md file to reduce boilerplate code. 
Also you can get benifit of A rich and powerful templating features of it.

## Features
- Uses `HTML`, `CSS`, `JS` and `Markdown` to build static sites
- Minifies all static files which are suitable for production use.
- Auto Url Routing (it does automatically by your folder structure)
- Boilerplate code (nunjucks helps in it)
- Easy to extend features via plugins


{% endblock content %}