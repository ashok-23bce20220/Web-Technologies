const tableBody = document.getElementById("productTable");
const messageDiv = document.getElementById("message");
const totalValueSpan = document.getElementById("totalValue");
const form = document.getElementById("productForm");

let products = [];

// LOAD PRODUCTS
function loadProducts() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) throw new Error("Server Error (500)");
            return response.json();
        })
        .then(data => {
            if (!data.products) throw new Error("Invalid JSON Structure");
            products = data.products;
            displayProducts();
            showMessage("Inventory Loaded Successfully", "success");
        })
        .catch(error => showMessage(error.message, "error"));
}

// DISPLAY PRODUCTS
function displayProducts(filtered = products) {

    tableBody.innerHTML = "";

    let totalValue = 0;

    if (filtered.length === 0) {
        showMessage("No Products Found", "error");
        totalValueSpan.textContent = 0;
        return;
    }

    filtered.forEach((product, index) => {

        const productValue = product.price * product.stock;
        totalValue += productValue;

        const lowStockClass = product.stock <= 5 ? "low-stock" : "";

        tableBody.innerHTML += `
            <tr class="${lowStockClass}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.stock <= 5 ? "Low Stock ⚠" : "In Stock"}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    totalValueSpan.textContent = totalValue;
}

// ADD PRODUCT
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = getValue("id");
    const name = getValue("name");
    const category = getValue("category");
    const price = Number(getValue("price"));
    const stock = Number(getValue("stock"));

    if (!id || !name || !category || price < 0 || stock < 0) {
        showMessage("Invalid Input Data", "error");
        return;
    }

    if (products.some(p => p.id === id)) {
        showMessage("Product ID Already Exists", "error");
        return;
    }

    products.push({ id, name, category, price, stock });

    displayProducts();
    showMessage("Product Added Successfully", "success");

    form.reset();
});

// EDIT PRODUCT
function editProduct(index) {

    const newPrice = prompt("Enter new price:");
    const newStock = prompt("Enter new stock quantity:");

    if (newPrice && !isNaN(newPrice) && newPrice >= 0)
        products[index].price = Number(newPrice);

    if (newStock && !isNaN(newStock) && newStock >= 0)
        products[index].stock = Number(newStock);

    displayProducts();
    showMessage("Product Updated Successfully", "success");
}

// DELETE PRODUCT
function deleteProduct(index) {

    if (!products[index]) {
        showMessage("Product Not Found (404)", "error");
        return;
    }

    products.splice(index, 1);
    displayProducts();
    showMessage("Product Deleted Successfully", "success");
}

// SEARCH BY CATEGORY
function searchProduct() {

    const searchValue = document.getElementById("searchCategory").value.trim().toLowerCase();

    if (!searchValue) {
        showMessage("Enter Category to Search", "error");
        return;
    }

    const filtered = products.filter(p =>
        p.category.toLowerCase().includes(searchValue)
    );

    displayProducts(filtered);
}

// HELPER
function getValue(id) {
    return document.getElementById(id).value.trim();
}

function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// LOAD ON START
loadProducts();
