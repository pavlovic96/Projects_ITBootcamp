export class Chatroom {
    constructor(r, u) {
        this.room = r;
        this.username = u;
        this.chats = db.collection('chats');
        this.unsub;
    }

    get room() {
        return this._room;
    }

    set room(r) {
        this._room = r;
    }

    get username() {
        return this._username;
    }

    set username(u) {
        if (u.length >= 2 && u.length <= 10) {
            let valid = true;
            if (u.includes(' ') || u.includes('   ')) {
                valid = false;
            }

            if (valid) {
                this._username = u;
            }
            else {
                alert('Invalid Username!');
                this._username = 'Anonymus';
            }
        }
        else {
            alert('Invalid Username!');
            this._username = 'Anonymus';
        }
    }

    async addChat(mess) {

        let obj = {
            message: mess,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(new Date())
        }

        let response = await this.chats.add(obj);
        return response;
    }

    async removeChat(id) {
        let response = await this.chats.doc(id).delete();
        return response;

    }


    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    let doc = change.doc;
                    let type = change.type;

                    if (type == 'added') {
                        callback(doc);
                    }
                })
            })
    }

    updateRoom(ur) {
        this.room = ur;
        if (this.unsub) {
            this.unsub();
        }
    }

    updateUsername(uu) {
        this.username = uu;
        if (this.unsub) {
            this.unsub();
        }
    }
}

