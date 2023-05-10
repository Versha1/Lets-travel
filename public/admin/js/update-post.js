{
    let articlesBlock = document.querySelector('.articles-list');
    let updatePostBtn = document.querySelector('#v-pills-updateposts-tab');

    let updateForm = document.querySelector('.update-post-form');
    let title = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let id;


    articlesBlock.addEventListener('click', async function (e) {
        if (e.target.classList.contains('edit-btn')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((response) => response.json())
                .then((data) => data)
            title.value = postInfo.title;
            textArea.value = postInfo.text;

            console.log('Edit button clicked');
            updatePostBtn.click();
        }
    })

    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let newText = textArea.value;
        let descriptionText;
        if (newText.indexOf('.') === -1) {
            descriptionText = newText;
        } else {
            descriptionText = newText.substring(0, newText.indexOf('.') + 1);
        }
        fetch('http://localhost:3000/posts/' + id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.value,
                    text: textArea.value,
                    description: descriptionText
                })

            }).then((resp) => resp.json).then(() => window.history.go())
    })


}