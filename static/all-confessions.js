// const mongoose = require("mongoose");
// const Confession = require("../models/confession");

// const dbURL = "mongodb://localhost:27017/confessionDB";
// mongoose.connect(dbURL);

function searchNow(e) {
    const search_results = document.getElementById('showingConfessionsRow');
    fetch("/getConfessions", {
        method: "POST",
        body: JSON.stringify({
            search_string: e.value
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(data => {
            let result = data.result;
            search_results.innerHTML = '';

            if (result.length > 0) {
                result.forEach((element, index) => {
                    let createDiv = document.createElement('div');
                    createDiv.className = 'col-md-4 confession-block';
                    createDiv.setAttribute('id', element._id)
                    createDiv.setAttribute('onclick', 'replySectionTrigger(this)');
                    createDiv.append(element.text);
                    search_results.append(createDiv);
                });
                return;
            }
            else if (result.length == 0 && e.value.length > 0)
                search_results.innerHTML = `<h1 class='NoResults'>No confessions yet. Be the first one to confess something!</h1>`

        });
}

function replySectionTrigger(e)
{
    const id = $(e).attr('id');
    fetch("/showReplies",{
        method:"POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify({
            id: id
        })
    })
    .then(response=> response.json())
    .then(data=>{
        location.href='/replies';
    })
}

