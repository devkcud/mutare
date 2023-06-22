// TODO: MenuBar: Save/Open/New file
// TODO: HelperMenu: Bold/Italic/List

const editor = document.getElementById('text-editor');
const preview = document.getElementById('preview');

const converter = new showdown.Converter();
preview.innerHTML = converter.makeHtml(editor.value);

editor.focus();

function toggle(open) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    editor.value = editor.value.substring(0, start) + open + editor.value.substring(start, end) + open + editor.value.substring(end);

    editor.focus();
    editor.selectionEnd = end + open.length;
}

function changewrap() {
    editor.style.textWrap = (editor.style.textWrap === "nowrap" ? "wrap" : "nowrap");
}

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
