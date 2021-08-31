import { useEditor, Element } from '@craftjs/core';

import React from 'react';

import { Button } from './Button';
import { Container } from './Container';
import { Text } from './Text';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className={`px-2 py-2`}>
      <div className={`flex flex-col items-center justify-center my-2`}
      >
        <div className={`pb-2`}>
          <label>Drag to add</label>
        </div>
        <div className={`w-full`}>
          <button className={`w-full border border-black my-1 rounded-xl hover:bg-black hover:text-white`} 
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            data-cy="toolbox-button"
          >
            Button
          </button>
        </div>
        <div className="flex flex-col w-full">
          <button
            ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
            className={`w-full border border-black my-1 rounded-xl hover:bg-black hover:text-white`}
            data-cy="toolbox-text"
          >
            Text
          </button>
        </div>
        <div className="flex flex-col w-full">
          <button
         className={`w-full border border-black my-1 rounded-xl hover:bg-black hover:text-white`}
            ref={(ref) =>
              connectors.create(
                ref,
                <Element canvas is={Container} wMin={true} padding={6} />
              )
            }

            data-cy="toolbox-container"
          >
            Container
          </button>
        </div>
      </div>
    </div>
  );
};
