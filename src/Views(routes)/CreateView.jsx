import React, { useState, useEffect } from "react";
import BlocksCalendar from "../components/BlocksCalendar";
import db from "../../db";

const CreateView = () => {
  const [notes, setNotes] = useState([]);
  const data = {
    title: "Test",
    Text: "Test",
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const dataD = await db.get("Notes");
      setNotes(dataD || []);
    };
    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <BlocksCalendar className="col-span-3" />
      <div
        onClick={() => {
          db.add("Notes", data);
        }}
        className="col-start-5 z-10 pt-30 col-span-1"
      >
        Click mee
      </div>
      <div>
        {notes.map((note, index) => (
          <div key={note.id || index}>
            {note.title} - {note.Text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateView;
