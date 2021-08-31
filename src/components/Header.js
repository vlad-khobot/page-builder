import { useEditor } from '@craftjs/core';
import React from 'react';
import { Button } from './Button';
import { Text } from './Text';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="p-2">
      <div className="flex flex-col items-center justify-center"
      >
        <div className="pb-2">
          <span>Drag to add</span>
        </div>
        <div className="flex flex-col">
          <button
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
          >
            Button
          </button>
        </div>
        <div className="flex flex-col">
          <button
            ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
          >
            Text
          </button>
        </div>
      </div>
    </div>
  );
};
