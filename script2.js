// Tabs
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  views.forEach(v => v.classList.add('hidden'));
  document.getElementById(tab.dataset.tab).classList.remove('hidden');
}));

// Gallery
const demoGallery = [
  { title: 'Kyoto Temples', url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800', },
  { title: 'Andaman and Nicobar Islands', url: 'https://s7ap1.scene7.com/is/image/incredibleindia/Adventure-Sports-in-and-around-Port-Blair1-popular?qlt=82&ts=1727012297582', },
  { title: 'Banff National Park', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800', },
];
const galleryGrid = document.getElementById('galleryGrid');
galleryGrid.innerHTML = demoGallery.map(g => `
  <div class="card">
    <img src="${g.url}" alt="${g.title}">
    <div class="card-content">
      <span>${g.title}</span>
      <button class="btn" onclick="addTodoFromGallery('${g.title}')">Wish</button>
    </div>
  </div>`).join('');

// Wishlist / To-Do
let todos = [];
const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

function renderTodos() {
  todoList.innerHTML = todos.map((t, i) => `
    <div class="todo-item">
      <div>
        <strong>${t.name}</strong><br>
        <small>${t.priority} Priority ${t.due ? ' | ' + t.due : ''}</small>
      </div>
      <button class="btn" onclick="removeTodo(${i})">Remove</button>
    </div>`).join('');
}
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  todos.push({
    name: document.getElementById('tName').value,
    priority: document.getElementById('tPriority').value,
    due: document.getElementById('tDue').value,
  });
  todoForm.reset();
  renderTodos();
});
function addTodoFromGallery(name) {
  todos.push({ name, priority: 'Medium', due: '' });
  renderTodos();
}
function removeTodo(i) {
  todos.splice(i, 1);
  renderTodos();
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const phoneInput = document.getElementById('cPhone');
const phoneError = document.getElementById('phoneError');

let contacts = [];

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  if(!phoneInput.checkValidity()) {
    phoneError.classList.remove('hidden');
    return;
  } else {
    phoneError.classList.add('hidden');
  }
  contacts.push({
    name: cName.value,
    email: cEmail.value,
    phone: cPhone.value,
    message: cMsg.value
  });
  contactForm.reset();
  renderContacts();
});

function renderContacts() {
  contactList.innerHTML = contacts.map(c => `
    <div class="card" style="padding:0.8rem">
      <strong>${c.name}</strong> | ${c.email} | ${c.phone}<br>
      <p>${c.message}</p>
    </div>`).join('');
}
