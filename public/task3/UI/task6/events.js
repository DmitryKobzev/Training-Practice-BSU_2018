var currentTop = 10;

function addFilter() {
    filterNickname.nickname = document.getElementsByClassName('filter-by-name')[0].value;
    filterHashTags.hashTags = document.getElementsByClassName('filter-by-hashtag')[0].value.split(' ').slice();
    filterDate.fromDate = new Date(document.getElementsByClassName('filter-From-date')[0].value);
    filterDate.toDate = new Date(document.getElementsByClassName('filter-To-date')[0].value);
    photoPosts = JSON.parse(localStorage.getItem("PhotoPosts"));
    for (let i = 0; i < photoPosts.length; i++) {
        photoPosts[i].createdAt = new Date(photoPosts[i].createdAt);
    }
    if (document.getElementsByClassName('filter-by-hashtag')[0].value == "") {
        filterHashTags = {};
    }
    if (document.getElementsByClassName('filter-by-name')[0].value == "") {
        filterNickname = {};
    }
    if (document.getElementsByClassName('filter-From-date')[0].value == "" && document.getElementsByClassName('filter-To-date')[0].value == "") {
        filterDate = {};
    }
    modulSecond.clearLenta();
    modulSecond.showMore(0, 10, filterNickname, filterHashTags, filterDate);
}
//document.getElementsByClassName("filtering")[0].addEventListener('click', addFilter);

function addLike(id) {
    let post = modulFirst.getPhotoPost(id.toString());
    let index = 2;
    for (var i = photoPosts.length - 1; i >= 0; i--) {
        if (photoPosts[i].id == id) {
            index = i;
        }
    }
    if (!post.likes.includes(user)) {
        post.likes.push(user);
        for (var i = photoPosts.length - 1; i >= 0; i--) {
            if (photoPosts[i].id == id) {
                photoPosts[i] = post;
            }
        }
        document.getElementsByClassName('like')[index].src = "images/red.png";
    } else {
        for (var i = post.likes.length - 1; i >= 0; i--) {
            if (post.likes[i] === user)
                post.likes.splice(post.likes.indexOf(user), 1);
        }
        document.getElementsByClassName('like')[index].src = "images/black.png";
    }
    localStorage.removeItem('PhotoPosts');
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}

function activetedDeletePost(id) {
    modulSecond.removePost(id.toString());
    let locPosts = localStorage.getItem('PhotoPosts');
    for (var i = locPosts.length - 1; i >= 0; i--) {
        if (locPosts[i].id === id)
            delete locPosts[i];
    }
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}

function editPostAndSave(id) {
    let index = -1;
    for (var i = photoPosts.length - 1; i >= 0; i--) {
        if (photoPosts[i].id === id.toString()) {
            index = i;
        }
    }

    let descriptionBuff = photoPosts[index].description;
    if (document.getElementById("des").value !== "") {
        descriptionBuff = document.getElementById("des").value;
    }
    let hashTagsBuff = photoPosts[index].hashTags;
    if (document.getElementById("tag").value !== "") {
        hashTagsBuff = document.getElementById("tag").value.split(' ').slice();
    }
    main.appendChild(lentaa);
    modulSecond.editPhotoPost(`${id}`, { description: descriptionBuff, photoLink: 'images/' + document.getElementById("dropBox").files[0].name, hashTags: hashTagsBuff });
    main.removeChild(lentaa);
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}

function btn_add() {

    let descriptionBuff;
    if (document.getElementById("des").value !== "") {
        descriptionBuff = document.getElementById("des").value;
    }
    let hashTagsBuff
    if (document.getElementById("tag").value.split(' ').slice().length != 0) {
        hashTagsBuff = document.getElementById("tag").value.split(' ').slice();
    }
    modulFirst.addPhotoPost({ id: `${photoPosts.length + 1}`, description: descriptionBuff, createdAt: new Date(), author: `${user}`, photoLink: 'images/' + document.getElementById("dropBox").files[0].name, hashTags: hashTagsBuff, likes: [] });
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}

