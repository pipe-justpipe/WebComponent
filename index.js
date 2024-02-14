// // ====================== Todo list items ==================

class TodoList extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
    <link rel="stylesheet" href="style.css">

      <div class="checkbox-container">
        <input type="checkbox" class="checkbox">
        <span class="custom-checkbox"></span>
        <span class="title text"></span>
      </div>
    `;
    this.checkbox = wrapper.querySelector(".checkbox");
    this.customCheckbox = wrapper.querySelector(".custom-checkbox");
    this.titleSpan = wrapper.querySelector(".title");

    shadow.appendChild(wrapper);

    this.checkbox.addEventListener("change", () => {this.toggleCheckbox()});
  }

  connectedCallback() {
    this.titleSpan.textContent = this.getAttribute("title") || "";
  }

  toggleCheckbox() {
    if (this.checkbox.checked) {
      this.checkbox.parentElement.classList.add("checked");
      this.customCheckbox.classList.add("checked");
    } else {
      this.checkbox.parentElement.classList.remove("checked");
      this.customCheckbox.classList.remove("checked");
    }
  }
}

customElements.define("todo-list", TodoList);







// =============== Arrow and Back to lists ===============

class ArrowBack extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
    <style>
    .arrow-back-container{
      color: #B3B3EF;
    }
    </style>
        <div class="arrow-back-container">
    <span style="font-size:30px; align-self: center;">&larr;</span>
    <span>Back to lists</span>
        </div>
      `;

    shadow.appendChild(wrapper);
  }

}

customElements.define("arrow-back", ArrowBack);





// ==================== Horizontal rule and sub heading =======================

class HrSub extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.innerHTML = `
    <link rel="stylesheet" href="style.css">
      <div class="hr_subheading">
        <span class="text pull" >Pull from recurring lists</span>
      </div>
    `;

    shadow.appendChild(container);
  }
}

customElements.define("sub-heading", HrSub);





// ========================== Header (TODAY AND PLUS SIGN) =========================

class CustomHeader extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.className = "header-container";
    container.innerHTML = `
    <link rel="stylesheet" href="style.css">

   <div class="head">
   <h1 class="text">TODAY</h1>
   <span class="plus">+</span>
   </div>
      <div class="input-container">
        <input type="text" id="todoInput" placeholder="Enter todo">
        <button id="addTodo">Add</button>
      </div>
    `;

    const plusSign = container.querySelector('.plus');
    plusSign.addEventListener('click', () => this.showInput());

    // I am storing the input element for later use
    this.inputElement = container.querySelector('#todoInput');

    const addTodoButton = container.querySelector('#addTodo');
    addTodoButton.addEventListener('click', () => this.addTodo());

    shadow.appendChild(container);
  }

  showInput() {
    const inputContainer = this.shadowRoot.querySelector('.input-container');
    inputContainer.style.display = 'flex';
  }

  addTodo() {
    const todoTitle = this.inputElement.value.trim();
    console.log(todoTitle, typeof todoTitle);

    if (todoTitle !== '') {
      const todoList = document.createElement('todo-list');
      todoList.setAttribute("title", todoTitle);

      document.getElementById('list').appendChild(todoList);

      this.inputElement.value = '';
      const inputContainer = this.shadowRoot.querySelector('.input-container');
      inputContainer.style.display = 'none';
    } else {
      console.log('Todo title is empty. Please enter a title.');
    }
  }
}

customElements.define("custom-header", CustomHeader);



// ===================== Colorful Buttons ====================

class CustomButton extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.textContent = this.getAttribute("text");
    button.style.backgroundColor = this.getAttribute("color");
    button.style.border="none";
    button.style.padding="10px 20px";
    button.style.borderRadius="20px";
    button.style.cursor="pointer";
    button.style.width="100px";
    button.style.color="gray";
    button.style.fontSize="16px";

    shadow.appendChild(button);
  }
}

customElements.define("custom-button", CustomButton);

class CustomRangeSlider extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });


    const template = document.createElement('template');
    template.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="slider-container">
        <div class="bar">
          <div class="fill"></div>
        </div>
        <input type="range" id="slider" class="slider" min="0" max="100" value="33">
        <span style="display:flex; justify-content:center; align-items:center; margin:20px 0 0 0; color:#B3B3EF;">33% complete</span>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    this.$slider = shadow.getElementById('slider');
    this.$fill = shadow.querySelector('.bar .fill');

    this.$slider.addEventListener('input', this.setBar.bind(this));

    this.setBar();
  }

  setBar() {
    this.$fill.style.width = this.$slider.value + "%";
  }
}

customElements.define('custom-range-slider', CustomRangeSlider);










