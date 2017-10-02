import React from 'react'
import ReactDOM from "react-dom"
import Counter from "./components/Counter"
import { createStore, compose } from "redux"

// reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const render = () => ReactDOM.render(<Counter value={store.getState()}
  onIncrement={() => store.dispatch({
    type: "INCREMENT"
  })}
  onDecrement={() => store.dispatch({
    type: "DECREMENT"
  })}
/>, document.getElementById("app"))

store.subscribe(render);
render();