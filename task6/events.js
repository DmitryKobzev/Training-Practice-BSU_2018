function addFilter() {
    let filterName = document.getElementsByClassName('filter-by-name')[0].value;
    let filterTags = document.getElementsByClassName('filter-by-hashtag')[0].value.split(' ').slice();
    filterDate.fromDate = new Date(document.getElementsByClassName('filter-From-date')[0].value);
    filterDate.toDate = new Date(document.getElementsByClassName('filter-To-date')[0].value);
    photoPosts = JSON.parse(localStorage.getItem("PhotoPosts"));
    modulSecond.clearLenta();
    modulSecond.showMore(0, 10, {}, { hashTags: filterTags }, {});
    /*  if (filterName !== '') {
          modulSecond.showMore(0, 10, {}, {}, filterDate);
      } else {
          modulSecond.showMore(0, 10);
      }*/
}
document.getElementsByClassName("filtering")[0].addEventListener('click', addFilter);

function addLike(e) {
    e.preventDefault();
    /* let Likes = JSON.parse(localStorage.getItem("Likes"));
     for (let i = 0; i < Likes.length; i++) {
         if (Likes[i].getAttribute("isLike") === "0") {
             Likes[i].src = "images/red.png";
             Likes[i].setAttribute("isLike", "1");
             for (let i = 0; i < photoPosts.length; i++) {
                 if (Likes[i].getAttribute("isLike") == "1" && photoPosts[i].likes.indexOf(user) == -1) {
                     photoPosts[i].likes.push(user);
                 }
             }
         }
         else {
             Likes[i].src = "images/black.png";
             Likes[i].setAttribute("isLike", "0");
             for (let i = 0; i < photoPosts.length; i++) {
                 if (Likes[i].getAttribute("isLike") == "0" && photoPosts[i].likes.indexOf(user) != -1) {
                     photoPosts[i].likes.splice(photoPosts[i].likes.indexOf(user), 1);
                 }
             }
         }
     }
     localStorage.setItem("Likes", JSON.stringify(Likes));*/
    if (e.target.getAttribute("isLike") === "0") {
        e.target.src = "images/red.png";
        e.target.setAttribute("isLike", "1");
        for (let i = 0; i < photoPosts.length; i++) {
            if (likeButton[i].getAttribute("isLike") == "1" && photoPosts[i].likes.indexOf(user) == -1) {
                photoPosts[i].likes.push(user);
            }
        }
    }
    else {
        e.target.src = "images/black.png";
        e.target.setAttribute("isLike", "0");
        for (let i = 0; i < photoPosts.length; i++) {
            if (likeButton[i].getAttribute("isLike") == "0" && photoPosts[i].likes.indexOf(user) != -1) {
                photoPosts[i].likes.splice(photoPosts[i].likes.indexOf(user), 1);
            }
        }
    }
}
function activetedDeletePost(e) {
    modulSecond.removePost(e.target.id);
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}
function editPostAndSave(e) {
    let descriptionBuff = photoPosts[index].description;
    if (document.getElementById("des").value !== "") {
        descriptionBuff = document.getElementById("des").value;
    }
    let hashTagsBuff = photoPosts[index].hashTags;
    if (document.getElementById("tag").value.split(' ').slice().length != 1) {
        hashTagsBuff = document.getElementById("tag").value.split(' ').slice();
    }
    main.appendChild(lentaa);
    modulSecond.editPhotoPost(index, { description: descriptionBuff, hashTags: hashTagsBuff });
    main.removeChild(lentaa);
    localStorage.setItem('PhotoPosts', JSON.stringify(photoPosts));
}
function exitClick() {
    modulSecond.activatedUser('Guest');
    document.getElementsByClassName("name")[0].innerHTML = 'Guest';
    localStorage.setItem("User", JSON.stringify(user));
    document.getElementsByClassName("authorization")[0].addEventListener('click', singIn);
}