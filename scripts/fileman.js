function savefile() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.value));
    element.setAttribute('download', 'text.md');

    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function openfile() {
    const hidden = document.createElement('input');
    hidden.type = 'file';
    hidden.style.display = 'none';

    document.body.appendChild(hidden);
    hidden.click();

    hidden.addEventListener('change', (e) => {
        const file = e.target.files[0];

        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload  = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e.target.error);

            reader.readAsText(file);
        })
            .then((content) => (editor.value = content))
            .catch((error) => console.error('Error:', error));
    });

    document.body.removeChild(hidden);
}

document.getElementById('newfile').addEventListener('click', () => {
});

document.getElementById('savefile').addEventListener('click', savefile);
document.getElementById('openfile').addEventListener('click', openfile);
