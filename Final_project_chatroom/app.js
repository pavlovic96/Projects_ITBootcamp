import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

let nav = document.getElementById('nav');
let ul = document.querySelector('ul');
let inputColor = document.getElementById('color');
let inputMess = document.getElementById('input_mess');
let inputUsername = document.getElementById('input_username');
let form0 = document.getElementById('form0');
let form1 = document.getElementById('form1');
let form2 = document.getElementById('form2');
let p = document.querySelector('p');



let newUser = 'Anonymus';
if (localStorage.user) {
    newUser = localStorage.user;
}

let room = '#general';
if (localStorage.room) {
    room = localStorage.room;
}

if(localStorage.color){
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = localStorage.color;
}


let chatroom = new Chatroom(room, newUser);
let chatUI = new ChatUI(ul);

chatroom.getChats(doc => {
    let data = doc.data();
    if (data.username == newUser) {
        chatUI.templateLIAuthor(doc);
    }
    else {
        chatUI.templateLI(doc);
    }
})

for (let i = 0; i < nav.children.length; i++) {
    if (nav.children[i].textContent == room) {
        nav.children[i].classList.add('active');
    }
}

nav.addEventListener('click', e => {
    e.preventDefault();

    let buttons = nav.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    e.target.classList.add('active');

    room = e.target.textContent;
    localStorage.setItem('room', room);
    chatroom.updateRoom(room);

    chatUI.clearUL();

    chatroom.getChats(doc => {
        let data = doc.data();
        if (data.username == newUser) {
            chatUI.templateLIAuthor(doc);
        }
        else {
            chatUI.templateLI(doc);
        }
})
})

form0.addEventListener('submit', e => {
    e.preventDefault();
    if(e.target.tagName === 'FORM'){
        let color = inputColor.value;
        localStorage.setItem('color',color)
        setTimeout(() =>{
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = color;
        }, 500)
        
    }
})

form1.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.tagName === 'FORM') {
        if (inputMess.value.length > 0) {
            chatroom.addChat(inputMess.value)
                .then(() => form1.reset())
                .catch(err => console.log('An error occurred: ' + err))
        }
    }
})

form2.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.tagName === 'FORM') {
        chatroom.username = inputUsername.value;
        newUser = chatroom.username;
        localStorage.setItem('user', newUser);

        p.innerHTML = `New user is: ${newUser}`;
        form2.reset();
    }

    setTimeout(() => {
        p.innerHTML = '';
    }, 3000)

    chatroom.updateUsername(newUser);

    chatUI.clearUL();

    chatroom.getChats(doc => {
        let data = doc.data();
        if (data.username == newUser) {
            chatUI.templateLIAuthor(doc);
        }
        else {
            chatUI.templateLI(doc);
        }
    })
})

ul.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.tagName === 'IMG'){
        if(confirm('Are you sure you want to delete the message?') == true){
        let li = e.target.parentElement;
        li.remove();
        
        let id = li.id;
        let username = li.classList;

        if(username.contains(newUser)){
        chatroom.removeChat(id)
        .then(() => console.log('Chat deleted'))
        .catch(err => console.log('Error: ' + err))
        }
    }
    }
})