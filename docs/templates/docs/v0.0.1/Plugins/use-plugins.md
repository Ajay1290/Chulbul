---
last_updated: 16/01/2021
next: /advance-config
---
{% extends 'layouts/docs.html' %}

{% block toc %}
<div class='sw-list'>
    <a href='#example' class='sw-item'>Example</a>
</div>
{% endblock toc %}

{% block content %}

# Use Plugins
As you have already read that chulbul is minamilastic static site genrator it means it use as less as possible to bring as more as possible output. But some times it is required to add more functionality to our site to meet nowdays standards of web to extends the features of chulbul we uses plugins which you can plug as per your requirment.

## How to use Plugins ?
It is simple install the plugin from npm package manager as `$ npm install chulbul-plugin-whatever`
{{ code('javascript', 
'const DocsPlugin = require(../plugins/DocsPlugin);
...\n
Chulbul(__dirname, config)
    .use(DocsPlugin)
.listen(5000)
') | safe }}

And it's done you are now using that plugin's features which you have passed to chulbul using `use` function

{% endblock content %}