import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NotesList from './components/NotesList';
import NoteInput from './components/NoteInput';
import { getInitialData } from './utils/index'; 
import './styles/style.css';

function App() {
  // Menggunakan fungsi initializer untuk state notes
  const [notes, setNotes] = useState(getInitialData); // Di sini menggunakan getInitialData sebagai fungsi
  const [searchQuery, setSearchQuery] = useState('');

  const addNote = (title, body) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes(prevNotes => [...prevNotes, newNote]); // Menggunakan fungsi updater
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // Menggunakan fungsi updater
  };

  const toggleArchive = (id) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
    )); // Menggunakan fungsi updater
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="note-app__header">
        <h1>Aplikasi Catatan</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Tambah Catatan</Link>
        </nav>
        <input
          type="text"
          placeholder="Cari catatan..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="note-app__body">
        <Routes>
          <Route path="/" element={<NotesList notes={filteredNotes} onDelete={deleteNote} onArchive={toggleArchive} />} />
          <Route path="/add" element={<NoteInput onAddNote={addNote} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
