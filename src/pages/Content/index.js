import { printLine } from './modules/print';
import { funDrag } from '@/share';

const name = 'ngpiiejhejikkflajojekhfnfpanfbfg';
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

(async () => {
  const result = await chrome.runtime.sendMessage({ action: 'get_mouse_data' });
  const { x, y } = result?.mouse_position || {};
  const position = { x: x || '50%', y: y || '50%' };
  const newDiv = document.createElement('div');
  newDiv.setAttribute('title', '长按可拖动到任何位置');
  newDiv.setAttribute('id', 'chrome-extension-boilerplate-react');
  newDiv.style.cssText = `
        position: fixed; 
        z-index: 2147483647;
        width: 64px;
        height: 64px; 
        top: ${position.y}; 
        right: 0; 
        left: ${position.x};
        cursor: pointer; 
        border-radius: 8px; 
        background: url(chrome-extension://${name}/logo.png) no-repeat 0 0/100%;
    `;
  document.body.appendChild(newDiv);
  funDrag(newDiv);
})();
