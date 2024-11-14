let index = 0; 
let clickCount = 0;

async function fetchBooks() {
    const activeCategory = 'Architecture';
    const apiKey =  'AIzaSyBvIkBdsUeNawHJ0LhZqI4T3PSlU65iu4g';
    const url = ` https://www.googleapis.com/books/v1/volumes?q="subject:${activeCategory}"&key=${apiKey}&printType=books&startIndex=${index}&maxResults=6&langRestrict=en`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        displayBooks(data.items);
    } catch (error) {
        console.error(error);
        document.getElementById('books-container').innerText = 'Ошибка загрузки данных';
    }
}
function generateStarRating(reiting) {
    const fullStar = '<svg class="star full" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C" /></svg>';
    const emptyStar = '<svg class="star empty" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" /></svg>';
    let stars = '';

    for (let i = 0; i < 5; i++) {
        if (i < reiting) {
            stars += fullStar; 
        } else {
            stars += emptyStar;
        }
    }

    return stars;
}


function displayBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; 

    if (!books || books.length === 0) {
        container.innerText = 'Нет доступных книг.';
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = book.volumeInfo.title || 'Без названия';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Автор неизвестен';
        const reiting = book.volumeInfo.averageRating || 0;
        const discription = book.volumeInfo.description || 'Описание отсутствует';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
        const starRating = generateStarRating(Math.round(reiting));
        bookDiv.innerHTML = 
            `<img class="book_img" src="${thumbnail}" alt="${title}"> <div><p class="book_author">${authors}</p><h3 class="book_title">${title}</h3><div class="book_rating">${starRating}</div><p class="book_discription">${discription}</p><button class="book_btn">Buy now</button></div> `;

        container.appendChild(bookDiv);

        const btn_buy_now = bookDiv.querySelector('.book_btn');
        btn_buy_now.addEventListener("click", () => {
            clickCount++;
            updateClickCount();
        });

    });
    const spanDiv = document.createElement('div');
    spanDiv.innerHTML = `<span class="click_count" style="display: none;">${clickCount}</span>`;
    container.appendChild(spanDiv);
}

function updateClickCount() {
    const clickCountDisplay = document.querySelector('.click_count');
    const bange = document.querySelector(".bange_btn");
    if (clickCountDisplay) {
        clickCountDisplay.innerText = ` ${clickCount}`;
        bange.style.display = 'block';
        clickCountDisplay.style.display ='block';
    }
}


const btn_loadmore = document.querySelector(".btn_btn");
btn_loadmore.addEventListener('click',()=>{
    index += 6;
    fetchBooks();
})

fetchBooks();
