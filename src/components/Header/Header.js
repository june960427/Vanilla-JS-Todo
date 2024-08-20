import Component from "../Core/Core.js";
import Clock from "./Clock.js";

export default class Header extends Component {
  template() {
    return `
        <div class="header-container">
            <h1>TODOLIST</h1>
            <div class="clock-container"></div>
        </div>
        <hr />
    `;
  }

  componentDidMount() {
    this.clock = new Clock(this.$target.querySelector(".clock-container"));
    this.clock.render();
  }
}
