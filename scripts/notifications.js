class Notes {
    _list;

    constructor () {
        this._list = document.getElementById('notifications');
    }

    send(title, msg, urgent) {
        const li = document.createElement('li');
        li.classList.add('notification');

        const head = document.createElement('h4');
        const body = document.createElement('span');
        const hour = document.createElement('span');

        hour.classList.add('hour');

        head.innerHTML = title;
        body.innerHTML = msg;

        const now = new Date();
        hour.innerHTML = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        li.appendChild(head);
        li.appendChild(body);
        li.appendChild(hour);

        li.addEventListener('click', () => this._list.removeChild(li));

        this._list.appendChild(li);

        if (urgent) {
            li.classList.add('urgent');
            return;
        }

        setTimeout(() => {
            let opacity = 1;
            var interval = setInterval(() => {
                opacity -= 0.1;
                li.style.opacity = opacity;

                if (opacity <= 0) {
                    try { this._list.removeChild(li); } catch (e) {}
                    clearInterval(interval);
                }
            }, 50);
        }, 3000);
    }

    clear() {
        this._list.innerHTML = '';
    }
}
