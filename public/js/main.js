async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}
document.addEventListener('DOMContentLoaded', async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = ' ';
    posts.forEach((post) => {
        let postHTML = `
        <div class="col d-flex align-items-stretch">
        <div class="card">
          <img src=${post.imageUrl} class="card-img-top" alt=${post.title}>
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <a class="btn btn-primary" href="/landmark?id=${post.id}">Details</a>
          </div>
        </div>
      </div>
    `
   articles.insertAdjacentHTML("beforeend",postHTML);
    })

   

})

// Call me form 
let callMeForm = document.querySelector('.call-me-form');
let phoneInput = callMeForm.querySelector('input');
callMeForm.addEventListener('submit',function(e){
  e.stopPropagation();
  fetch('/callback-requests',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneInput.value

    })
  }).then((response) => response.text())
    .then(()=> alert("We will get in touch with you as soon as possible!"))
})

// Call me form 

// Email request form
let emailRequestForm = document.querySelector('.email-request-form');
emailRequestForm.addEventListener('submit', function(e){

  let nameInput = document.querySelector('#name');
  let emailInput = document.querySelector('#email');
  let messageInput = document.querySelector('#message');
  e.preventDefault();
  fetch('localho/emails',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value

    })
  }).then((response) => response.text())
    .then((data)=> console.log(data))
})