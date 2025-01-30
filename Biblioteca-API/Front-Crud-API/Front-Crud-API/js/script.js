const cardContainer = document.getElementById('cardContainer');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

let books = [];

// Carregar os livros do servidor
async function loadBooks() {
    try {
        const response = await fetch('http://localhost:8080/api/livros/listarLivros');
        books = await response.json();
        renderBooks();
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Renderizar os livros na tela
function renderBooks() {
    cardContainer.innerHTML = '';
    books.forEach((book) => {
        console.log(book);

        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = book.foto || 'https://via.placeholder.com/150';
        card.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = book.titulo;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Autor: ${book.autor}`;
        card.appendChild(author);

        const year = document.createElement('p');
        year.textContent = `Ano de Publicação: ${book.anoPublicacao}`;
        card.appendChild(year);

        const favorite = document.createElement('p');
        favorite.textContent = book.favorito ? '⭐ Favorito' : '';
        card.appendChild(favorite);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editBook(book);
        card.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteBook(book.id);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

// Adicionar um novo livro
async function addBook() {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('nameInput').value;
    const year = document.getElementById('yearInput').value;
    const favorite = document.getElementById('favoriteInput').checked;
    const image = document.getElementById('imageInput').value;

    if (title && author && year) {
        const newBook = {
            titulo: title,
            autor: author,
            anoPublicacao: parseInt(year),
            favorito: favorite,
            foto: image
        };

        try {
            const response = await fetch('http://localhost:8080/api/livros/cadastrarLivro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                loadBooks(); // Recarrega a lista de livros
                clearForm(); // Limpa o formulário
            } else {
                const errorData = await response.json(); // Captura a mensagem de erro do backend
                console.error('Erro ao cadastrar livro:', errorData);
                alert(`Erro ao cadastrar livro: ${errorData.message || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            alert('Erro ao conectar ao servidor. Tente novamente.');
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}
// Editar um livro existente
async function editBook(book) {
    document.getElementById('titleInput').value = book.titulo;
    document.getElementById('nameInput').value = book.autor;
    document.getElementById('yearInput').value = book.anoPublicacao;
    document.getElementById('favoriteInput').checked = book.favorito;
    document.getElementById('imageInput').value = book.imagem;

    // Substituir o botão de "Adicionar" por um de "Salvar"
    const addButton = document.querySelector('.form-container button');
    addButton.textContent = 'Salvar Alterações';
    addButton.onclick = () => saveEdit(book.id);
}

// Salvar as alterações de um livro
async function saveEdit(id) {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('nameInput').value;
    const year = document.getElementById('yearInput').value;
    const favorite = document.getElementById('favoriteInput').checked;
    const image = document.getElementById('imageInput').value;

    const updatedBook = {
        titulo: title,
        autor: author,
        anoPublicacao: year,
        favorito: favorite,
        foto: image
    };

    try {
        const response = await fetch(`http://localhost:8080/api/livros/atualizarLivro/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
            loadBooks();
            clearForm();
            const addButton = document.querySelector('.form-container button');
            addButton.textContent = 'Adicionar Livro';
            addButton.onclick = addBook;
        } else {
            console.error('Erro ao editar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao editar livro:', error);
    }
}

// Deletar um livro
async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/livros/deletarLivro/${id}`,{
            method: 'DELETE',
        });

        if (response.ok) {
            loadBooks();
        } else {
            console.error('Erro ao deletar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
    }
}

// Limpar o formulário após adicionar ou editar um livro
function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('yearInput').value = '';
    document.getElementById('favoriteInput').checked = false;
    document.getElementById('imageInput').value = '';
}

// Alternar entre tema claro e escuro
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Inicializar com os livros carregados
loadBooks();