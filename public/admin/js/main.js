async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}

async function getCallbackRequests() {
    return await fetch('/callback-requests')
        .then((response) => response.json())
        .then((data) => data);
}
async function getEmailRequests() {
    return await fetch('/emails')
        .then((response) => response.json())
        .then((data) => data);
}
document.addEventListener('DOMContentLoaded', async function () {

    addPosts();
    addCallbackRequests();
    addEmailRequests();

    let addPostBtn = document.querySelector('.add-post');
    let createPostBtn = document.querySelector('#v-pills-createposts-tab');



    addPostBtn.addEventListener('click', () => {
        console.log("addpost clicked")
        createPostBtn.click();
    });

    async function addPosts() {
        let posts = await getPosts();
        let i = 1;
        let articles = document.querySelector('.articles-list tbody');
        articles.innerHTML = ' ';
        posts.forEach((post) => {
            let postHTML = `
        <tr>
            <td>${i++} <input  class='id' type="hidden" value = "${post.id}"/></td>
            <td class = "title">${post.title}</td>
            <td class = "date">${post.date}</td>
            <td class = "country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
       </tr>`
            articles.insertAdjacentHTML("beforeend", postHTML);
        })

    }

    async function addCallbackRequests() {
        let requests = await getCallbackRequests();
        let i = 1;
        let requestsBlock = document.querySelector('#v-pills-cbrequests tbody');
        requestsBlock.innerHTML = ' ';
        requests.forEach((request) => {
            let requestHTML = `
        <tr>
            <td>${i++} <input  class='id' type="hidden" value = "${request.id}"/></td>
            <td class = "title">${request.phoneNumber}</td>
            <td class = "date">${request.date}</td>
            
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
       </tr>`
            requestsBlock.insertAdjacentHTML("beforeend", requestHTML);
        })
    }

    async function addEmailRequests() {
        let emails = await getEmailRequests();
        let i = 1;
        let emailsBlock = document.querySelector('.emails-list');
        emailsBlock.innerHTML = ' ';
        emails.forEach((email) => {
            let emailHTML = `
        <tr>
            <td>${i++} <input  class='id' type="hidden" value = "${email.id}"/></td>
            <td class = "name">${email.name}</td>
            <td class = "email">${email.email}</td>
            <td class = "date">${email.date}</td>
            
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
       </tr>
       <tr>
          <td colspan="5" class = "message">${email.message}</td>
       </tr>
       `
            emailsBlock.insertAdjacentHTML("beforeend", emailHTML);
        })
    }

})

// Delete Email requests
let mailsBlock = document.querySelector('.emails-list');
mailsBlock.addEventListener('click', function (e) {
    console.log('remove clicked')
    if (e.target.classList.contains('remove-btn')) {
        console.log("remove btn clicked")
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
            .then(() => window.history.go());
    }
})

// Delete Email requests

// Delete callback requests

let requestsBlock = document.querySelector('#v-pills-cbrequests tbody');
requestsBlock.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        console.log("remove btn clicked")
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
            .then(() => window.history.go());
    }
})

let logOutBtn = document.querySelector('.logout-btn');
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})