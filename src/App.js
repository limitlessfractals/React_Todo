import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';

// to deploy: npm run build

class App extends Component{
  state = {
    todos: [
      
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todos: res.data }))
  }

  //toggles state at top, which is brought down through the components
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed 
      }
      return todo;
    }) });
  }

  // Delete Todo; ... is spread operator; setState to items that don't match id
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //addTodo
  addTodo = (title) => {
    axios.post(
      'https://jsonplaceholder.typicode.com/todos', 
      { title: title, 
        completed: false
      })
      .then((res) => {
        res.data.id = uuid.v4();
        this.setState({ todos: [...this.state.todos, res.data] });
      });
    } 

  render() { 
    //console.log(this.state.todos)
    // markComplete is a prop from Todos.js
    return(
      <Router>
        <div className = "App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )} />
            <Route path="/About" component={About} />          
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
