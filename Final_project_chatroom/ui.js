export class ChatUI {
    constructor(list) {
        this.list = list;
    }

    get list() {
        return this._list;
    }

    set list(li) {
        this._list = li;
    }

    setTime(data) {
        let date = new Date(data.created_at.toDate());
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let min = date.getMinutes();

        d = String(d).padStart(2, '0');
        m = String(m).padStart(2, '0');
        h = String(h).padStart(2, '0');
        min = String(min).padStart(2, '0');

        let today = new Date().setHours(0, 0, 0, 0);
        let messageDate = date.setHours(0, 0, 0, 0)

        let fullDate;
        if (today == messageDate) {
            fullDate = `${h}:${min}`;
        }
        else {
            fullDate = `${d}.${m}.${y} - ${h}:${min}`
        }

        return fullDate;
    }

    templateLI(doc) {
        let data = doc.data();

        let li = `<li id = '${doc.id}' class = '${data.username}'>
            <span class = 'ui_username'>${data.username}: </span>
            <span class = 'ui_mess'>${data.message}</span>
            <div class = 'ui_time'>${this.setTime(data)}</div>
            <img src= 'pictures/bin.png' class = 'img'>
        </li>`

        this.list.innerHTML += li;
    }

    templateLIAuthor(doc) {
        let data = doc.data();
        let li = `<li class ='author ${data.username}' id = '${doc.id}'>
            <span class = 'ui_username'>${data.username}: </span>
            <span class = 'ui_mess'>${data.message}</span>
            <div class = 'ui_time'>${this.setTime(data)}</div>
            <img src= 'pictures/bin.png' class = 'img'>
        </li>`

        this.list.innerHTML += li;
    }

    clearUL() {
        this.list.innerHTML = '';
    }
}
