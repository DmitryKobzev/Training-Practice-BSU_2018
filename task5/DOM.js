var user = null;

let modulSecond = (function () {
    const lenta = document.querySelector('.lenta');
    const nickname = document.querySelector('.name');
    const add_Post = document.querySelector('.add-post');
    const exit = document.querySelector('.exit-icon');
    const authorization = document.querySelector('.authorization');

    let activatedUser = function (newUser) {
        if (typeof newUser !== null) {
            user = newUser;
            nickname.innerHTML = user;
            authorization.style.display = 'none';
            add_Post.style.display = 'initial';
            exit.style.display = 'initial';
            clearLenta();
            showMore(0, 10);
        }
        if (newUser === 'Guest') {
            user = 'Guest';
            nickname.innerHTML = user;
            document.querySelector('.exit-icon').remove();
            document.querySelector('.add-post').remove();
            authorization.style.display = 'initial';
            add_Post.style.display = 'none';
            exit.style.display = 'none';
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
        date.innerHTML = "<p>" + photoPost.createdAt.getDate() + "."
            + photoPost.createdAt.getMonth() + '.' + photoPost.createdAt.getFullYear()
            + "<br>" + "at " + photoPost.createdAt.getHours()
            + " hours " + photoPost.createdAt.getMinutes() + " minutes" + "</p>";
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
        photo.src = 'images/comedy.jpg';
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
        like.src = "images/black.png";
        like.style.display = 'initial';
        const edit = document.createElement('img');
        edit.className = 'edit';
        edit.id = photoPost.id;
        edit.src = "images/edit.svg";
        const deletePost = document.createElement('img');
        deletePost.className = 'delete';
        deletePost.id = photoPost.id;
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
            let ind = photoPosts.findIndex((el) => { return el.id === photoPost.id })
            lenta.insertBefore(createPhotoPost(photoPost), lenta.children[ind]);
            return true;
        }
        return false;
    }

    let removePost = function (id) {
        if (modulFirst.removePhotoPost(id)) {
            lenta.removeChild(document.getElementById(id));
            return true;
        }
        return false;
    }
    let clearLenta = function () {
        lenta.innerHTML = '<button class="load-more">Load more</button>';
    }

    let showMore = function (skip, top, filterNickname, filterHashTags, filterDate) {
        skip = skip || 0;
        top = top || 10;
        filterNickname = filterNickname || {};
        filterHashTags = filterHashTags || {};
        filterDate = filterDate || {};
        const load_more = document.getElementsByClassName('load-more')[0];
        const arr = modulFirst.getPhotoPosts(skip, top, filterNickname, filterHashTags, filterDate);
        let ind = 0;
        arr.forEach(element => {
            ind = photoPosts.findIndex((el) => { return el.id === element.id })
            //lenta.insertBefore(createPhotoPost(element), lenta.children[ind]);
            lenta.insertBefore(createPhotoPost(element), load_more);
        });
    }

    let editPhotoPost = function (id, photoPost) {
        if (modulFirst.editPhotoPost(id, photoPost)) {
            lenta.replaceChild(createPhotoPost(modulFirst.getPhotoPost(id)), document.getElementById(id));
            return true;
        }
        return false;
    }


    return {
        activatedUser,
        createPhotoPost,
        addPost,
        showMore,
        removePost,
        editPhotoPost,
        clearLenta
    }

})();
modulSecond.activatedUser('Guest');
modulSecond.addPost({
    id: "1",
    description: 'Good day!',
    createdAt: new Date(2018, 5, 22, 16, 12, 55),
    author: 'DIMA',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulSecond.addPost({
    id: "2",
    description: 'The usual working schedule during a week is from 8 am till 5 pm or 6 p.m.',
    createdAt: new Date(2018, 5, 23, 18, 12, 55),
    author: 'Dima',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulSecond.addPost({
    id: "3",
    description: 'As the working day starts at 8 am or 8.30',
    createdAt: new Date(2018, 5, 24, 20, 12, 55),
    author: 'Urgant',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Dima'],
});
modulSecond.addPost({
    id: "4",
    description: 'On a daily basis, an American wakes up at 5 am for jogging',
    createdAt: new Date(2018, 5, 5, 16, 12, 55),
    author: 'Maria',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulSecond.addPost({
    id: "5",
    description: 'One generalization often made about Americans is that they value their individualism quite high. They pay great attention to their individual differences;',
    createdAt: new Date(2018, 5, 25, 17, 12, 55),
    author: 'Maria',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulSecond.addPost({
    id: "6",
    description: 'Few of us like to be told we are average. Americans are no exception',
    createdAt: new Date(2018, 5, 10, 17, 12, 55),
    author: 'Dima',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});

var likeButton = document.getElementsByClassName("like");
var editButton = document.getElementsByClassName("edit");
var deleteButton = document.getElementsByClassName("delete");

localStorage.setItem("PhotoPosts", JSON.stringify(photoPosts));
localStorage.setItem("Users", JSON.stringify(users));
localStorage.setItem("Likes", JSON.stringify(likeButton));
localStorage.setItem("User", JSON.stringify(user));
