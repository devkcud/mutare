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
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
        return nots.send('Firefox', 'This feature is disabled for Firefox :(', true);

    // NOTE: Can't do a text wrap for firefox tried for about 2h and nothing came out. Disabling
    // TODO: Find a solution

    editor.style.textWrap = (editor.style.textWrap === 'nowrap' ? 'wrap' : 'nowrap');
    nots.send('Wrap', 'Text wrapping ' + (editor.style.textWrap === 'nowrap' ? 'disabled' : 'enabled'))
}

function addText(open, close = open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = editor.value.substring(0, start) + open + editor.value.substring(start, end) + close + editor.value.substring(end);

    editor.selectionEnd = end + open.length;
}

function toggleText(open, close = open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    const text = editor.value;
    const selectedText = text.substring(start, end);

    let newText, newStart, newEnd;

    if (start === end) {
        addText(open, close);
        return;
    }

    if (selectedText.startsWith(open) && selectedText.endsWith(close)) {
        newText = text.substring(0, start) + selectedText.substring(open.length, selectedText.length - close.length) + text.substring(end);
        newStart = start;
        newEnd = end - open.length - close.length;
    } else {
        newText = text.substring(0, start) + open + selectedText + close + text.substring(end);
        newStart = start;
        newEnd = end + open.length + close.length;
    }

    editor.value = newText;
    editor.setSelectionRange(newStart, newEnd);
}

function addTextStart(open) {
    const lines = editor.value.split('\n');
    const start = editor.selectionStart;
    const selectedLineIndex = editor.value.substring(0, start).split('\n').length - 1;

    if (selectedLineIndex >= 0 && selectedLineIndex < lines.length) {
        const selectedLine = lines[selectedLineIndex];

        const hashedLine = open + (selectedLine.startsWith(open) ? '' : ' ') + selectedLine.trim();
        lines[selectedLineIndex] = hashedLine;

        editor.value = lines.join('\n');

        const cursorPosition = editor.value.substring(0, start).length + 2;
        editor.setSelectionRange(cursorPosition, cursorPosition);
    }
}

function toggleTextStart(open) {
    const lines = editor.value.split('\n');
    const start = editor.selectionStart;
    const selectedLineIndex = editor.value.substring(0, start).split('\n').length - 1;

    if (selectedLineIndex >= 0 && selectedLineIndex < lines.length) {
        const selectedLine = lines[selectedLineIndex].trim();

        let hashedLine;

        if (!selectedLine.startsWith(open)) {
            hashedLine = open + (selectedLine.startsWith(open) ? '' : ' ') + selectedLine;
            lines[selectedLineIndex] = hashedLine;
        } else {
            hashedLine = selectedLine.slice(open.length, selectedLine.length).trim();
            lines[selectedLineIndex] = hashedLine;
        }

        editor.value = lines.join('\n');

        const cursorPosition = editor.value.substring(0, start).length + 2;
        editor.setSelectionRange(cursorPosition, cursorPosition);
    }
}

function remTextStart(open) {
    const lines = editor.value.split('\n');
    const start = editor.selectionStart;
    const selectedLineIndex = editor.value.substring(0, start).split('\n').length - 1;

    if (selectedLineIndex >= 0 && selectedLineIndex < lines.length) {
        const selectedLine = lines[selectedLineIndex].trim();

        if (selectedLine.startsWith(open)) {
            const hashedLine = selectedLine.slice(open.length, selectedLine.length).trim();
            lines[selectedLineIndex] = hashedLine;
        }

        editor.value = lines.join('\n');

        const cursorPosition = editor.value.substring(0, start).length + 2;
        editor.setSelectionRange(cursorPosition, cursorPosition);
    }
}
