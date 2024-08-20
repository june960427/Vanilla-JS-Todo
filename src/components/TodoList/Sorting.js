import Component from "../Core/Core.js";

export default class Sorting extends Component {
  setup() {
    this.$state = {
      currentSort: "",
    };
  }

  handleSortRecent = () => {
    this.setState({ currentSort: "최신순" });
    this.$props.onSortRecent();
  };

  handleSortPriority = () => {
    this.setState({ currentSort: "중요도" });
    this.$props.onSortPriority();
  };

  handleSortFinish = () => {
    this.setState({ currentSort: "임박" });
    this.$props.onSortFinish();
  };

  template() {
    let { currentSort } = this.$state;
    const checkCurrentSort = (current) =>
      currentSort === current ? "true" : "false";

    return `
      <div class="sorting-inner">
        <button class="addTodoBtn">추가</button>
        <menu class="sorting-menu" role="tablist">
          <li id="recent"
            aria-selected=${checkCurrentSort("최신순")}
          >
            <p>최신순</p>
          </li>
          <li id="priority"
            aria-selected=${checkCurrentSort("중요도")}
          >
            <p>중요도</p>
          </li>
          <li id="upComming"
            aria-selected=${checkCurrentSort("임박")}
          >
            <p>임박</p>
          </li>
        </menu>
      </div>
      <hr />
    `;
  }

  componentDidMount() {
    const addTodoBtn = document.querySelector(".addTodoBtn");
    addTodoBtn.addEventListener("click", () => {
      this.$props.openMobilePopup();
      document
        .querySelector(".popup-container")
        .querySelector(".fix-form").style.display = "none";
      document
        .querySelector(".popup-container")
        .querySelector(".submit-form").style.display = "block";
    });

    this.setEvent();
  }

  setEvent() {
    const sortingMenu = document.querySelector(".sorting-menu");

    sortingMenu.addEventListener("click", (e) => {
      const sortingBtn = e.target.closest("li");

      if (!sortingBtn) return;
      if (sortingBtn.id.includes("recent")) this.handleSortRecent();
      if (sortingBtn.id.includes("priority")) this.handleSortPriority();
      if (sortingBtn.id.includes("upComming")) this.handleSortFinish();
    });
  }
}
