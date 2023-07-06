import { React, useContext } from 'react';
import noteContext from '../context/notes/noteContext';
function Noteitem(props) {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;




    return (
        <>
            <div className="card col-md-3 mx-2 my-2">
                <div className=" card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-3" onClick={() => deleteNote(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { props.updateNote(note)}} ></i>
                </div>
            </div>

        </>
    )
}

export default Noteitem