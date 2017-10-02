import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        dispatch(actions.addTodo(input.value));
        input.value = "";
      }}>Add todo</button>
    </div>
  );
}

AddTodo = connect()(AddTodo);

const getVisibilityFilter = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(
        t => t.completed
      );
    case "SHOW_ACTIVE":
      return todos.filter(
        t => !t.completed
      );
  }
}

const Todo = ({ onClick, completed, text }) => {
  return (
    <li onClick={onClick}
      style={{
        textDecoration:
        completed ? 'line-through' : 'none'
      }}>
      {text}
    </li>
  );
}

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibilityFilter(
      state.todos,
      state.visibilityFilter
    )
  };
}

const mapDispatchToTodoListProps = ( dispatch ) => {
  return {
    onTodoClick: (id) => {
      dispatch(actions.toggleTodo(id))
    }
  };
}

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />)}
    </ul>
  );
}

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);


const mapStateLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToLinkProps = ( dispatch, ownProps ) => {
  return {
    onClick: () => {
      dispatch(
        actions.setVisibilityFilter(ownProps.filter)
      );
    }
  }
}

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  );
}
const FilterLink = connect(mapStateLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => {
  return (
    <p>
      Show:
      {" "}
      <FilterLink filter="SHOW_ALL">
        All
          </FilterLink>
      {" "}
      <FilterLink filter="SHOW_ACTIVE">
        Active
          </FilterLink>
      {" "}
      <FilterLink filter="SHOW_COMPLETED">
        Completed
          </FilterLink>
      {" "}
    </p>
  );
}

const Todos = () =>
  (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );

export default Todos;