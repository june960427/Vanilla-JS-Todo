import Component from "../Core/Core";

export default class TitleInput extends Component {
  setup() {
    this.title = this.$props.title;
  }
  template() {
    return `
          <label for="title">제목</label>
            <input type="text" name="title" id="title" maxlength="30" value="${
              this.title
            }"/>
          <div class="input-information">
            <p class="title-info">
            ${this.title.length > 0 ? "" : "텍스트를 입력하세요."}
            </p>          
            <p><span class="count" id="title-count">${
              this.title.length
            }</span>/30</p>
          </div>
`;
  }

  setEvent() {
    const titleInput = this.$target.querySelector("input[type=text]");

    if (titleInput) {
      titleInput.addEventListener("input", (e) => {
        let { value } = e.target;
        let titleCount = this.$target.querySelector("#title-count");
        let inputInfo = this.$target.querySelector(".title-info");

        titleCount.textContent = value.trim().length > 0 ? value.length : 0;
        inputInfo.textContent =
          value.trim().length > 0 ? "" : "텍스트를 입력하세요.";
      });
    }
  }

  getValue() {
    return this.$target.querySelector("input[type=text]").value.trim();
  }
}
