// function getElFromHTML(str) {
//     const div = document.createElement('div');
//     div.innerHTML = str;
//     return div.firstChild;
// }

const showMainPage = () => {
    const header = `<header class="header my-flex">
        <a href="" class="logo my-flex">
            <img class="authorization" src="images/logo.png" title="Authorization">
        </a>
        <a class="nickname my-flex">
            <p class="name">_dimakobzev</p>
        </a>
        <div class="center my-flex"></div>
        <button class="add-post">Add post</button>
        <a href="" class="exit my-flex">
            <img class="exit-icon" src="images/exit.png" title="Exit">
        </a>
    </header>`;
    const content = `<div class="lenta my-flex">

    <button class="load-more" onClick="window.modulSecond.showMore()">Load more</button>
    </div>


    <div class="filter my-flex">
        <p>
            <strong>
                <ins>Filters:</strong>
            </ins>
        </p>
        <input type="text" class="filter-by-name" placeholder="Enter the name" list ="users">
        <datalist id="users">
            <option>Dima</option>
            <option>Maria</option>
            <option>DIMA</option>
            <option>Urgant</option>
        </datalist>
        <input type="text" class="filter-by-hashtag" placeholder="Enter the #hashtag" list="tags">
        <datalist id="tags">
            <option>#tag1</option>
            <option>#tag2</option>
        </datalist>
        <input type="date" class="filter-by-date my-flex">
        <input type="date" class="filter-by-date my-flex">

    </div>`
    const footer = `<footer class="footer my-flex">
        <div class="univer">
            <p>BSU,2 course,5 group</p>
        </div>
        <div class="portal-date">
            <p>
                <strong>Blick Boom
                    <br> February 16,2018
                </strong>
            </p>
        </div>
        <div class="information">
            Dmitry Kobzev
            <br> dmitriykobzev99@gmail.com

        </div>
    </footer>`;
    document.querySelector('body').innerHTML = header + content + footer;
}

// const body = document.getElementById("body");
// let header = `<header class="header my-flex">
// <a href="" class="logo my-flex">
//     <img class="authorization" src="images/logo.png" title="Authorization">
// </a>
// <a class="nickname my-flex">
//     <p class="name">_dimakobzev</p>
// </a>
// <div class="center my-flex"></div>
// <button class="add-post">Add post</button>
// <a href="" class="exit my-flex">
//     <img class="exit-icon" src="images/exit.png" title="Exit">
// </a>
// </header>`
// body.insertBefore(getElFromHTML(header), body.firstChild);