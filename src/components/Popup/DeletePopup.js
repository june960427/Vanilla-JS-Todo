import Component from "../Core/Core.js";

export default class DeletePopup extends Component {
  setup() {
    this.$state = {
      todoId: this.$props.todoId,
    };

    this.onConfirm = this.$props.onConfirm;
    this.onCancel = this.$props.onCancel;
  }

  template() {
    return `
    <div class="window delete-popup">
      <div class="title-bar">
        <div class="title-bar-text">할 일 삭제</div>
      </div>
      <div class="window-body">
        <p>해당 목록을 삭제 하시겠습니까?</p>
        <section class="field-row">
          <button class="confirm-delete">OK</button>
          <button class="cancel-delete">Cancel</button>
        </section>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.$target.addEventListener("click", (e) => {
      const button = e.target;
      const id = this.$state.todoId;
      if (button.classList.contains("confirm-delete")) this.onConfirm(id);
      if (button.classList.contains("cancel-delete")) this.onCancel();
    });
  }
}
