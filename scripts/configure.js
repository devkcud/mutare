// TODO: HelperMenu: Bold/Italic/List

const nots = new Notes();
const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');

const converter = new showdown.Converter();
preview.innerHTML = converter.makeHtml(editor.value);

editor.focus();

editor.addEventListener('keyup', (e) => {
    preview.innerHTML = converter.makeHtml(e.target.value);
});

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey)
        switch (e.key) {
            case 'i': {
                e.preventDefault();
                addText('_');
                break;
            };

            case 'b': {
                e.preventDefault();
                addText('**');
                break;
            };

            case 'h': {
                e.preventDefault();
                addTextStart('#', '');
                break;
            };

            case 'Enter': {
                e.preventDefault();
                addText('<br>', '');
                break;
            };

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
});

document.getElementById('darktoggler').addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    nots.send('Dark Mode', `<i>${document.body.classList.contains('darkmode') ? 'Enabled' : 'Disabled'}</i> dark mode`, false);
});
