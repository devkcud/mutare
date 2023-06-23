// TODO: MenuBar: Save/Open/New file
// TODO: HelperMenu: Bold/Italic/List

const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');
const notifications = document.getElementById('notifications');

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

document.getElementById('darktoggler').addEventListener('click', () => document.body.classList.toggle('darkmode'));
