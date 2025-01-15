let products = [];

// Функция для загрузки товаров из базы данных
async function loadProducts() {
    try {
        const response = await fetch('/products');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке товаров');
        }
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

// Функция для отображения всех товаров
function displayProducts() {
    const productsList = document.getElementById("products-list");
    productsList.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Цена: ${product.price}₽</p>
            <p>Категория: ${product.category}</p>
            <button class="btn" onclick="deleteProduct(${product.id})">Удалить</button>
        `;
        productsList.appendChild(productDiv);
    });
}

// Функция для добавления нового товара
async function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const video = document.getElementById('product-video').value;
    const images = document.getElementById('product-images').value;
    const category = document.getElementById('product-category').value;
    const isRecommended = document.getElementById('is-recommended').checked;

    const newProduct = {
        name,
        price,
        video,
        images,
        category,
        isRecommended
    };

    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) {
            throw new Error('Ошибка при добавлении товара');
        }
        const addedProduct = await response.json();
        products.push(addedProduct);
        displayProducts();
        clearAdminPanel();
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error);
    }
}

// Функция для очистки админ-панели
function clearAdminPanel() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-video').value = '';
    document.getElementById('product-images').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('is-recommended').checked = false;
}

// Функция для удаления товара
async function deleteProduct(id) {
    try {
        const response = await fetch(`/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении товара');
        }
        products = products.filter(product => product.id !== id);
        displayProducts();
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
    }
}

// Инициализация отображения продуктов
loadProducts();
