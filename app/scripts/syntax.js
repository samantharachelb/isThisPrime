import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/highlight';

hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();
