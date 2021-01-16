const p = require('path');
const fs = require('fs');

const prismjs = require('prismjs');
const prismCSS = fs.readFileSync(p.resolve(__dirname, './node_modules/prismjs/themes/prism-okaidia.css'))
const docsCSS = fs.readFileSync(p.resolve(__dirname, './plugin.css'))

function DocsPlugin(config) {

    const code = (language, code) => {
        if(prismjs.languages[language]){
            return `<pre><button class='copy-btn'>copy</button><code class='language-${language}'>${prismjs.highlight(code, prismjs.languages[language] , language)}</code></pre>`
        }

        return `<pre><button class='copy-btn'>copy</button><code class='language'>${code}</code></pre>`
    }
  
    return function(chulbul, done) {
        chulbul.processor.renderer.addGlobal('prismCss', prismCSS)
        chulbul.processor.renderer.addGlobal('docsCss', docsCSS)
        chulbul.processor.renderer.addGlobal("code", code);
        chulbul.processor.renderer.addTempDir(p.resolve(__dirname, 'templates'))
        chulbul.processor.renderer.addGlobal("DocsPlugin", p.resolve(__dirname, 'templates', 'layout.html'))
    };
};
  

module.exports = DocsPlugin