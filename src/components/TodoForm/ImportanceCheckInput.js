import Component from "../Core/Core.js";

export default class ImportanceCheckInput extends Component {
  setup() {
    this.id = this.generateUniqueId();
    this.state = {
      priority: this.$props.priority,
    };
  }

  generateUniqueId() {
    /*
      팝업시에 돔에서 충돌이 나는지 팝업 안에서 동작해야될게 밖에서 동작 돼서
      생성될 때 고유 id 값을 만들어서 일단은 처리

      추가적으로 더 확인해 보고 충돌나는 부분 고칠 에정.
    */
    return this.$props.id === null ? Math.random(100) : this.$props.id;
  }

  template() {
    return `
      <fieldset>
        <legend>중요도</legend>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="normal-${this.id}"
            value="보통"
            ${this.state.priority === "보통" ? "checked" : ""}
          />
          <label for="normal-${this.id}">보통</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="important-${this.id}"
            value="중요"
            ${this.state.priority === "중요" ? "checked" : ""}
          />
          <label for="important-${this.id}">중요</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="very-important-${this.id}"
            value="매우 중요"
            ${this.state.priority === "매우 중요" ? "checked" : ""}
          />
          <label for="very-important-${this.id}">매우 중요</label>
        </div>
      </fieldset>
    `;
  }

  getValue() {
    const selectedInput = this.$target.querySelector(
      `input[name='priority-${this.id}']:checked`
    );
    return selectedInput ? selectedInput.value : "";
  }
}
