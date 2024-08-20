import Component from "../Core/Core.js";
import getCurrentTime from "../../utils/getCurrentTime.js";

export default class Clock extends Component {
  setup() {
    this.$state = {
      currentTime: getCurrentTime(),
    };
    this.startClock();
  }

  template() {
    return `<p class="clock">${this.$state.currentTime}</p>`;
  }

  startClock() {
    setInterval(() => {
      this.setState({ currentTime: getCurrentTime() });
    }, 1000);
  }
}
