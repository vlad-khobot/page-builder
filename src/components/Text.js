import { useNode } from '@craftjs/core';
import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
export const Text = ({ text, fontSize, textAlign, ...props }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
    className={'block px-1 py-1'}
      {...props}
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
            500
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign, maxWidth:'600px' }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));
const [value,setValue]=useState(fontSize)
  return (
    <>

<fieldset className="mt-3 mb-2 flex flex-col w-full"> 
<label component="legend">Font size</label>
        <input className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-5 w-128" type="range" min="1" max="100" step="1" value={value}  onChange={(e) =>{
 setProp((props) => (props.fontSize = e.target.value), 1000);
 setValue(e.target.value)
        }        
          }/>
      </fieldset>
    </>
  );
};

export const TextDefaultProps = {
  text: 'Hi',
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
