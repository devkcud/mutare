// TODO: HelperMenu: Bold/Italic/List

const nots = new Notes();
const text = new Text();
const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');

const converter = new showdown.Converter();
preview.innerHTML = converter.makeHtml(editor.value);

editor.focus();

editor.addEventListener('keyup', (e) => {
    preview.innerHTML = converter.makeHtml(e.target.value);
});

window.addEventListener('keydown', (e) => {
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
