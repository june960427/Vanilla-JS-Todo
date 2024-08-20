import Component from "../Core/Core";

export default class DateInput extends Component {
  setup() {
    this.expiringDate = this.$props.expiringDate;
  }

  template() {
    return `
      <label for="expiring-date">만료 기한</label>
      <input type="date" 
        name="expiring-date" 
        id="expiring-date" 
        min="${this.today()}" 
        value="${this.expiringDate}"/>
      <div class="date-information">
        <p class="date-info">
        ${this.expiringDate.length > 0 ? "" : "날짜를 입력하세요."}
        </p>          
      </div>
    `;
  }

  today() {
    return new Date().toISOString().split("T")[0];
  }

  getValue() {
    return this.$target.querySelector("input[type=date]").value;
  }

  setEvent() {
    this.$target
      .querySelector("input[type=date]")
      .addEventListener("input", (e) => {
        const { value } = e.target;
        const dateInfo = this.$target.querySelector(".date-info");

        dateInfo.textContent = value !== "" ? "" : "날짜를 선택하세요.";
      });
  }
}
