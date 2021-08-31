import { Editor, Frame, Element } from '@craftjs/core';
import React, { useEffect } from 'react';
import './App.css';
import { SettingsPanel } from './components/SettingsPanel';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/Topbar';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Text } from './components/Text';
function App() {
  function onDragStart(e){
    let platform = window.navigator.platform
if (/Linux/.test(platform))  {
  const imgbefore = document.createElement('img');
  imgbefore.src = 'a';
  e.dataTransfer.setDragImage(imgbefore, 0, 0);
}
}

  useEffect(()=>{
    document.addEventListener('dragstart',(e)=>onDragStart(e));
  },[])


  return (
    <div className={'flex flex-col'} style={{ margin: '0 auto', width: '800px' }}>
      <span className={'my-3 mx-0 text-center'}>
        Basic Page Builder
      </span>
      <Editor
        resolver={{
          Button,
          Text,
          Container,
        }}
      >
        <Topbar />
        <div className="pt-1 flex flex-row justify-between">
          <div className="w-full">
            <Frame >
              <Element 
                wMin={false}
                canvas
                is={Container}
                padding={5}
                className={'mr-5 h-full'}
                background="white"
                data-cy="root-container"

              >
                <Element
                wMin={true}
                  canvas
                  is={Container}
                  padding={6}
                  background="white"
                  data-cy="frame-container"
  
                >
                
                </Element>
              </Element>
            </Frame>
          </div>
          <div className="w-2/6">
            <div className="bg-white p-0">
              <Toolbox />
              <SettingsPanel />
              </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}

export default App;
