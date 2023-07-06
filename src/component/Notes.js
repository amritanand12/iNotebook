import { React, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

import Noteitem from './Noteitem';
function Notes(props) {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log("getting the note...........")
            getNote();
        }
        else {
            navigate('/signup')
        }
        //eslint-disable-next-line
    }, [])


    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
        console.log("this is notes : ", note)
        // console.log()
        props.showAlert("Updated Successfully", "success")
    }

    const handleOnClick = (event) => {
        editNote({ id: note.id, title: note.etitle, description: note.edescription, tag: note.etag })
        refClose.current.click();
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setNote((prev) => { return ({ ...prev, [name]: value }) })
    }


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Note Title</label>
                                    <input type="text" className="form-control" id="etitle" placeholder="Enter title" name="etitle" minLength={5} required value={note.etitle} onChange={handleOnChange} />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="description"> Note Description</label>
                                    <input type="text" className="form-control" id="edescription" placeholder="description" name="edescription" minLength={5} required value={note.edescription} onChange={handleOnChange} />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="tag">Note Tag</label>
                                    <input type="text" className="form-control" id="etag" placeholder="tag" name="etag" value={note.etag} onChange={handleOnChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.etitle.length < 5 || note.etitle.length === 0} onClick={handleOnClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='NewNoteClass mb-1'>{notes.length === 0 ? 'No Notes To Display' : 'Your Notes'}</h2>
            <div className="container ">
                <div className='row my-1'>

                    {notes?.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes