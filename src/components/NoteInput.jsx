import React, { useState } from 'react';

function NoteInput({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleCharCount, setTitleCharCount] = useState(0);
  const titleCharLimit = 50;

  const handleTitleChange = (event) => {
    const inputTitle = event.target.value;
    if (inputTitle.length <= titleCharLimit) {
      setTitle(inputTitle);
      setTitleCharCount(inputTitle.length);
    }
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      onAddNote(title, body);
      setTitle('');
      setBody('');
      setTitleCharCount(0);
    }
  };

  return (
    <div className="note-input">
      <h2>Tambah Catatan</h2>
      <form onSubmit={handleSubmit}>
        <div className="note-input__title">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Judul"
            required
          />
          <p className="note-input__title__char-limit">{titleCharCount}/{titleCharLimit}</p>
        </div>
        <div className="note-input__body">
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Isi catatan"
            required
          />
        </div>
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}

export default NoteInput;
