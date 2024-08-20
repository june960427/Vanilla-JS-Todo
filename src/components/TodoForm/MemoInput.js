import Component from "../Core/Core.js";

export default class MemoInput extends Component {
  setup() {
    this.memo = this.$props.memo;
  }

  template() {
    return `
      <label for="memo">메모</label>
      <textarea name="memo" id="memo" maxlength="200">${this.memo}</textarea>
      <p><span class="count" id="memo-count">${this.memo.length}</span>/200</p>
    `;
  }

  setEvent() {
    const memoInput = this.$target.querySelector("textarea");

    if (memoInput) {
      memoInput.addEventListener("input", (e) => {
        let { length } = e.target.value;
        let titleCount = this.$target.querySelector("#memo-count");
        if (titleCount) titleCount.textContent = length;
      });
    }
  }

  getValue() {
    return this.$target.querySelector("textarea").value.trim();
  }
}
