/**
 * 
 * @param {*} fn 
 * @returns 
 */
export const isFunction = (fn)=>{
    return typeof fn === 'function'
}
/**
 * 
 * @param {*} msg 
 */
export const rnSendMessage =  (msg)=>{
    chrome.runtime.sendMessage(msg)
}

/**
 * 
 * @param {*} fn 
 */
export const rnMessageListener = (fn)=>{
    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
        isFunction(fn) && fn(request, sender, sendResponse)
    }); 
}
/**
 * 
 * @param {*} id 
 * @param {*} msg 
 */
export const tabSendMessage = (id,msg)=>{
    chrome.tabs.sendMessage(id, msg);
}

/**
 * 
 * @param {*} config 
 */
export const tabsExecJs = (config)=>{
    const { tabId,...args } = Object.assign({},config);
    chrome.scripting.executeScript({
        target: {tabId},
        ...args
    })
}

/**
 * 
 * @param {*} fn 
 * @param {*} config 
 */
export const getTabs = (config)=>{
    const arg = Object.assign({},{ active: true, currentWindow: true },config)
    return new Promise((resolve)=>{
        chrome.tabs.query(arg, function(tabs) {
            resolve(tabs)
        })
    })
    
}


export const storage = {
    set(key,value,fn){
        chrome.storage.local.set({ [key]: value },()=>{
            isFunction(fn) && fn()
        });
    },
    get(key){
        return new Promise((resolve)=>{
            chrome.storage.local.get([key], (result) => {
                const value = result.key;
                resolve(value)
              });
        })
    }
}
