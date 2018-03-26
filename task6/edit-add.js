var edit_add = document.createElement('div');
edit_add.className = 'post-edit my-flex';
var index = 1000;

function EditPostOrAddPost(e) {
    index = e.target.id;
    edit_add.innerHTML = `<div class="top-edit  my-flex ">
    <textarea type="text" id="tag" class="tags" placeholder="Enter the #hashtag..."></textarea>
</div>
<div class="Photo-edit">
    <img class="photo-edit" src="images/comedy.jpg">
</div>
<div class="comment-edit my-flex">
    <textarea type="text" id="des" class="description" placeholder="Enter the comment..."></textarea>
    <button class="save-post">Save</button>
    </button>
</div>`;
    document.querySelector("header").innerHTML = `<div class="header my-flex">
        <a class="logo my-flex">
            <buttom>
                <img class="return-lenta" src="images/return.jpg" title="Lenta">
            </buttom>
        </a>
        <a class="nickname my-flex">
            <p class="name"></p>
        </a>
    </div>`;
    document.getElementsByClassName("name")[0].innerHTML = user;
    document.querySelector("footer").innerHTML = "";
    main.removeChild(lentaa);
    main.removeChild(filter);
    main.appendChild(edit_add);
    document.getElementsByClassName("return-lenta")[0].addEventListener('click', returnFromEditAdd);
    document.getElementsByClassName("save-post")[0].addEventListener('click', editPostAndSave);
}

function returnFromEditAdd() {
    document.querySelector("header").innerHTML = `<div class="header my-flex">
        <a class="logo my-flex">
            <buttom>
                <img class="authorization" src="images/logo.png" title="Authorization">
            </buttom>
        </a>
        <a class="nickname my-flex">
            <p class="name"></p>
        </a>
        <div class="center my-flex"></div>
        <button class="add-post">Add post</button>
        <a class="exit my-flex">
            <buttom>
                <img class="exit-icon" src="images/exit.png" onclick="exitClick()" title="Exit">
            </buttom>
        </a>
    </div>`;
    document.querySelector("footer").innerHTML = `<footer>
    <div class="footer my-flex">
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
    </div>
</footer>`;
    main.removeChild(edit_add);
    main.appendChild(lentaa);
    main.appendChild(filter);
    document.getElementsByClassName("name")[0].innerHTML = user;
}
