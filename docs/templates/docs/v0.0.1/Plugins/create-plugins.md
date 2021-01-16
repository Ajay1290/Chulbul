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

# Create Plugins
You can create your own plugins to give your touch to the sites it's very easy and basic if you creating plugins for chulbul please make it availble for public via npm or github so that others can get benifit from your hard work and time.

Create a directory for your plugin
```shell 
npm init -y
```

add all the dependecy of your plugin to `package.json` file and then install all depenceices.

Basic structure of plugin looks like below:
{{ code('javascript',
'function MyPlugin(config) {
    &nbsp;&nbsp;// site config is provided so that you can use it here
    &nbsp;&nbsp;// utils function and variable goes here 
    &nbsp;&nbsp;return function(chulbul, done) {
    &nbsp;&nbsp;   // chulbul instance is supplied by which you have access to all APIs
    &nbsp;&nbsp;    // code goes here
    &nbsp;&nbsp;    done();
    &nbsp;&nbsp;};
};
') | safe }}

As you can see config has been passed as parameter so that your plugin can use site configs for more specific kind of results to give. then you might have notice that this function is returing an anomys function which later gonna call by chulbul in which we have two parameter first is the chulbul instance by which we have all the apis in hand and the second is done which you have to call on the end of your code.

Let's create a quick plugin we call it `CodePlugin`.

Create a directory with name `CodePlugin` inside it initlazied npm and install prismjs by doing `npm install prismjs`
Create a new index.js inside it we will write the behaviour of our plugin.
{{ code('javascript',
'const path = require("path");
const fs = require("fs");\n
const prismjs = require("prismjs");
const prismCSS = fs.readFileSync(p.resolve(__dirname, "./node_modules/prismjs/themes/prism-okaidia.css"))\n
function CodePlugin(config) {
    &nbsp;&nbsp;&nbsp;&nbsp;const code = (language, code) =\> {
    \tif(prismjs.languages[language]){
    \t        return `<pre><button class="copy-btn">copy</button><code class="language-${language}">${prismjs.highlight(code, prismjs.languages[language] , language)}</code></pre>`
    \t}\n
        \treturn `<pre><button class="copy-btn">copy</button><code class="language">${code}</code></pre>`
    &nbsp;&nbsp;&nbsp;&nbsp;}\n
    &nbsp;&nbsp;&nbsp;&nbsp;return function(chulbul, done) {
    &nbsp;&nbsp;&nbsp;&nbsp;   chulbul.processor.renderer.addGlobal("prismCss", prismCSS)
    &nbsp;&nbsp;&nbsp;&nbsp;   chulbul.processor.renderer.addGlobal("code", code);
    &nbsp;&nbsp;&nbsp;&nbsp;};
};\n
module.exports = CodePlugin') | safe }}
Remember don't forget to export your plugin.

Now it's time to use this plugin to use this plugin import it and call `use` function and as a parameter pass your plugin and done.
{{ code('javascript', 
'const CodePlugin = require(../CodePlugin);
...\n
Chulbul(__dirname, config)
    .use(CodePlugin)
.listen(5000)
') | safe }}

And That's how we crate plugins for chulbul it is simple and easy try to make plugins and make it public so that others can get benifit from it.

{% endblock content %}