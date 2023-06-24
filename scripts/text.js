class Text {
    _pos = { start: 0, end: 0 };
    _lines = ['']
    _selected = { line: 0, text: '' };

    _reconfig() {
        this._pos = { start: editor.selectionStart, end: editor.selectionEnd };
        this._lines = editor.value.split('\n');
        this._selected = {
            line: editor.value.substring(0, this._pos.start).split('\n').length - 1,
            text: editor.value.substring(this._pos.start, this._pos.end),
        };
    }

    _finish({ start = undefined, end = start, content = undefined }) {
        this.set(content ?? editor.value);
        editor.focus();
        editor.setSelectionRange(start ?? this._pos.start, end ?? this._pos.end);
        localStorage.setItem('textdoc', editor.value);
    }

    set(text) {
        editor.value = text;
        preview.innerHTML = converter.makeHtml(text);
    }

    add(open, close = open) {
        this._reconfig();

        if (open === '<br>')
            return this._finish({
                start: this._pos.end + open.length + close.length,
                end: this._pos.end + open.length + close.length,
                content: editor.value.substring(0, this._pos.start) + open + this._selected.text + close + editor.value.substring(this._pos.end),
            });

        if (!this._selected.text.startsWith(open) && (!this._selected.text.endsWith(close) || close === ''))
            this._finish({
                end: this._pos.end + open.length + close.length,
                content: editor.value.substring(0, this._pos.start) + open + this._selected.text + close + editor.value.substring(this._pos.end),
            });
    }

    rem(open, close = open) {
        this._reconfig();

        if (this._selected.text.startsWith(open) && (this._selected.text.endsWith(close) || close === ''))
            this._finish({
                end: this._pos.end - open.length - close.length,
                content: editor.value.substring(0, this._pos.start) + this._selected.text.substring(open.length, this._selected.text.length - close.length) + editor.value.substring(this._pos.end),
            });
    }

    toggle(open, close = open) {
        this._reconfig();

        if (this._selected.text.startsWith(open) && this._selected.text.endsWith(close)) this.rem(open, close);
        else this.add(open, close);
    }

    addStart(text) {
        this._reconfig();

        const hashedLine = text + (this._lines[this._selected.line].startsWith(text) ? '' : ' ') + this._lines[this._selected.line].trim();
        this._lines[this._selected.line] = hashedLine;

        this._finish({ content: this._lines.join('\n') });
    }

    remStart(text) {
        this._reconfig();

        if (this._lines[this._selected.line].startsWith(text)) {
            const hashedLine = this._lines[this._selected.line].slice(text.length, this._lines[this._selected.line].length).trim();
            this._lines[this._selected.line] = hashedLine;
        }

        // FIX: When the cursor is at the end of the line if moves to the next one
        this._finish({ content: this._lines.join('\n') });
    }

    toggleStart(text) {
        this._reconfig();

        if (this._lines[this._selected.line].startsWith(text)) this.remStart(text);
        else this.addStart(text);
    }
}
