    var modal = document.getElementById('emergente');

    window.onload = function() {
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    };
 
document.addEventListener('DOMContentLoaded', function() {
    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            const container = document.getElementById('cards-container');
            
            books.forEach((book, index) => {
                const card = document.createElement('div');
                card.className = 'card mb-3';
                card.style.maxWidth = '540px';
                card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${book.imagen}" class="img-fluid rounded-start" alt="${book.titulo}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.titulo}</h5>
                                <p class="card-text">${book.descripcion}</p>
                                <p class="card-text"><small class="text-body-secondary">Saga: ${book.saga} | Precio: $${book.precio}</small></p>
                                <button type="button" class="btn btn-primary ver-mas-btn" data-index="${index}">Ver Más</button>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

            // Agrega el evento click a todos los botones "Ver Más"
            document.querySelectorAll('.ver-mas-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    window.location.href = `details.html?index=${index}`;
                });
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});
