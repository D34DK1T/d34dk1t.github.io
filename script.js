const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=b9f98b6393e5af877873aa7720d1822a&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка..';
    requestApi(server)
        .then(function (result) {
            const output = JSON.parse(result);

            let inner = '';

            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let ratingItem = item.vote_average;
                let dataItem = item.first_air_date || item.release_date || 'НЕИЗВЕСТНА';
                let imgItem = item.poster_path ? `http://image.tmdb.org/t/p/w500/${item.poster_path}` : 'http://via.placeholder.com/200x300/?text=НЕТ+ИЗОБРАЖЕНИЯ';

                inner += `
                    <div class="col-12 col-md-4 col-xl-3 text-center cards">
                        <div class="card mb-3">
                            <a href="https://www.themoviedb.org/${item.media_type}/${item.id}">
                            <img src="${imgItem}" class="card-img-top" alt="${nameItem}" title="${nameItem}">
                            <b>${nameItem}</b></a>
                            <div class="card-body">
                                <p class="card-text"><span class="badge badge-primary">Рейтинг: ${ratingItem}</span></p>
                                <p class="card-text text-primary">Дата выхода:<br/>${dataItem}</p>
                                <a href="https://www.themoviedb.org/${item.media_type}/${item.id}" class="btn btn-primary">Подробнее</a>
                             </div>
                        </div>
                    </div>`;
            });

            movie.innerHTML = inner;
        })
        .catch(function(reason){
            movie.innerHTML = 'Ошибка O_O';
            console.log('ERROR: ' + reason.status);
        });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }

            resolve(request.response);

        });

        request.addEventListener('error', function () {
            reject({
                status: request.status
            });
        });
        request.send();
    });
}

//     request.addEventListener('readystatechange', () => {
//         if (request.readyState !== 4) {
//             movie.innerHTML = 'Загрузка..';
//             return;
//         }

//         if (request.status !== 200) {
//             movie.innerHTML = 'Ошибка O_O';
//             return;
//         }
//         const output = JSON.parse(request.responseText);
//         console.log(output);
//         let inner = '';

//         output.results.forEach(function (item) {
//             let nameItem = item.name || item.title;
//             let firstairdate = item.first_air_date || item.release_date;

//             inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem} <br> Дата выхода: ${firstairdate}</div>`;
//         });

//         movie.innerHTML = inner;
//     });

// }