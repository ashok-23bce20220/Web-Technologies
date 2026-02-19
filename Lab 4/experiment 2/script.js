const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");

let debounceTimer;

// Debouncing function
searchInput.addEventListener("input", function () {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            resultsDiv.innerHTML = "";
            return;
        }

        loading.style.display = "block";

        fetch("products.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then(data => {

                loading.style.display = "none";

                const filteredProducts = data.products.filter(product =>
                    product.name.toLowerCase().includes(query)
                );

                resultsDiv.innerHTML = "";

                if (filteredProducts.length === 0) {
                    resultsDiv.innerHTML = `<div class="no-results">No results found</div>`;
                    return;
                }

                filteredProducts.forEach(product => {
                    resultsDiv.innerHTML += `
                        <div class="product">
                            <strong>${product.name}</strong><br>
                            Price: ₹${product.price}<br>
                            Category: ${product.category}
                        </div>
                    `;
                });
            })
            .catch(error => {
                loading.style.display = "none";
                resultsDiv.innerHTML = `<div class="error">${error.message}</div>`;
            });

    }, 500); // 500ms debounce delay
});
