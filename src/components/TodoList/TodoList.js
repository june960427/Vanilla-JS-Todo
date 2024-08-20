import Component from "../Core/Core";
import DeletePopup from "./components/Popup/DeletePopup";
import todoCard from "./TodoCard";
import TodoForm from "../TodoForm/TodoForm";
import popupFormTemplate from "./components/Popup/MemoPopup";

export default class TodoList extends Component {
  setup() {
    this.$state = {
      todos: [...this.$props.todos],
    };
  }

  /*
  투두 데이터 형식
    {
      expiringDate : ""
      id : int
      isFinish : boolean 
      memo : ""
      priority : ""
      title : ""
      validDate: ""
    }
  */

  template() {
    const { todos } = this.$state;
    return `
            ${todos.map((todo) => todoCard(todo)).join("")}
    `;
  }

  /**
    각 카드별 이벤트 리스너
    최적화를 위해 해당 컨테이너에 이벤트 리스너 생성
   
    finish 버튼 클릭 시 => 배열 안의 해당 요소 isFalse 항목을 반대로 조정 후 재랜더링
   
    memo 버튼 클릭 시 => 팝업 창 오픈 : 팝업 창에 해당 id 값의 데이터를 넘겨준 후 팝업 창에서 데이터 출력
   
    delete 버튼 클릭 시 => 삭제 팝업 오픈 : 삭제할 때 id값 이용을 위해 id값 넘겨준다.
   */

  setEvent() {
    this.$target.addEventListener("click", (e) => {
      const target = e.target;
      const todoCard = target.closest(".todo-card");

      if (todoCard) {
        const { id } = todoCard.dataset;
        const cardId = parseInt(id);
        const item = this.$state.todos.find(({ id }) => id === cardId);

        if (target.classList.contains("finish")) {
          this.onUpdateIsFinish(cardId, { isFinish: !item.isFinish });
        }

        if (target.classList.contains("open-memo")) {
          this.openMemoPopup(cardId);
        }

        if (target.classList.contains("delete-todo")) {
          this.openDeletePopup(cardId);
        }
      }
    });
  }

  createPopup() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.classList.remove("hide");

    return popupContainer;
  }

  removePopup() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.classList.add("hide");
  }

  onUpdate(todoCard) {
    /**
      현재 스테이트의 요소를 선택해 해당 요소의 isFinish 값 수정
     */
    const updatedTodos = [...this.$state.todos].map((todo) =>
      todo.id === todoCard.id ? todoCard : todo
    );
    this.setState({ todos: updatedTodos });
  }

  onUpdateIsFinish(cardId, updates) {
    const updatedTodo = {
      ...this.$state.todos.find((todo) => todo.id === cardId),
      ...updates,
    };
    this.onUpdate(updatedTodo);
  }

  onDelete(todoCardId) {
    /**
      현재 스테이트의 요소를 선택해 해당 요소를 삭제
     */
    const updatedTodos = [...this.$state.todos].filter(
      (todo) => todo.id != todoCardId
    );
    this.setState({ todos: updatedTodos });
  }

  deleteTodo(id) {
    this.onDelete(id);
    this.removePopup();
  }

  openDeletePopup(id) {
    const popupContainer = this.createPopup();
    new DeletePopup(popupContainer, {
      todoId: id,
      onConfirm: () => this.deleteTodo(id),
      onCancel: () => this.removePopup(),
    });
  }

  fixTodo(updatedTodo) {
    /**
      현재 스테이트에 요소를 선택해 해당 요소를 수정
     */
    const updatedTodos = this.$state.todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    this.setState({ todos: updatedTodos });
  }

  openMemoPopup(cardId) {
    const popupContainer = this.createPopup();
    popupContainer.innerHTML = popupFormTemplate();
    const todoformContainer = popupContainer.querySelector(
      ".todoform-container"
    );

    popupContainer.addEventListener("click", (e) => {
      const { target } = e;
      const memoPopup = popupContainer.querySelector(".memo-popup");
      if (target.classList.contains("delete-memopopup")) {
        if (memoPopup) {
          popupContainer.removeChild(memoPopup);
        }
        this.removePopup();
      }
    });

    new TodoForm(todoformContainer, {
      fixTodo: (updatedTodo) => this.fixTodo(updatedTodo),
      todo: this.$state.todos.filter((todo) => todo.id == cardId),
    });
  }
}
