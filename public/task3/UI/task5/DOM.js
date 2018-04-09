if (!localStorage.getItem('User')) {
    localStorage.setItem('User', 'Guest');
}
var user = JSON.parse(localStorage.getItem('User'));
let modulSecond = (function () {

    let activatedUser = function (newUser) {
        if (typeof newUser !== null) {
            user = newUser;
            document.querySelector('.name').innerHTML = user;
            document.querySelector('.authorization').style.display = 'none';
            document.querySelector('.add-post').style.display = 'initial';
            document.querySelector('.exit-icon').style.display = 'initial';
            clearLenta();
            showMore(0, 10);
        }
        if (newUser === 'Guest') {
            user = 'Guest';
            document.querySelector('.name').innerHTML = user;
            document.querySelector('.authorization').style.display = 'initial';
            document.querySelector('.add-post').style.display = 'none';
            document.querySelector('.exit-icon').style.display = 'none';
            clearLenta();
            showMore(0, 10);
        }
    }

    let createTopPost = function (photoPost) {
        const top = document.createElement('div');
        top.className = 'top-post my-flex';
        const left = document.createElement('div');
        left.className = 'left';
        left.innerHTML = "<p>" + photoPost.author + "</p>";
        const date = document.createElement('div');
        date.className = 'date';
        date.innerHTML = "<p>" + new Date(photoPost.createdAt).getDate() + "."
            + (new Date(photoPost.createdAt).getMonth() + 1) + '.' + new Date(photoPost.createdAt).getFullYear()
            + "<br>" + "at " + new Date(photoPost.createdAt).getHours()
            + " hours " + new Date(photoPost.createdAt).getMinutes() + " minutes" + "</p>";
        const right = document.createElement('div');
        right.className = "right";
        right.innerHTML = "<p>" + "<strong>"
            + photoPost.hashTags.reduce((accum, element) => accum + ' ' + element)
            + "</strong>" + "</p>";
        top.append(left, date, right);
        return top;
    }
    let createMiddlePost = function (photoPost) {
        const Photo = document.createElement('div');
        Photo.className = 'Photo';
        const photo = document.createElement('img');
        photo.className = 'photo';
        photo.src = `${photoPost.photoLink}`;
        Photo.append(photo);
        return Photo;
    }
    let createBottomPost = function (photoPost) {
        const bottom = document.createElement('div');
        bottom.className = 'bottom-post my-flex';
        const buttoms = document.createElement('div');
        buttoms.className = 'buttoms my-flex';
        const like = document.createElement('img');
        like.className = 'like';
        if (photoPost.likes.includes(user)) {
            like.src = "images/red.png";
        } else {
            like.src = "images/black.png";
        }
        like.style.display = 'initial';
        like.setAttribute('onclick', `addLike(${photoPost.id})`);
        const edit = document.createElement('img');
        edit.className = 'edit';
        edit.src = "images/edit.svg";
        edit.setAttribute('onclick', `EditPostOrAddPost(${photoPost.id})`);
        const deletePost = document.createElement('img');
        deletePost.className = 'delete';
        deletePost.setAttribute('onclick', `activetedDeletePost(${photoPost.id})`);
        deletePost.src = "images/delete-sign.png";
        if (user !== null && user !== photoPost.author) {
            edit.style.display = 'none';
            deletePost.style.display = 'none';
        }
        if (user === 'Guest') {
            like.style.display = 'none';
            edit.style.display = 'none';
            deletePost.style.display = 'none';
        }
        const comment = document.createElement('div');
        comment.className = "comment";
        comment.innerHTML = "<p>" + "<strong>" + photoPost.description + "</strong>" + "</p>";
        buttoms.append(like, edit, deletePost);
        bottom.append(buttoms, comment);
        return bottom;
    }

    let createPhotoPost = function (photoPost) {
        const post = document.createElement('div');
        post.id = photoPost.id;
        post.className = 'post my-flex';
        let top = createTopPost(photoPost);
        let Photo = createMiddlePost(photoPost);
        let bottom = createBottomPost(photoPost);
        post.appendChild(top);
        post.appendChild(Photo);
        post.appendChild(bottom);
        return post;
    }

    let addPost = function (photoPost) {
        if (modulFirst.addPhotoPost(photoPost)) {
            localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
            let ind = photoPosts.findIndex((el) => { return el.id === photoPost.id });
            clearLenta();
            showMore(0, 10);
            return true;
        }
        if (photoPosts.length >= 10) { document.getElementsByClassName('load-more')[0].addEventListener('click', pagination); }
        else {
            lentaa.lastChild.remove();
        }
        return false;
    }
    let addPostInLenta = function (photoPost) {
        let ind = photoPosts.findIndex((el) => { return el.id === photoPost.id });
        if (modulFirst.getPhotoPost(photoPost.id) != false) {
            lentaa.insertBefore(createPhotoPost(photoPost), lentaa.children[ind]);
            return true;
        }
        return false;
    }

    let removePost = function (id) {
        if (modulFirst.removePhotoPost(id)) {
            lentaa.removeChild(document.getElementById(id));
            return true;
        }
        return false;
    }
    let clearLenta = function () {
        lentaa.innerHTML = '<button class="load-more">Load more</button>';
        document.getElementsByClassName('load-more')[0].addEventListener('click', pagination);
    }

    let showMore = function (skip, top, filterNickname, filterHashTags, filterDate) {
        skip = skip || 0;
        top = top || 10;
        const load_more = document.getElementsByClassName('load-more')[0];
        const arr = modulFirst.getPhotoPosts(skip, top, filterNickname, filterHashTags, filterDate);
        let ind = 0;
        arr.forEach(element => {
            ind = photoPosts.findIndex((el) => { return el.id === element.id });
            //lenta.insertBefore(createPhotoPost(element), lenta.children[ind]);
            lentaa.insertBefore(createPhotoPost(element), load_more);
        });
    }

    let editPhotoPost = function (id, photoPost) {
        if (modulFirst.editPhotoPost(id, photoPost)) {
            lentaa.replaceChild(createPhotoPost(modulFirst.getPhotoPost(id)), document.getElementById(id));
            return true;
        }
        return false;
    }
    let displayPhoto = function (form) {
        form.style.height = "auto";
        form.getElementsByClassName("background")[0].src = URL.createObjectURL(form.getElementsByTagName("input")[0].files[0]);
    }


    return {
        activatedUser,
        createPhotoPost,
        addPost,
        showMore,
        removePost,
        editPhotoPost,
        clearLenta,
        addPostInLenta,
        displayPhoto
    }

})();
modulSecond.activatedUser(user);



function pagination() {
    let arr = JSON.parse(localStorage.getItem('PhotoPosts'));
    let prevTop = 0;
    lentaa.lastChild.remove();
    for (let i = currentTop; i < Math.min(currentTop + 10, arr.length); i++) {
        modulSecond.addPostInLenta(arr[i]);
    }
    prevTop = currentTop;
    currentTop = Math.min(currentTop + 10, arr.length);
    if (currentTop < arr.length) {
        lentaa.innerHTML += `<button class="load-more">Load more</button>`;
        document.getElementsByClassName('load-more')[0].addEventListener('click', pagination);
    }
}
function exitClick() {
    modulSecond.activatedUser('Guest');
    document.getElementsByClassName("name")[0].innerHTML = 'Guest';
    localStorage.setItem("User", JSON.stringify(user));
    document.getElementsByClassName("authorization")[0].addEventListener('click', singIn);
}
