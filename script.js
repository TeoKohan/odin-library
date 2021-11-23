function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

let frog = new Book('The frog prince and the mysterious ring', 'Armand Timotheus', 32, true);
let owl = new Book('The white owl', 'Frank', 243, false);
let bear = new Book('Bearhug', 'Martha', 143, false);
let fox = new Book('Between two brows', 'Timothy', 1043, true);

let books = [frog, owl, bear, fox];
let library = [];

const card_container = document.querySelector('.cards');
const counter_books = document.querySelector('.counters .books');
const counter_pages = document.querySelector('.counters .pages');
const counter_read = document.querySelector('.counters .read');

function Card(B, I) {
    let card = document.createElement('div');
    card.classList.add('card');
    let header = document.createElement('header');
    let title = document.createElement('div');
    title.classList.add('title');
    title.textContent = B.title;
    let close = document.createElement('button');
    close.classList.add('close');
    close.textContent = '✕';
    let image = document.createElement('div');
    image.classList.add('img');
    let list = document.createElement('ul');
    let i1 = document.createElement('li');
    i1.classList.add('author');
    let i2 = document.createElement('li');
    i2.classList.add('pages');
    let i3 = document.createElement('li');
    i2.classList.add('read');

    let author_label = document.createElement('label');
    author_label.textContent = 'author'
    let pages_label = document.createElement('label');
    pages_label.textContent = 'pages'
    let read_label = document.createElement('label');
    read_label.textContent = 'read'

    let author_value = document.createElement('label');
    author_value.textContent = B.author;
    let pages_value = document.createElement('label');
    pages_value.textContent = B.pages;
    let slider_block = document.createElement('switch');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = B.read;
    let slider = document.createElement('span');
    slider.classList.add('slider');

    slider_block.appendChild(checkbox);
    slider_block.appendChild(slider);

    i1.appendChild(author_label);
    i1.appendChild(author_value);

    i2.appendChild(pages_label);
    i2.appendChild(pages_value);

    i3.appendChild(read_label);
    i3.appendChild(slider_block);

    list.appendChild(i1);
    list.appendChild(i2);
    list.appendChild(i3);

    header.appendChild(title);
    header.appendChild(close);

    card.appendChild(header);
    card.appendChild(image);
    card.appendChild(list);

    return card;
}

function update() {
    counter_books.textContent = library.length;
    counter_pages.textContent = library.reduce((pages, book) => pages + (book.read ? book.pages : 0), 0);
    counter_read.textContent  = library.reduce((pages, book) => pages + (book.read ? 1 : 0), 0);
}

function toggle_read(b) {
    b.read = !b.read;
    update();
}

function remove(b, c) {
    card_container.removeChild(c);
    library = library.filter(book => book !== b);
    update();
}

function add_card(book) {
    if (library.filter(b => b.title == book.title).length > 0)
        return alert('Can\'t add duplicate book!');
    let card = Card(book);
    card_container.appendChild(card);
    let close = card.querySelector('.close');
    let read  = card.querySelector('input');
    library.push(book);
    close.addEventListener('click', e => remove(book, card));
    read.addEventListener('click',  e => toggle_read(book));
    update();
    return true;
}

const modal = document.querySelector('.modal');
const add_book = document.querySelector('#add');

add_book.addEventListener('click', () => modal.style.display = 'flex');
window.addEventListener('click', (e) => {
    if (e.target == modal)
        modal.style.display = "none";
});

function showMessage(input, message, type) {
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;

	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function has_value(input, message) {
	if (input.value.trim() === "")
        return showError(input, message);
    return showSuccess(input);
}

function has_number(input, message) {
    if (Number(input.value.trim()) !== NaN && Number(input.value.trim()) <= 0)
        return showError(input, message);
    return showSuccess(input);
}

const form = document.getElementById('newbook');

form.addEventListener('submit', (e) => {
    
    console.log(form);

    let title = form.elements['title'];
    let author = form.elements['author'];
    let pages = form.elements['pages'];

    console.log(title.value, author.value, pages.value, form.elements['read'].value);

    let title_valid  = has_value(title, 'insert non empty author');
    let author_valid  = has_value(author, 'insert non empty author');
    let pages_valid  = has_number(pages, 'insert a valid number (n > 0)');

	if (title_valid && author_valid && pages_valid) {
        B = new Book(title.value, author.value, Number(pages.value), form.elements['read'].value);
		if (add_card(B) !== undefined) {
            title.value = '';
            author.value = '';
            pages.value = '';
            form.elements['read'].value = false;
        }
    }
    else
    document.gete
        e.preventDefault();    
});
books.forEach(book => add_card(book));