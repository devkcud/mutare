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
