var $=Object.defineProperty;var g=(n,t,e)=>t in n?$(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var d=(n,t,e)=>g(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();class a{constructor(t,e){d(this,"$state");d(this,"$props");d(this,"$target");this.$target=t,this.$props=e,this.setup(),this.render(),this.setEvent()}setup(){}template(){return""}componentDidMount(){}setEvent(){}render(){this.$target.innerHTML=this.template(),this.componentDidMount()}setState(t){this.$state={...this.$state,...t},this.render()}}const u=n=>n.toString().padStart(2,"0"),h=()=>{const n=new Date;let t={today:new Date().toISOString().split("T")[0],hour:u(n.getHours()),minute:u(n.getMinutes())};const{today:e,hour:i,minute:o}=t;return`${e} ${i}:${o}`};class y extends a{setup(){this.$state={currentTime:h()},this.startClock()}template(){return`<p class="clock">${this.$state.currentTime}</p>`}startClock(){setInterval(()=>{this.setState({currentTime:h()})},1e3)}}class S extends a{template(){return`
        <div class="header-container">
            <h1>TODOLIST</h1>
            <div class="clock-container"></div>
        </div>
        <hr />
    `}componentDidMount(){this.clock=new y(this.$target.querySelector(".clock-container")),this.clock.render()}}class b extends a{setup(){this.expiringDate=this.$props.expiringDate}template(){return`
      <label for="expiring-date">만료 기한</label>
      <input type="date" 
        name="expiring-date" 
        id="expiring-date" 
        min="${this.today()}" 
        value="${this.expiringDate}"/>
      <div class="date-information">
        <p class="date-info">
        ${this.expiringDate.length>0?"":"날짜를 입력하세요."}
        </p>          
      </div>
    `}today(){return new Date().toISOString().split("T")[0]}getValue(){return this.$target.querySelector("input[type=date]").value}setEvent(){this.$target.querySelector("input[type=date]").addEventListener("input",t=>{const{value:e}=t.target,i=this.$target.querySelector(".date-info");i.textContent=e!==""?"":"날짜를 선택하세요."})}}class x extends a{setup(){this.id=this.generateUniqueId(),this.state={priority:this.$props.priority}}generateUniqueId(){return this.$props.id===null?Math.random(100):this.$props.id}template(){return`
      <fieldset>
        <legend>중요도</legend>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="normal-${this.id}"
            value="보통"
            ${this.state.priority==="보통"?"checked":""}
          />
          <label for="normal-${this.id}">보통</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="important-${this.id}"
            value="중요"
            ${this.state.priority==="중요"?"checked":""}
          />
          <label for="important-${this.id}">중요</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority-${this.id}"
            id="very-important-${this.id}"
            value="매우 중요"
            ${this.state.priority==="매우 중요"?"checked":""}
          />
          <label for="very-important-${this.id}">매우 중요</label>
        </div>
      </fieldset>
    `}getValue(){const t=this.$target.querySelector(`input[name='priority-${this.id}']:checked`);return t?t.value:""}}class C extends a{setup(){this.memo=this.$props.memo}template(){return`
      <label for="memo">메모</label>
      <textarea name="memo" id="memo" maxlength="200">${this.memo}</textarea>
      <p><span class="count" id="memo-count">${this.memo.length}</span>/200</p>
    `}setEvent(){const t=this.$target.querySelector("textarea");t&&t.addEventListener("input",e=>{let{length:i}=e.target.value,o=this.$target.querySelector("#memo-count");o&&(o.textContent=i)})}getValue(){return this.$target.querySelector("textarea").value.trim()}}class I extends a{setup(){this.title=this.$props.title}template(){return`
          <label for="title">제목</label>
            <input type="text" name="title" id="title" maxlength="30" value="${this.title}"/>
          <div class="input-information">
            <p class="title-info">
            ${this.title.length>0?"":"텍스트를 입력하세요."}
            </p>          
            <p><span class="count" id="title-count">${this.title.length}</span>/30</p>
          </div>
`}setEvent(){const t=this.$target.querySelector("input[type=text]");t&&t.addEventListener("input",e=>{let{value:i}=e.target,o=this.$target.querySelector("#title-count"),s=this.$target.querySelector(".title-info");o.textContent=i.trim().length>0?i.length:0,s.textContent=i.trim().length>0?"":"텍스트를 입력하세요."})}getValue(){return this.$target.querySelector("input[type=text]").value.trim()}}class p extends a{setup(){this.$state=this.$props.todo?this.$props.todo[0]:this.initialState(),this.fixTodo=this.$props.fixTodo}initialState(){return{expiringDate:"",id:null,isFinish:!1,memo:"",priority:"보통",title:""}}template(){return`
            <form>
                <div class="form-content">
                <div class="titleInput"></div>
                <div class="memoInput"></div>
                <div class="dateInput"></div>
                <div class="importanceInput"></div>
                </div>
                <button class="fix-form">수정</button>
                <button class="submit-form">완료</button>
            </form>
    `}componentDidMount(){const{id:t,title:e,memo:i,expiringDate:o,priority:s}=this.$state,r=this.$target.querySelector(".titleInput");this.titleInput=new I(r,{title:e});const l=this.$target.querySelector(".memoInput");this.memoInput=new C(l,{memo:i});const v=this.$target.querySelector(".dateInput");this.dateInput=new b(v,{expiringDate:o});const f=this.$target.querySelector(".importanceInput");this.importanceCheckInput=new x(f,{priority:s,id:t}),this.$target.querySelector(".submit-form").addEventListener("click",c=>this.onSubmit(c)),this.$target.querySelector(".fix-form").addEventListener("click",c=>{this.onFix(c)})}formData(){const t=new Date().toISOString().split("T")[0];return{title:this.titleInput.getValue(),memo:this.memoInput.getValue(),validDate:this.$state.validDate?this.$state.validDate:t,expiringDate:this.dateInput.getValue(),priority:this.importanceCheckInput.getValue(),isFinish:this.$state.isFinish}}onSubmit(t){t.preventDefault();const{title:e,expiringDate:i}=this.formData();if(e.length>0&&i){const o=this.formData();this.$props.addTodo(o),this.setState(this.initialState())}}hasChanges(t){const{title:e,memo:i,expiringDate:o,priority:s}=this.$state;return t.title!==e||t.memo!==i||t.expiringDate!==o||t.priority!==s}onFix(t){t.preventDefault();const e=this.formData();if(this.hasChanges(e)){this.setState(e),this.$props.fixTodo(this.$state);const i=document.querySelector(".popup-container"),o=i.querySelector(".memo-popup");o&&(i.removeChild(o),i.classList.add("hide"))}}}class D extends a{setup(){this.$state={todoId:this.$props.todoId},this.onConfirm=this.$props.onConfirm,this.onCancel=this.$props.onCancel}template(){return`
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
    `}setEvent(){this.$target.addEventListener("click",t=>{const e=t.target,i=this.$state.todoId;e.classList.contains("confirm-delete")&&this.onConfirm(i),e.classList.contains("cancel-delete")&&this.onCancel()})}}const T=n=>{const{id:t,title:e,memo:i,validDate:o,expiringDate:s,priority:r,isFinish:l}=n;return`
        <div class="todo-card window" data-id="${t}">
          <div class="title-bar ${l?"inactive":""}">
            <div class="priority title-bar-text">${r}</div>
            <div class="title-bar-controls">
              <button class="finish" aria-label="Minimize"></button>
              <button class="open-memo" aria-label="Maximize"></button>
              <button class="delete-todo" aria-label="Close"></button>
            </div>
          </div>
          <div class="window-body">
            <div class="content-box">
              ${l?`<s class="todo-title">${e}</s>`:`<p class="todo-title">${e}</p>`}
              <p class="todo-memo">${i}</p>
            </div>
            <div class="status-bar">
              <p class="valid-date status-bar-field">${o}</p>
              <p class="expiring-date status-bar-field">${s}</p>
            </div>
          </div>
        </div>
    `},m=()=>`<div class="window memo-popup">
    <div class="title-bar">
      <div class="title-bar-text">할 일 작성</div>
      <div class="title-bar-controls">
        <button aria-label="Close" class="delete-memopopup"></button>
      </div>
    </div>
    <div class="window-body todoform-container">

    </div>
    </div>
`;class q extends a{setup(){this.$state={todos:[...this.$props.todos]}}template(){const{todos:t}=this.$state;return`
            ${t.map(e=>T(e)).join("")}
    `}setEvent(){this.$target.addEventListener("click",t=>{const e=t.target,i=e.closest(".todo-card");if(i){const{id:o}=i.dataset,s=parseInt(o),r=this.$state.todos.find(({id:l})=>l===s);e.classList.contains("finish")&&this.onUpdateIsFinish(s,{isFinish:!r.isFinish}),e.classList.contains("open-memo")&&this.openMemoPopup(s),e.classList.contains("delete-todo")&&this.openDeletePopup(s)}})}createPopup(){const t=document.querySelector(".popup-container");return t.classList.remove("hide"),t}removePopup(){document.querySelector(".popup-container").classList.add("hide")}onUpdate(t){const e=[...this.$state.todos].map(i=>i.id===t.id?t:i);this.setState({todos:e})}onUpdateIsFinish(t,e){const i={...this.$state.todos.find(o=>o.id===t),...e};this.onUpdate(i)}onDelete(t){const e=[...this.$state.todos].filter(i=>i.id!=t);this.setState({todos:e})}deleteTodo(t){this.onDelete(t),this.removePopup()}openDeletePopup(t){const e=this.createPopup();new D(e,{todoId:t,onConfirm:()=>this.deleteTodo(t),onCancel:()=>this.removePopup()})}fixTodo(t){const e=this.$state.todos.map(i=>i.id===t.id?{...i,...t}:i);this.setState({todos:e})}openMemoPopup(t){const e=this.createPopup();e.innerHTML=m();const i=e.querySelector(".todoform-container");e.addEventListener("click",o=>{const{target:s}=o,r=e.querySelector(".memo-popup");s.classList.contains("delete-memopopup")&&(r&&e.removeChild(r),this.removePopup())}),new p(i,{fixTodo:o=>this.fixTodo(o),todo:this.$state.todos.filter(o=>o.id==t)})}}class L extends a{constructor(){super(...arguments);d(this,"handleSortRecent",()=>{this.setState({currentSort:"최신순"}),this.$props.onSortRecent()});d(this,"handleSortPriority",()=>{this.setState({currentSort:"중요도"}),this.$props.onSortPriority()});d(this,"handleSortFinish",()=>{this.setState({currentSort:"임박"}),this.$props.onSortFinish()})}setup(){this.$state={currentSort:""}}template(){let{currentSort:e}=this.$state;const i=o=>e===o?"true":"false";return`
      <div class="sorting-inner">
        <button class="addTodoBtn">추가</button>
        <menu class="sorting-menu" role="tablist">
          <li id="recent"
            aria-selected=${i("최신순")}
          >
            <p>최신순</p>
          </li>
          <li id="priority"
            aria-selected=${i("중요도")}
          >
            <p>중요도</p>
          </li>
          <li id="upComming"
            aria-selected=${i("임박")}
          >
            <p>임박</p>
          </li>
        </menu>
      </div>
      <hr />
    `}componentDidMount(){document.querySelector(".addTodoBtn").addEventListener("click",()=>{this.$props.openMobilePopup(),document.querySelector(".popup-container").querySelector(".fix-form").style.display="none",document.querySelector(".popup-container").querySelector(".submit-form").style.display="block"}),this.setEvent()}setEvent(){document.querySelector(".sorting-menu").addEventListener("click",i=>{const o=i.target.closest("li");o&&(o.id.includes("recent")&&this.handleSortRecent(),o.id.includes("priority")&&this.handleSortPriority(),o.id.includes("upComming")&&this.handleSortFinish())})}}class w extends a{setup(){this.$state={todos:[]}}template(){return`
      <div class="container window">
        <div class="title-bar">
          <div class="title-bar-text"></div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body" style="margin: 0">
          <header></header>
          <div class="todo-container">
            <div class="todoform-container"></div>
            <div class="todolist-container">
                  <div class="sorting-container"></div>
                  <div class="todolist"></div>
              </div>
          </div>
        </div>
      </div>
      <div class="popup-container hide"></div>
    `}componentDidMount(){const t=document.querySelector("header");this.header=new S(t);const e=document.querySelector(".todoform-container");this.todoform=new p(e,{addTodo:s=>this.addTodo(s)});const i=document.querySelector(".sorting-container");this.sorting=new L(i,{onSortRecent:()=>this.onSortRecent(),onSortFinish:()=>this.onSortFinish(),onSortPriority:()=>this.onSortPriority(),openMobilePopup:()=>this.openMobilePopup()});const o=document.querySelector(".todolist");this.todoList=new q(o,{todos:this.$state.todos})}addTodo(t){const e=[...this.todoList.$state.todos,{...t,id:Date.now()}];this.setState({todos:e})}onSortRecent(){const t=[...this.todoList.$state.todos].sort((e,i)=>i.id-e.id);this.todoList.setState({todos:t})}onSortPriority(){const t={"매우 중요":1,중요:2,보통:3},e=[...this.todoList.$state.todos].sort((i,o)=>{const s=t[i.priority]-t[o.priority];return s===0?i.id-o.id:s});this.todoList.setState({todos:e})}onSortFinish(){const t=[...this.todoList.$state.todos].sort((e,i)=>{const o=new Date(e.expiringDate),s=new Date(i.expiringDate);return o<s?-1:o>s?1:e.id-i.id});this.todoList.setState({todos:t})}openMobilePopup(){const t=this.todoList.createPopup();t.innerHTML=m();const e=t.querySelector(".todoform-container");new p(e,{addTodo:i=>this.addTodo(i)})}}const P=document.querySelector("#app");new w(P);
