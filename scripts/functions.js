function newfile() {
    editor.value = '';
}

function openfile() {
    element = document.createElement('input');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.type = 'file';
    element.click();

    element.addEventListener('change', (e) => {
        const file = e.target.files[0];

        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e.target.error);

            reader.readAsText(file);
        })
            .then((content) => editor.value = content)
            .catch((error) => console.error('Error:', error));
    });

    document.body.removeChild(element);
}

function savefile() {
    element = document.createElement('a');
    element.style.display = 'none';

    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(editor.value)}`);
    element.setAttribute('download', 'text.md');

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

    const now = new Date();
    hour.innerHTML = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    li.appendChild(head);
    li.appendChild(body);
    li.appendChild(hour);

    li.addEventListener('click', () => notifications.removeChild(li));

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
        }, 50);
    }, 3000);
}

function clearNotifications() {
    notifications.innerHTML = '';
}

function toggleWrap() {
    editor.style.textWrap = (editor.style.textWrap === 'nowrap' ? 'wrap' : 'nowrap');
    notify('Wrap', 'Text wrapping ' + (editor.style.textWrap === 'nowrap' ? 'disabled' : 'enabled'))
}

function addText(open, close = open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = editor.value.substring(0, start) + open + editor.value.substring(start, end) + close + editor.value.substring(end);

    editor.focus();
    editor.selectionEnd = end + open.length;
}

function addTextStart(open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = open + editor.value.substring(0);

    editor.focus();
    editor.selectionEnd = end + open.length;
}
