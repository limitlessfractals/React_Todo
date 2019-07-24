//rce tab

import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{
  render() {
    //console.log(this.props.todos)
    return this.props.todos.map((todo) => (
      <TodoItem
        key={todo.id} 
        todo={todo} 
        markComplete={this.props.markComplete} 
        delTodo={this.props.delTodo}
      />  //todo is a prop from TodoItem.js; markComplete is a prop in App.js
    ));
  }
}

// PropTypes
// todos is array; todo is object
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}

export default Todos;