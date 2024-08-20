export default class Component {
  $state;
  $props;
  $target;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}
  template() {
    return ``;
  }
  componentDidMount() {}
  setEvent() {}
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
