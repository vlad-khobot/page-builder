import { useNode} from '@craftjs/core';
import ColorPicker from 'material-ui-color-picker';
import React from 'react';
import {useState} from 'react'
export const Container = ({ background, padding, children, wMin, ...props }) => {
  let classes=`my-0.5 mx-0.5 border border-black inline-block`
  if(wMin) classes+=' w-max'
  else classes+=' w-full overflow-hidden'
  const { 
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
    style={{background:`${background}`, padding: `${padding-6}px`, minWidth:'150px', minHeight:'25px'}}
    className={classes}
      {...props}
      ref={(ref) => connect(drag(ref))}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: {  setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));
const [value, setValue]=useState(padding)
  return (
    <div>
      <div>
        <span component="legend">Background</span>
        <ColorPicker
          name="background-color"
          value={background}
          onChange={(color) => {
            setProp((props) => (props.background = color), 500);
          }}
        />
      </div>
      <fieldset className="mt-3 mb-2 flex flex-col w-full"> 
        <label className="pb-2">Padding</label>
        <input className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-5 w-128" type="range" min="1" max="100" step="1" value={value}  onChange={(e) =>{
 setProp((props) => (props.padding = value), 500)
 setValue(e.target.value)
        }
           
          }/>
      </fieldset>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: '#ffffff',
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
