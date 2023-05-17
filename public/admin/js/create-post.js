let createPostForm = document.querySelector('.create-post-form');
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#textval');

let imageFile = document.querySelector('#image-file');

imageFile.addEventListener('change',()=> disableInput(imageFile,imageURL));
imageURL.addEventListener('change',()=> disableInput(imageURL,imageFile));

createPostForm.addEventListener('submit', function(e){
    e.preventDefault();
    let createText = text.value;
    let descriptionText;
    if(createText.indexOf('.') === -1){
        descriptionText = createText;
    }else{
        descriptionText = createText.substring(0,createText.indexOf('.')+1);
    }
    let data = new FormData();
    data.append('title',title.value);
    data.append('country',country.value);
    data.append('imageUrl',imageURL.value);
    data.append('text',createText);
    data.append('description',descriptionText);
    data.append('imageFile',imageFile.files[0]);
    
    fetch('/posts',{
       method:'POST',
    //    headers:{
    //     'Content-Type':'application/json'
    //    },
    //    body: JSON.stringify({
    //      title: title.value,
    //      country: country.value,
    //      imageUrl: imageURL.value,
    //      text: createText,
    //      description: descriptionText

    //    })
      body: data
    }).then((response) => response.text()).then((data) => window.history.go())
})

function disableInput(inp1, inp2){
    if(inp1.value){
        inp2.disabled = true;
    }else{
        inp2.disabled = false;
    }
}