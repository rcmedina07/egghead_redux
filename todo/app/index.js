import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Todos from './components/Todos'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Todos />
  </Provider>, document.getElementById("app"));