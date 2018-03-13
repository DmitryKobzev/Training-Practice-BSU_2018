var photoPosts = [
];
var filterNickname = {
    nickname: 'Dima'
};
var filterHashTags = {
    hashTags: ['#goodday', '#nice']
};
var filterDate = {
    fromDate: new Date(2018, 5, 1),
    toDate: new Date(2018, 5, 25)
};
let modulFirst = (function () {
    var sortedPhotoPosts = photoPosts.sort((post1, post2) => {
        return post2.createdAt - post1.createdAt;
    });

    let getPhotoPost = function (id) {
        if (typeof id !== "string") {
            console.log("Oops!You entered an invalid argument!");
            return;
        }
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                return photoPosts[i];
            }
        }
        return false;
    }


    let getPhotoPosts = function (skip, top, filterNickname, filterHashTags, filterDate) {
        skip = skip || 0;
        top = top || 10;
        /*   filterNickname = filterNickname || {};
           filterHashTags = filterHashTags || {};
           filterDate = filterDate || {};*/
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log("Oops!You entered an invalid argument!");
            return;
        }
        

        return sortedPhotoPosts.filter(post => {
            if (filterNickname !== undefined && filterNickname.hasOwnProperty("nickname")) {
                if (filterNickname.nickname !== post.author) {
                    return false;
                }
            }
            if (filterHashTags !== undefined && filterHashTags.hasOwnProperty("hashTags")) {
                if (!filterHashTags.hashTags.every((tag) => {
                    return post.hashTags.includes(tag);
                }))
                    return false;
            }
            if (filterDate !== undefined && filterDate.hasOwnProperty("fromDate")) {
                if (post.createdAt - filterDate.fromDate < 0) {
                    return false;
                }
            }
            if (filterDate !== undefined && filterDate.hasOwnProperty("toDate")) {
                if (filterDate.toDate - post.createdAt < 0) {
                    return false;
                }
            }

            return true;
        }).slice(skip, top + skip);
    }

    let validatePhotoPost = function (photoPost) {
        if (typeof photoPost.id !== 'string' || photoPost.id === "") {
            return false;
        }
        if (typeof photoPost.author !== 'string' || photoPost.author === "") {
            return false;
        }
        if (typeof photoPost.description !== 'string' || photoPost.description.length > 200) {
            return false;
        }
        if (!(photoPost.createdAt instanceof Date)) {
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
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            photoPosts.sort((post1, post2) => {
                return post2.createdAt - post1.createdAt;
            });
            return true;
        } else return false;

    }

    let editPhotoPost = function (id, photoPost) {
        var photoPostToChange = getPhotoPost(id);
        if (!validatePhotoPost(photoPostToChange)) {
            return false;
        }
        if (typeof photoPost !== "object" || photoPost.hasOwnProperty("id") || photoPost.hasOwnProperty("author") || photoPost.hasOwnProperty("createdAt")) {
            console.log("Invalid argument! Fields {author}, {date}, {id} can not be edited.");
            return false;
        }
        Object.assign(photoPostToChange, photoPost);
        return true;
    }


    let removePhotoPost = function (id) {
        if (typeof id !== "string" || id === "") {
            console.log("Oops!You entered an invalid argument!");
            return false;
        }
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                photoPosts.splice(i, 1);
                return "deletion was successful!";
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
/*modulFirst.addPhotoPost({
    id: "1",
    description: 'eqweqwe',
    createdAt: new Date(2018, 5, 22, 16, 12, 55),
    author: 'DIMA',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulFirst.addPhotoPost({
    id: "2",
    description: 'fdgfdgdfg',
    createdAt: new Date(2018, 5, 23, 18, 12, 55),
    author: 'Dima',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulFirst.addPhotoPost({
    id: "3",
    description: 'ewew',
    createdAt: new Date(2018, 5, 24, 20, 12, 55),
    author: 'Urgant',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Dima'],
});
modulFirst.addPhotoPost({
    id: "4",
    description: 'eqweqwe',
    createdAt: new Date(2018, 5, 25, 16, 12, 55),
    author: 'Maria',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulFirst.addPhotoPost({
    id: "5",
    description: 'eqweqwe',
    createdAt: new Date(2018, 5, 25, 17, 12, 55),
    author: 'Maria',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});
modulFirst.addPhotoPost({
    id: "6",
    description: 'eqweqwe',
    createdAt: new Date(2018, 4, 10, 17, 12, 55),
    author: 'Dima',
    photoLink: 'images/comedy.jpg',
    hashTags: ['#tag1', '#tag2'],
    likes: ['Urgant'],
});*/