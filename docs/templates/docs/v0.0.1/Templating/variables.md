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

# Variables
A variable looks up a value from the front-matter of a file in which variable is used.
If you wanted to simply display a variable, you would do:
{{ code('html','---\nname: Ajay \n---\nMy name is {{ name }}') | safe }}

If a value is undefined or null, nothing is displayed. The same behavior occurs when referencing undefined or null objects.

## Global Built-in Variables
- `request` : It will display current url route to screen.
- `url_for` : It is always prefered to use this function for adding routes or path to static files.
- `version` : It will display current latest version to screen.

{% endblock content %}