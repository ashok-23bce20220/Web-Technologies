const API="http://localhost:5000/notes";

function addNote(){

const note={
title:document.getElementById("title").value,
subject:document.getElementById("subject").value,
description:document.getElementById("description").value
};

fetch(API,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(note)
})
.then(res=>res.json())
.then(()=>loadNotes());

}

function loadNotes(){

fetch(API)
.then(res=>res.json())
.then(data=>{

let output="";

data.forEach(note=>{

output+=`
<div>
<h3>${note.title}</h3>
<p>${note.subject}</p>
<p>${note.description}</p>
<button onclick="deleteNote('${note._id}')">Delete</button>
<hr>
</div>
`;

});

document.getElementById("notes").innerHTML=output;

});

}

function deleteNote(id){

fetch(`${API}/${id}`,{
method:"DELETE"
}).then(()=>loadNotes());

}

window.onload=loadNotes;