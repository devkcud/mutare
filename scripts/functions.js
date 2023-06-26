function newfile() {
    nots.send('File', 'Opened an <i>empty file</i>', false);
    editor.value = '';
    localStorage.removeItem('textdoc');
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
            .then((content) => {
                editor.value = content;
                preview.innerHTML = converter.makeHtml(content);
                nots.send('File', `Opened <b>${file.name}</b>`, false);
            })
            .catch((error) => nots.send('Error', error, true));
    });

    document.body.removeChild(element);
}

function savefile(html = false) {
    element = document.createElement('a');
    element.style.display = 'none';

    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(html ? preview.innerHTML : editor.value)}`);
    element.setAttribute('download', html ? 'index.html' : 'text.md');

    document.body.appendChild(element);
    element.click();

    nots.send('File', html ? 'Exported file as <i>HTML</i>' : 'Saved file', false);
    document.body.removeChild(element);
}

function toggleWrap() {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
        return nots.send('Firefox', 'This feature is disabled for Firefox :(', true);

    // NOTE: Can't do a text wrap for firefox tried for about 2h and nothing came out. Disabling
    // TODO: Find a solution

    editor.style.textWrap = (editor.style.textWrap === 'nowrap' ? 'wrap' : 'nowrap');
    nots.send('Wrap', 'Text wrapping ' + (editor.style.textWrap === 'nowrap' ? 'disabled' : 'enabled'))
}
