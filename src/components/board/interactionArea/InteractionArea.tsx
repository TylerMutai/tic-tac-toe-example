import React, {useReducer} from 'react';
import interactionAreaReducer, {interactionAreaInitialState} from "@/reducers/interactionArea/reducer";

function InteractionArea() {
  const [state, dispatch] = useReducer(interactionAreaReducer, interactionAreaInitialState)
  return (
    <div></div>
  );
}

export default InteractionArea;