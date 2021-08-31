import { useEditor } from '@craftjs/core';
import React from 'react';

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <div className={"bg-gray-100 mt-2 px-2 py-2"} >
      <div className={"flex flex-col"}>
        <div item>
          <div className={"pb-2"} pb={2}>
            <div className={"flex items-center"}>
              <div item xs>
                <span >Selected</span>
              </div>
              <div item>
                <span className="bg-blue-500 rounded-xl ml-2 pt-0.5 pb-0.5 pl-2 pr-2 text-white">{selected.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div data-cy="settings-panel">
          {selected.settings && React.createElement(selected.settings)}
        </div>
        {selected.isDeletable ? (
          <button
          className="border border-red-500 rounded-xl text-red-500 mt-4 hover:bg-red-500 hover:text-white"
            variant="contained"
            color="default"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
};
