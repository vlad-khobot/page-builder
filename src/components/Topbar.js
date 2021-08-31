import { useEditor } from '@craftjs/core';

import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import React from 'react';

export const Topbar = () => {
  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: state.options.enabled && query.history.canUndo(),
      canRedo: state.options.enabled && query.history.canRedo(),
    })
  );



  return (
    <div className="p-1 mb-1 bg-white rounded" >
      <div className="flex items-center justify-between">
        <div className="flex flex-row justify-between">
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"  checked={enabled}
                onChange={(_, value) =>
                  actions.setOptions((options) => (options.enabled = value))
                }/>
    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
</div>
<label for="toggle" class="text-gray-700 pr-5">Enable</label>
          <button
                className="border border-red-500 rounded-xl text-red-500 px-1 mx-1 hover:bg-red-500 hover:text-white"
            size="small"
            variant="outlined"
            color="secondary"
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            Undo
          </button>
          <button
      className="border border-red-500 rounded-xl text-red-500 px-1 mx-1 hover:bg-red-500 hover:text-white"
            size="small"
            variant="outlined"
            color="secondary"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}

          >
            Redo
          </button>
        </div>
        <div>
          <button
          className="border border-red-500 rounded-xl text-red-500 px-1 mx-1 hover:bg-red-500 hover:text-white"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              const json = query.serialize();
              copy(lz.encodeBase64(lz.compress(json)));
            }}

          >
            Copy current state
          </button>
          <button
                className="border border-red-500 rounded-xl text-red-500 px-1 mx-1 hover:bg-red-500 hover:text-white"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              const answer=window.prompt('Enter state data')
              try{
                const json = lz.decompress(lz.decodeBase64(answer));
                setTimeout(()=>{actions.deserialize(json)},1000);
              }
              catch(e){
                window.alert('Enter valid data')
                return;
              }
            
            }}
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
};
