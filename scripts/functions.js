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

function savefile() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.value));
    element.setAttribute('download', 'text.md');

    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function openfile() {
    const hidden = document.createElement('input');
    hidden.type = 'file';
    hidden.style.display = 'none';

    document.body.appendChild(hidden);
    hidden.click();

    hidden.addEventListener('change', (e) => {
        const file = e.target.files[0];

        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload  = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e.target.error);

            reader.readAsText(file);
        })
            .then((content) => (editor.value = content))
            .catch((error) => console.error('Error:', error));
    });

    document.body.removeChild(hidden);
}
