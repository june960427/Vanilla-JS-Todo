import Component from "@components/Core/core";
import Header from "@components/Header/Header";
import TodoForm from "@components/TodoForm/TodoForm";
import TodoList from "@components/TodoList/TodoList";
import Sorting from "@components/Todolist/Sorting";
import popupFormTemplate from "@components/Popup/MemoPopup";

export default class App extends Component {
  setup() {
    this.$state = {
      todos: [],
    };
  }

  template() {
    return `
      <div class="container window">
        <div class="title-bar">
          <div class="title-bar-text"></div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body" style="margin: 0">
          <header></header>
          <div class="todo-container">
            <div class="todoform-container"></div>
            <div class="todolist-container">
                  <div class="sorting-container"></div>
                  <div class="todolist"></div>
              </div>
          </div>
        </div>
      </div>
      <div class="popup-container hide"></div>
    `;
  }

  componentDidMount() {
    const header = document.querySelector("header");
    this.header = new Header(header);

    const todoformContainer = document.querySelector(".todoform-container");
    this.todoform = new TodoForm(todoformContainer, {
      addTodo: (newTodo) => this.addTodo(newTodo),
    });

    const sortingContainer = document.querySelector(".sorting-container");
    this.sorting = new Sorting(sortingContainer, {
      onSortRecent: () => this.onSortRecent(),
      onSortFinish: () => this.onSortFinish(),
      onSortPriority: () => this.onSortPriority(),
      openMobilePopup: () => this.openMobilePopup(),
    });

    const todoListContainer = document.querySelector(".todolist");
    this.todoList = new TodoList(todoListContainer, {
      todos: this.$state.todos,
    });
  }

  addTodo(newTodo) {
    const updatedTodos = [
      ...this.todoList.$state.todos,
      { ...newTodo, id: Date.now() },
    ];
    this.setState({ todos: updatedTodos });
  }

  onSortRecent() {
    const sortedTodos = [...this.todoList.$state.todos].sort(
      (a, b) => b.id - a.id
    );
    this.todoList.setState({ todos: sortedTodos });
  }

  onSortPriority() {
    const priority = {
      "매우 중요": 1,
      중요: 2,
      보통: 3,
    };

    const sortedTodos = [...this.todoList.$state.todos].sort((a, b) => {
      const priorityCheck = priority[a.priority] - priority[b.priority];
      if (priorityCheck === 0) return a.id - b.id;
      return priorityCheck;
    });

    this.todoList.setState({ todos: sortedTodos });
  }

  onSortFinish() {
    const sortedTodos = [...this.todoList.$state.todos].sort((a, b) => {
      const dateA = new Date(a.expiringDate);
      const dateB = new Date(b.expiringDate);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      return a.id - b.id;
    });
    this.todoList.setState({ todos: sortedTodos });
  }

  openMobilePopup() {
    const popupContainer = this.todoList.createPopup();
    popupContainer.innerHTML = popupFormTemplate();
    const todoformContainer = popupContainer.querySelector(
      ".todoform-container"
    );
    new TodoForm(todoformContainer, {
      addTodo: (newTodo) => this.addTodo(newTodo),
    });
  }
}
