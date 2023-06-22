// TODO: MenuBar: Save/Open/New file
// TODO: HelperMenu: Bold/Italic/List

const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');
const notifications = document.getElementById('notifications');

const converter = new showdown.Converter();
preview.innerHTML = converter.makeHtml(editor.value);

editor.focus();

function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function notify(title, msg, urgent) {
    const li = document.createElement('li');
    li.classList.add('notification');

    const head = document.createElement('h4');
    const body = document.createElement('span');
    const hour = document.createElement('span');

    hour.classList.add('hour');

    head.innerHTML = title;
    body.innerHTML = msg;
    hour.innerHTML = getTime();

    li.appendChild(head);
    li.appendChild(body);
    li.appendChild(hour);

    li.addEventListener('click', (e) => {
        notifications.removeChild(li);
    });

    notifications.appendChild(li);

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
                try { notifications.removeChild(li); } catch (e) {}
                clearInterval(interval);
            }
        }, 100);
    }, 5000);
}

function clearNotifications() {
    notifications.innerHTML = '';
}

function toggle(open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = editor.value.substring(0, start) + open + editor.value.substring(start, end) + open + editor.value.substring(end);

    editor.focus();
    editor.selectionEnd = end + open.length;
}

function changewrap() {
    editor.style.textWrap = (editor.style.textWrap === 'nowrap' ? 'wrap' : 'nowrap');
    notify('Wrap', 'Text wrapping ' + (editor.style.textWrap === 'nowrap' ? 'disabled' : 'enabled'))
}

editor.addEventListener('keyup', (e) => {
    preview.innerHTML = converter.makeHtml(e.target.value);
});

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch (e.key) {
            case 'i': {
                e.preventDefault();
                toggle('_');
                break;
            };

            case 's': {
                e.preventDefault();
                break;
            }

            case 'b': {
                e.preventDefault();
                toggle('**');
                break;
            };

            case 'o': {
                e.preventDefault();
                break;
            };

            default: break;
        }
    }
});
