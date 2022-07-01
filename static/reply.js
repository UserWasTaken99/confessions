function submitComment() {
    let comment = $('.inputField').val();
    if (comment.length == 0)
        alert('You cannot submit a blank reply!');
    else {
        let id = $('.confession').attr('id');
        comment = comment.replace('<', '');
        comment = comment.replace('>', '');
        comment = comment.replace('&lt;', '');
        comment = comment.replace('&gt;', '');
        fetch('/postComment', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                comment: comment,
                to: id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
        fetch('/showReplies', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(data => {
                location.href = '/replies';
            })
    }
}