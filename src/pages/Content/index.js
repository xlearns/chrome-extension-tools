import { printLine } from './modules/print';
import { funDrag } from '@/share';

const name = 'ngpiiejhejikkflajojekhfnfpanfbfg';
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let showSidebar = false;

(async () => {
  const result = await chrome.runtime.sendMessage({ action: 'get_mouse_data' });
  const { x, y } = result?.mouse_position || {};
  const position = { x: x || '50%', y: y || '50%' };
  const newDiv = document.createElement('div');
  newDiv.setAttribute('title', '长按可拖动到任何位置');
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
  const newModel = document.createElement('div');
  newModel.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9990;
    width: 0;
    height: 100%;
  `;

  newModel.innerHTML = `
  <div id='chrome-extension-boilerplate-react' style='position: absolute;right: 0;top: 0;width: 0;height: 100%;border-right: 0px solid #7a6e6e;-webkit-transition: right 0.3s ease-in-out 0s;transition: right 0.3s ease-in-out 0s;'>
   <div style='position: absolute;left: 6px;top: 0;width: 270px;height: 100%;z-index: 2;background: #eceaea;'>hello</div>
  </div>`;
  document.body.appendChild(newModel);

  function changeSidebar() {
    const dom = document.querySelector('#chrome-extension-boilerplate-react');
    dom.style.right = showSidebar ? '270px' : 0;
  }

  funDrag(newDiv, () => {
    showSidebar = !showSidebar;
    changeSidebar();
  });
})();
