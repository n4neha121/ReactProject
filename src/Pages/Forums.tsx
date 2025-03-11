import { FC, useEffect, useState } from "react";
import '../Css/Home.css';
import { Icons } from "../Constants";
const Forum: FC = () => {
    const [note, setNote] = useState<string>("");
    const [notes, setNotes] = useState<string[]>([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleAddNote();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [note]);
    const handleAddNote = () => {
        if (note.trim() === "") return;
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        console.log('notesss:;', updatedNotes);
        setNote("");
    };

    const handleClearNotes = () => {
        setNotes([]);
        localStorage.removeItem("notes");
    };

    return (
        <div style={{ padding: "20px", margin: "auto" }}>
            <div style={{
                top: 15, position: 'fixed',
                left: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2>Share Description and Feedback </h2>
                <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="inputArea"
                />
                <div style={{ marginTop: '5px', display: "flex", justifyContent: 'center', gap: '10px' }}>
                    <button onClick={handleAddNote} className="buttonColor">
                        <p className="buttonTxt">
                            Add Note
                        </p>
                        <div style={{ width: '55px' }} />
                    </button>
                    <button onClick={handleClearNotes} className="buttonColor">
                        <p className="buttonTxt">Clear Notes</p>
                    </button>
                </div>
                <ul>
                    {notes.map((n, index) => (
                        <li key={index}>{n}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};




export default Forum;