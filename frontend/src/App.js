// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      allTask: true,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        all: true,
      },
      todoList: [],
      activeView: 0,
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    return axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => {
        this.setState({ todoList: res.data });
      })
      .catch((err) => console.log(err));
  };

  setActiveView = (view) => {
    this.setState({ activeView: view });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    const { activeView } = this.state;
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.setActiveView(0)}
          className={activeView === 0 ? "active" : ""}
        >
          All
        </span>
        <span
          onClick={() => this.setActiveView(1)}
          className={activeView === 1 ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.setActiveView(2)}
          className={activeView === 2 ? "active" : ""}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { activeView, todoList } = this.state;
    let newItems = [];
    if (activeView === 0) {
      newItems = [...this.state.todoList];
    }

    if (activeView === 1) {
      newItems = todoList.filter((todo) => todo.completed === true);
    }

    if (activeView === 2) {
      newItems = todoList.filter((todo) => todo.completed === false);
    }

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
