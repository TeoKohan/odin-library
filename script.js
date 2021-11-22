function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

let frog = new Book('The frog prince', 'Armand', 32, true);
let owl = new Book('The white owl', 'Frank', 243, false);
let bear = new Book('Bearhug', 'Martha', 143, false);
let fox = new Book('Between two brows', 'Timothy', 1043, true);

let library = [frog, owl, bear, fox];