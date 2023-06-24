const nots = new Notes();
const text = new Text();
const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');
const helpermenu = document.getElementById('helpermenu');

const converter = new showdown.Converter();
preview.innerHTML = converter.makeHtml(editor.value);

function updateCursorDiv() {
    const caret = getCaretCoordinates(editor, editor.selectionStart);

    helpermenu.style.position = 'absolute';
    helpermenu.style.display = 'flex';

    helpermenu.style.top = `${editor.offsetTop - editor.scrollTop + caret.top}px`;
    helpermenu.style.left = `${editor.offsetLeft - editor.scrollLeft + caret.left}px`;
}

editor.focus();

editor.addEventListener('keyup', (e) => {
    preview.innerHTML = converter.makeHtml(e.target.value);
});

editor.addEventListener('input', updateCursorDiv);
editor.addEventListener('scroll', updateCursorDiv);
editor.addEventListener('focus', updateCursorDiv);
editor.addEventListener('click', updateCursorDiv);

window.addEventListener('keydown', (e) => {
    updateCursorDiv();

    if (e.ctrlKey) {
        switch (e.key) {
            case 'i': {
                e.preventDefault();
                text.toggle('_');
                break;
            };

            case 'b': {
                e.preventDefault();
                text.toggle('**');
                break;
            };

            case 'Enter': {
                e.preventDefault();
                text.add('<br>', '');
                break;
            };

            case 'h': {
                e.preventDefault();
                if (e.altKey) text.addStart('#');
                else text.toggleStart('#');
                break;
            }

            case 'H': {
                e.preventDefault();
                text.remStart('#');
                break;
            }

            case 's': {
                e.preventDefault();
                savefile();
                break;
            }

            case 'o': {
                e.preventDefault();
                openfile();
                break;
            };

            case 'd': {
                e.preventDefault();
                newfile();
                break;
            };

            default: break;
        }
    }
});

document.getElementById('darktoggler').addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    nots.send('Dark Mode', `<i>${document.body.classList.contains('darkmode') ? 'Enabled' : 'Disabled'}</i> dark mode`, false);
});

document.getElementById('header').onclick = (e) => {
    if (e.altKey) text.addStart('#');
    else if (e.ctrlKey) text.remStart('#');
    else text.toggleStart('#');
    updateCursorDiv();
};

document.getElementById('header').onclick = (e) => {
    if (e.altKey) text.addStart('#');
    else if (e.ctrlKey) text.remStart('#');
    else text.toggleStart('#');
    updateCursorDiv();
};

document.getElementById('bold').onclick = () => {
    text.toggle('**');
    updateCursorDiv();
};

document.getElementById('italic').onclick = () => {
    text.toggle('_');
    updateCursorDiv();
};

document.getElementById('break').onclick = () => {
    text.add('<br>', '');
    updateCursorDiv();
};
