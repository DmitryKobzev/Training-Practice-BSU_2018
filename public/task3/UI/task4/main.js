/*var users = [
    {
        name: 'Dima',
        password: '1'
    },
    {
        name: 'Maria',
        password: '12'
    },
    {
        name: 'Urgant',
        password: '123'
    },
    {
        name: 'DIMA',
        password: '1234'
    }
];
localStorage.setItem("Users", JSON.stringify(users));
var filterNickname = {
    nickname: 'Dima'
};
var filterHashTags = {
    hashTags: ['#goodday', '#nice']
};
var filterDate = {
    fromDate: new Date(2018, 5, 22),
    toDate: new Date(2018, 5, 25)
};*/
let modulFirst = (function () {

    let getPhotoPost = function (id) {
        let photoPosts = this;
        if (typeof id !== "string") {
            console.log("Oops!You entered an invalid argument!");
            return false;
        }
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                return photoPosts[i];
            }
        }
        return false;
    }


    let getPhotoPosts = function (skip, top, filterConfig) {
        let photoPosts = this;
        skip = +skip || +0;
        top = +top || +10;
        // const filterHashTags = filterConfig.hashTags;
        //   const filterDate = filterConfig.fromDate;;
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log("Oops!You entered an invalid argument!");
            return;
        }
        return photoPosts.filter((post) => {
            if (filterConfig.nickname !== '' && filterConfig.hasOwnProperty("nickname")) {
                if (filterConfig.nickname !== post.author) {
                    return false;
                }
            }
            if (filterConfig.hashTags !== '' && filterConfig.hasOwnProperty("hashTags")) {
                if (!filterConfig.hashTags.every((tag) => {
                    return post.hashTags.includes(tag);
                }))
                    return false;
            }
            if (filterConfig.hasOwnProperty("fromDate") && filterConfig.fromDate !== '') {
                filterConfig.fromDate = new Date(filterConfig.fromDate);
                post.createdAt = new Date(post.createdAt);
                if (post.createdAt - filterConfig.fromDate < 0) {
                    return false;
                }
            }
            if (filterConfig.hasOwnProperty("toDate") && filterConfig.toDate !== '') {
                filterConfig.toDate = new Date(filterConfig.toDate);
                post.createdAt = new Date(post.createdAt);
                if (filterConfig.toDate - post.createdAt < 0) {
                    return false;
                }
            }

            return true;
        }).slice(skip, top + skip);
    }

    let validatePhotoPost = function (photoPost) {
        console.log(photoPost);
        if (typeof photoPost.id !== 'string' || photoPost.id === "") {
            return false;
        }
        if (typeof photoPost.author !== 'string' || photoPost.author === "") {
            return false;
        }
        if (typeof photoPost.description !== 'string' || photoPost.description.length > 200) {
            return false;
        }
        if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink === '') {
            return false;
        }
        if (typeof photoPost.hashTags === null) {
            return false;
        }
        if (typeof photoPost.likes === null) {
            return false;
        }
        return true;
    }

    let addPhotoPost = function (photoPost) {
        let photoPosts = this;
        photoPost.createdAt = new Date();
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            photoPosts.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            });
            return true;
        } else return false;

    }

    let editPhotoPost = function (id, photoPost, post) {
        if (typeof photoPost !== "object" || photoPost.hasOwnProperty("id") || photoPost.hasOwnProperty("author") || photoPost.hasOwnProperty("createdAt")) {
            console.log("Invalid argument! Fields {author}, {date}, {id} can not be edited.");
            return false;
        }
        Object.assign(post, photoPost);
        return true;
    }


    let removePhotoPost = function (id) {
        let photoPosts = this;
        if (typeof id !== "string" || id === "") {
            console.log("Oops!You entered an invalid argument!");
            return false;
        }

        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                photoPosts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    return {
        getPhotoPost,
        getPhotoPosts,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost,
        validatePhotoPost
    }
})();
module.exports = modulFirst;