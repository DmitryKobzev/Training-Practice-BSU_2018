let modulSecond = (function () {
    let lenta = document.querySelector('.lenta');
    let nickname = document.querySelector('.nickname');
    let add_Post = document.querySelector('.add-post');
    let exit =document.querySelector('.exit');
    let authorization =document.querySelector('.authorization');
    var user = null;

    let activetedUser = function (newUser) {
        if (typeof newUser !== null ) {
            user = newUser;
            nickname.innerHTML = user;
            authorization.style.display='none';
        } 
        if(newUser === 'Guest') {
            user='Guest';
            nickname.innerHTML = user;
            authorization.style.display='initial';
            add_Post.style.display = 'none';
            exit.style.display = 'none';
        }
    }

    let createPhotoPost = function (photoPost) {
        let post = document.createElement('div');
        post.id = photoPost.id;
        post.className = 'post my-flex';
        let top = document.createElement('div');
        top.className = 'top-post my-flex';
        let left = document.createElement('div');
        left.className = 'left';
        left.innerHTML = "<p>" + photoPost.author + "</p>";
        let date = document.createElement('div');
        date.className = 'date';
        date.innerHTML = "<p>" + photoPost.createdAt.getDate() + "." + photoPost.createdAt.getMonth() + '.' + photoPost.createdAt.getFullYear()
            + "<br>" + "at " + photoPost.createdAt.getHours() + " hours " + photoPost.createdAt.getMinutes() + " minutes" + "</p>";
        let right = document.createElement('div');
        right.className = "right";
        right.innerHTML = "<p>" + "<strong>" + photoPost.hashTags.reduce((accum, element) => accum + ' ' + element) + "</strong>" + "</p>";
        let Photo = document.createElement('div');
        Photo.className = 'Photo';
        let photo = document.createElement('img');
        photo.className = 'photo';
        photo.src = 'images/comedy.jpg';
        let bottom = document.createElement('div');
        bottom.className = 'bottom-post my-flex';
        let buttoms = document.createElement('div');
        buttoms.className = 'buttoms my-flex';
        let like = document.createElement('buttom');
        like.className = 'material-icons like';
        like.innerHTML = "favorite_border";
        let edit = document.createElement('buttom');
        edit.className = 'material-icons edit';
        edit.innerHTML = "mode_edit";
        let deletePost = document.createElement('buttom');
        deletePost.className = 'material-icons delete';
        deletePost.innerHTML = "cancel";
        if (user !== null && user !== photoPost.author) {
            like.style.display = 'none';
            edit.style.display = 'none';
            deletePost.style.display = 'none';
        }
        let comment = document.createElement('div');
        comment.className = "comment";
        comment.innerHTML = "<p>" + "<strong>" + photoPost.description +  "</strong>" + "</p>";
        top.append(left, date, right);
        post.appendChild(top);
        Photo.append(photo);
        post.appendChild(Photo);
        buttoms.append(like, edit, deletePost);
        bottom.append(buttoms, comment);
        post.appendChild(bottom);
        return post;
    }

    let addPost = function (photoPost) {
        if (modulFirst.addPhotoPost(photoPost)) {
            lenta.insertBefore(createPhotoPost(photoPost), lenta.children[0]);
            //lenta.appendChild(createPhotoPost(photoPost));
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
        let load_more = document.createElement('button');
        load_more.className ='load-more';
        load_more.innerHTML='Load more';
        lenta.innerHTML = "";
        lenta.appendChild(load_more);
    }
    let showMore = function (skip, top, filterNickname, filterHashTags, filterDate) {
        let arr = modulFirst.getPhotoPosts(skip, top, filterNickname, filterHashTags, filterDate);
       /* for(var i=0;i<arr.length;i++){
          //  lenta.insertBefore(createPhotoPost(arr[i]), lenta.children[0]);
            lenta.appendChild(createPhotoPost(arr[i]));
        }*/
        arr.forEach(element => {
            lenta.insertBefore(createPhotoPost(element), lenta.children[0]);
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
        activetedUser,
        createPhotoPost,
        addPost,
        showMore,
        removePost,
        editPhotoPost,
        clearLenta
    }

})();
modulSecond.activetedUser('Dima');
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
    createdAt: new Date(2018, 5, 26, 17, 12, 55),
    author: 'Dima',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
//modulSecond.clearLenta();
//modulSecond.showMore(0,10,filterNickname,{},{});
modulSecond.removePost('3');
modulSecond.editPhotoPost('1',{ description: 'hello'});