const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

searchForm.addEventListener('submit', function (event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=b9f98b6393e5af877873aa7720d1822a&language=ru&query=' + searchText;
    requestApi(server);
});

function requestApi(url){
    
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        console.log(output);
        let inner = '';

        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let firstairdate = item.first_air_date || item.release_date;

            inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem} <br> Дата выхода: ${firstairdate}</div>`;
        });
        
        movie.innerHTML = inner;
    });
}


