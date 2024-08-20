const todoCard = (todo) => {
  const { id, title, memo, validDate, expiringDate, priority, isFinish } = todo;
  return `
        <div class="todo-card window" data-id="${id}">
          <div class="title-bar ${isFinish ? "inactive" : ""}">
            <div class="priority title-bar-text">${priority}</div>
            <div class="title-bar-controls">
              <button class="finish" aria-label="Minimize"></button>
              <button class="open-memo" aria-label="Maximize"></button>
              <button class="delete-todo" aria-label="Close"></button>
            </div>
          </div>
          <div class="window-body">
            <div class="content-box">
              ${
                isFinish
                  ? `<s class="todo-title">${title}</s>`
                  : `<p class="todo-title">${title}</p>`
              }
              <p class="todo-memo">${memo}</p>
            </div>
            <div class="status-bar">
              <p class="valid-date status-bar-field">${validDate}</p>
              <p class="expiring-date status-bar-field">${expiringDate}</p>
            </div>
          </div>
        </div>
    `;
};

export default todoCard;
