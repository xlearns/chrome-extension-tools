import React,{useEffect} from 'react';
import {tabsExecJs,getTabs} from '@/share'
import { List  } from 'antd';
import './Popup.css';


const data = Array.from({length:6}).map((_,index)=>{
  return 'title' + index
})

const Popup = () => {
  async function click(){
    const tabs = await getTabs();
    const tabId = tabs[0].id;  
    tabsExecJs({tabId,func:()=>{
       console.log(1234)
    }})
  }

  return (
    <div className="App">
      <List
      size="small"
      dataSource={data}
      renderItem={(item) => <List.Item style={{padding:'2px'}}>
        <div className='center' onClick={click}>{item}</div>
      </List.Item>}
    />
    </div>
  );
};

export default Popup;
