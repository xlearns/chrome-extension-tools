import {storage,rnMessageListener} from '@/share'

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
  if (request.action === 'get_mouse_data') {
      setTimeout(async ()=>{
        const result =  await storage.getAll();
        sendResponse(result);
      })
    return true; 
  }
    if (request.action === "mouse_position") {
      storage.set(request.action,request.position)
  }
})

