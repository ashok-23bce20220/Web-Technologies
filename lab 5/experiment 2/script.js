const tableBody = document.getElementById("bookTable");
const messageDiv = document.getElementById("message");
const form = document.getElementById("bookForm");

let xmlDoc;

// LOAD XML USING AJAX
function loadBooks() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {

        if (xhr.status === 200) {

            xmlDoc = xhr.responseXML;

            if (!xmlDoc || !xmlDoc.getElementsByTagName("book")) {
                showMessage("Malformed or Empty XML", "error");
                return;
            }

            displayBooks();
            showMessage("Books Loaded Successfully (200 OK)", "success");

        } else {
            showMessage("Error Loading XML (Status: " + xhr.status + ")", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error", "error");
    };

    xhr.send();
}

// DISPLAY BOOKS
function displayBooks() {

    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No Books Available", "error");
        return;
    }

    for (let i = 0; i < books.length; i++) {

        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td>
                    <button onclick="updateBook(${i})">Toggle Status</button>
                    <button onclick="deleteBook(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

// ADD BOOK (CREATE)
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = bookId.value.trim();
    const titleVal = title.value.trim();
    const authorVal = author.value.trim();
    const statusVal = status.value;

    // Validation
    if (!id || !titleVal || !authorVal) {
        showMessage("All fields are required!", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    // Check duplicate ID
    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", "error");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    newBook.appendChild(createNode("id", id));
    newBook.appendChild(createNode("title", titleVal));
    newBook.appendChild(createNode("author", authorVal));
    newBook.appendChild(createNode("status", statusVal));

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);

    displayBooks();
    showMessage("Book Added Successfully", "success");
    form.reset();
});

// UPDATE STATUS
function updateBook(index) {

    const books = xmlDoc.getElementsByTagName("book");
    const statusNode = books[index].getElementsByTagName("status")[0];

    statusNode.textContent =
        statusNode.textContent === "Available" ? "Issued" : "Available";

    displayBooks();
    showMessage("Book Status Updated", "success");
}

// DELETE BOOK
function deleteBook(index) {

    const books = xmlDoc.getElementsByTagName("book");

    books[index].parentNode.removeChild(books[index]);

    displayBooks();
    showMessage("Book Deleted Successfully", "success");
}

// Helper Function
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.appendChild(xmlDoc.createTextNode(value));
    return node;
}

// Message Display
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Load on page start
loadBooks();
