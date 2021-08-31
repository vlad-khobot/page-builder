import { useNode } from '@craftjs/core';
import React from 'react';

export const Button = ({ size, variant, color, text, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  applyStyles()
  function applyStyles(){
    let sizeC=''
    let variantC=''
    let colorC=''
    if(size==='small') sizeC=`mx-1 px-1 py-2`
    else sizeC+=`mx-1 px-3 py-4`
    if(variant==="text") variantC=` text-black-500`
    else variantC=` border rounded`
    if(color==="default") colorC=` text-black border-black`
    else colorC=` border-red-500 text-red-500 rounded`
    return sizeC+variantC+colorC+' block m-0.5'
  }
  return (
    <button
    className={`${applyStyles()}`}
      ref={(ref) => connect(drag(ref))}
    >
      {text}
    </button>
  );
};

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <div className="flex flex-col">
        <label component="legend">Size</label>
        <div class="mt-2 flex flex-col">
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="size" value="small" defaultValue={props.size}
          onChange={(e) => setProp((props) => (props.size = e.target.value))}/>
      <span class="ml-2">Small</span>
    </label>
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="size" value="large" defaultValue={props.size}
          onChange={(e) => setProp((props) => (props.size = e.target.value))}/>
      <span class="ml-2">Large</span>
    </label>
  </div>
      </div>
      <div class="mt-2 flex flex-col">
        <label>Variant</label>
         <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="variant" value="text"  defaultValue={props.variant}
          onChange={(e) => setProp((props) => (props.variant = e.target.value))}/>
      <span class="ml-2">Text</span>
    </label>
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="variant" value="outlined"  defaultValue={props.variant}
          onChange={(e) => setProp((props) => (props.variant = e.target.value))}/>
      <span class="ml-2">Outlined</span>
    </label>
      </div>
      <div class="mt-2 flex flex-col">
        <label>Color</label>
        <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="color" value="default"  defaultValue={props.color}
          onChange={(e) => setProp((props) => (props.color = e.target.value))}/>
      <span class="ml-2">Default</span>
    </label>
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="color" value="secondary"  defaultValue={props.color}
          onChange={(e) => setProp((props) => (props.color = e.target.value))}/>
      <span class="ml-2">Secondary</span>
    </label>
      </div>
    </div>
  );
};

export const ButtonDefaultProps = {
  size: 'small',
  variant: 'outlined',
  color: 'default',
  text: 'Click me',
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
