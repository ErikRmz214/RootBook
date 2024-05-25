document.addEventListener('DOMContentLoaded', function() {
    // Obtiene los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productIndex = urlParams.get('index');

    // Verifica si hay un índice de producto válido
    if (productIndex !== null) {
        fetch('books.json')
            .then(response => response.json())
            .then(books => {
                const book = books[productIndex];
                if (book) {
                    // Muestra los detalles del libro
                    const detailsContainer = document.getElementById('product-details');
                    detailsContainer.innerHTML = `
                        <div class="card">
                            <img src="${book.imagen}" class="card-img-top" alt="${book.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${book.titulo}</h5>
                                <p class="card-text">${book.descripcion}</p>
                                <p class="card-text"><small class="text-muted">Saga: ${book.saga}</small></p>
                                <p class="card-text">Precio: $${book.precio}</p>
                                <button type="button" class="btn btn-success">
                                <i class="bi bi-cash-coin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                                </svg>
                                </i>
                                Comprar</button>

                                <button type="button" class="btn btn-warning" id="add-to-cart-btn">
                                <i class="bi bi-cart-plus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg>
                                </i>
                                Agregar a carrito</button>

                                <a class="nav-link" href="index.html"><button type="button" class="btn btn-secondary">Atras</button></a>
                            </div>
                        </div>
                    `;

                    // Añadir el event listener al botón "Agregar a carrito"
                    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
                        addToCart(book);
                    });
                } else {
                    detailsContainer.innerHTML = '<p>Producto no encontrado.</p>';
                }
            })
            .catch(error => console.error('Error fetching book details:', error));
    } else {
        document.getElementById('product-details').innerHTML = '<p>No se ha seleccionado ningún producto.</p>';
    }
});

function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('El producto ha sido agregado al carrito.');
}
