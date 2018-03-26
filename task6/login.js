var login = document.createElement('div');
login.className = 'login my-flex';
function singIn() {
    login.innerHTML = `<div class="logotip">
    <img class="login-photo" src="images/logotip.png">
</div>
<a class="name-bb my-flex">
    <p class="blick-boom">
        <i>
            <strong>Blick Boom</strong>
        </i>
    </p>
</a>
<a class="hello my-flex">
    <p class="welcome">
        <strong>Welcome!</strong>
    </p>
</a>
<input type="text" id="login" class="email" placeholder="Email address">
<input type="text" id="password" class="password" placeholder="Password">
<button class="sign-in">Sign in</button>`;
    document.querySelector("header").innerHTML = "";
    main.removeChild(lentaa);
    main.removeChild(filter);
    main.appendChild(login);
    document.getElementsByClassName("sign-in")[0].addEventListener('click', returnToLenta);
}
function returnToLenta() {
    let loginName = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("Users"));
    let index = -1;
    for (let i = 0; i < users.length; i++) {
        if (loginName === users[i].name && password === users[i].password) {
            index = i;
        }
    }
    if (index === -1) {
        alert("Invalid login!");
    } else {
        localStorage.setItem("User", JSON.stringify(loginName));
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
        main.removeChild(login);
        main.appendChild(lentaa);
        main.appendChild(filter);
        modulSecond.activatedUser(loginName);
        document.getElementsByClassName("name")[0].innerHTML = loginName;
        let Likes = JSON.parse(localStorage.getItem("Likes"));
        for (let i = 0; i < likeButton.length; i++) {
            likeButton[i].setAttribute("isLike", "0");
            likeButton[i].addEventListener("click", addLike);
            editButton[i].addEventListener("click", EditPostOrAddPost);
            deleteButton[i].addEventListener("click", activetedDeletePost);
        }
        /*  for (let i = 0; i < Likes.length; i++) {
              Likes[i].setAttribute("isLike", "0");
              Likes[i].addEventListener("click", addLike);
              editButton[i].addEventListener("click", EditPostOrAddPost);
          }
          localStorage.setItem("Likes", JSON.stringify(Likes));*/
        document.getElementsByClassName("add-post")[0].addEventListener('click', EditPostOrAddPost);
    }
}
document.getElementsByClassName("authorization")[0].addEventListener('click', singIn);

