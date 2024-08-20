import Component from "../Core/Core.js";
import DateInput from "./DateInput.js";
import ImportanceCheckInput from "./ImportanceCheckInput.js";
import MemoInput from "./MemoInput.js";
import TitleInput from "./TitleInput.js";

export default class TodoForm extends Component {
  setup() {
    this.$state = this.$props.todo ? this.$props.todo[0] : this.initialState();
    this.fixTodo = this.$props.fixTodo;
  }

  initialState() {
    return {
      expiringDate: "",
      id: null,
      isFinish: false,
      memo: "",
      priority: "보통",
      title: "",
    };
  }

  template() {
    return `
            <form>
                <div class="form-content">
                <div class="titleInput"></div>
                <div class="memoInput"></div>
                <div class="dateInput"></div>
                <div class="importanceInput"></div>
                </div>
                <button class="fix-form">수정</button>
                <button class="submit-form">완료</button>
            </form>
    `;
  }

  componentDidMount() {
    /**
      재사용 때문에 this.$target에서 셀렉팅해야함
     */

    const { id, title, memo, expiringDate, priority } = this.$state;

    const titleInput = this.$target.querySelector(".titleInput");
    this.titleInput = new TitleInput(titleInput, { title });

    const memoInput = this.$target.querySelector(".memoInput");
    this.memoInput = new MemoInput(memoInput, { memo });

    const dateInput = this.$target.querySelector(".dateInput");
    this.dateInput = new DateInput(dateInput, { expiringDate });

    const importnaceInput = this.$target.querySelector(".importanceInput");
    this.importanceCheckInput = new ImportanceCheckInput(importnaceInput, {
      priority,
      id,
    });

    // 일반 폼 이벤트 핸들러
    this.$target
      .querySelector(".submit-form")
      .addEventListener("click", (e) => this.onSubmit(e));

    //
    this.$target.querySelector(".fix-form").addEventListener("click", (e) => {
      this.onFix(e);
    });
  }

  formData() {
    const today = new Date().toISOString().split("T")[0];

    const formData = {
      title: this.titleInput.getValue(),
      memo: this.memoInput.getValue(),
      validDate: this.$state.validDate ? this.$state.validDate : today,
      expiringDate: this.dateInput.getValue(),
      priority: this.importanceCheckInput.getValue(),
      isFinish: this.$state.isFinish,
    };

    return formData;
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, expiringDate } = this.formData();

    if (title.length > 0 && expiringDate) {
      const newTodo = this.formData();
      this.$props.addTodo(newTodo);
      this.setState(this.initialState());
    }
  }

  hasChanges(newFormData) {
    const { title, memo, expiringDate, priority } = this.$state;
    return (
      newFormData.title !== title ||
      newFormData.memo !== memo ||
      newFormData.expiringDate !== expiringDate ||
      newFormData.priority !== priority
    );
  }

  onFix(e) {
    e.preventDefault();
    const newFormData = this.formData();

    if (this.hasChanges(newFormData)) {
      this.setState(newFormData);
      this.$props.fixTodo(this.$state);

      const popupContainer = document.querySelector(".popup-container");
      const memoPopup = popupContainer.querySelector(".memo-popup");
      if (memoPopup) {
        popupContainer.removeChild(memoPopup);
        popupContainer.classList.add("hide");
      }
    }
  }
}
