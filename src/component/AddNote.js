import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Navbar from './Navbar';


function AddNote(props) {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleOnClick = (e) => {
        e.preventDefault();
        setNote({ title: note.title, description: note.description, tag: note.tag })
        addNote(note)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success")
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setNote((prev) => { return ({ ...prev, [name]: value }) })
    }
    
    return (<>

        <h2 className="NewNoteClass">Add Note</h2>
        <div className="container ">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="title">Note Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title" name="title" value={note.title} onChange={handleOnChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description"> Note Description</label>
                    <input type="text" className="form-control" id="description" placeholder="description" name="description" value={note.description} minLength={5} required onChange={handleOnChange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag"> Tag</label>
                    <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" value={note.tag} onChange={handleOnChange} />
                </div>

                <div className="d-flex justify-content-center">
                    <button disabled={note.title.length === 0} type="submit" className="btn btn-primary mb-3" onClick={handleOnClick}>Submit</button>
                </div>
            </form>
            <hr className='text-success w-100 p-1 minLength={5} required ' />
        </div>
    </>
    )
}

export default AddNote