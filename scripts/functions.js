function newfile() {
    nots.send('File', 'Opened an <i>empty file</i>', false);
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

            nots.send('File', `Opened <b>${file.name}</b>`, false);

            reader.readAsText(file);
        })
            .then((content) => editor.value = content)
            .catch((error) => nots.send('Error', error, true));
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

    nots.send('File', `Saved file`, false);
    document.body.removeChild(element);
}

function toggleWrap() {
    editor.style.textWrap = (editor.style.textWrap === 'nowrap' ? 'wrap' : 'nowrap');
    nots.send('Wrap', 'Text wrapping ' + (editor.style.textWrap === 'nowrap' ? 'disabled' : 'enabled'))
}

function addText(open, close = open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = editor.value.substring(0, start) + open + editor.value.substring(start, end) + close + editor.value.substring(end);

    editor.focus();
    editor.selectionEnd = end + open.length;
}

function addTextStart(open) {
    editor.value = open + editor.value.substring(0);

    editor.focus();
    editor.selectionEnd += open.length;
}
