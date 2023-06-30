/**
 *
 * @param {*} fn
 * @returns
 */
export const isFunction = (fn) => {
  return typeof fn === 'function';
};
/**
 *
 * @param {*} msg
 */
export const rnSendMessage = (msg) => {
  chrome.runtime.sendMessage(msg);
};

/**
 *
 * @param {*} fn
 */
export const rnMessageListener = (fn) => {
  chrome.runtime.onMessage.addListener((...arg) => {
    isFunction(fn) && fn(...arg);
  });
};
/**
 *
 * @param {*} id
 * @param {*} msg
 */
export const tabSendMessage = (id, msg) => {
  chrome.tabs.sendMessage(id, msg);
};

/**
 *
 * @param {*} config
 */
export const tabsExecJs = (config) => {
  const { tabId, ...args } = Object.assign({}, config);
  chrome.scripting.executeScript({
    target: { tabId },
    ...args,
  });
};

/**
 *
 * @param {*} fn
 * @param {*} config
 */
export const getTabs = (config) => {
  const arg = Object.assign({}, { active: true, currentWindow: true }, config);
  return new Promise((resolve) => {
    chrome.tabs.query(arg, function (tabs) {
      resolve(tabs);
    });
  });
};

export const storage = {
  set(key, value, fn) {
    chrome.storage.local.set({ [key]: value }, () => {
      isFunction(fn) && fn();
    });
  },
  get(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        const value = result.key;
        resolve(value);
      });
    });
  },
  getAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, function (items) {
        resolve(items);
      });
    });
  },
  clear() {
    return chrome.storage.local.clear();
  },
};

export function funDrag(element, callback) {
  callback = callback || function () {};
  var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false,
  };
  //获取相关CSS属性
  var getCss = function (o, key) {
    return o.currentStyle
      ? o.currentStyle[key]
      : document.defaultView.getComputedStyle(o, false)[key];
  };

  //拖拽的实现
  if (getCss(element, 'left') !== 'auto') {
    params.left = parseInt(getCss(element, 'left'));
  }
  if (getCss(element, 'top') !== 'auto') {
    params.top = parseInt(getCss(element, 'top'));
  }
  //o是移动对象
  element.addEventListener('mousedown', function (event) {
    params.flag = true;
    event = event || window.event;
    params.currentX = event.clientX;
    params.currentY = event.clientY;
  });
  element.addEventListener('mouseup', function () {
    params.flag = false;
    if (getCss(element, 'left') !== 'auto') {
      params.left = parseInt(getCss(element, 'left'));
    }
    if (getCss(element, 'top') !== 'auto') {
      params.top = parseInt(getCss(element, 'top'));
    }
    callback();
  });
  document.addEventListener('mousemove', function (event) {
    event = event || window.event;
    if (params.flag) {
      var nowX = event.clientX,
        nowY = event.clientY;
      var disX = nowX - params.currentX,
        disY = nowY - params.currentY;
      element.style.left = params.left + disX + 'px';
      element.style.top = params.top + disY + 'px';
      rnSendMessage({
        action: 'mouse_position',
        position: { x: element.style.left, y: element.style.top },
      });
    }
  });
}

export function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
