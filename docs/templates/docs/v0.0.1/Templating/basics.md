---
last_updated: 16/01/2021
next: /advance-config
---
{% extends 'layouts/docs.html' %}

{% block toc %}
<div class='sw-list'>
    <a href='#what-is-config-?' class='sw-item'>What is Config ?</a>
    <a href='#example' class='sw-item'>Example</a>
    <a href='#default-config' class='sw-item'>Default Config</a>
    <a href='#config-variable' class='sw-item'>Config Variable</a>
</div>
{% endblock toc %}

{% block content %}

# Basics of Templating
Templates are basic structure or layout of our webpage which we want to replicate in each file of our website.
To not do that manually we use templating engines which process templates as layout and file as target with some contextual data to give us resultant page which is combination of all those things. 

## Can't I create sites without templating?
Yes, You can create a site without templating but question is it that maintainable or readable? No, That's why we use templating engines to reduce boilerplate code (repeating code) and to make our site in a more programmatic way possible.

## Nunjucks as Templating Engine
Chulbul uses [nunjucks](https://mozilla.github.io/nunjucks/) as templating engine which is a rich and powerful templating language for JavaScript by Mozila. It is prefered that you learn basic nunjucks templating before start. 


 
{% endblock content %}