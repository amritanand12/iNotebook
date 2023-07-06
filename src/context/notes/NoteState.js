import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"


  const [notes, setNote] = useState([])
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }  
      });
      setNote(...notes, await response.json())
      console.log("THis is notes", notes);
    } catch (error) {
      console.log(error);
    }

  }

  //Add Note Api call
  const addNote = async (note) => {
    try {
      const response = await fetch(`${host}/api/note/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(note)
      });
      const data = await response.json()
      // console.log(data)
      setNote((prev) => { return ([...prev, data]) })
      
    } catch (error) {
      console.log("Error in adding notes", error)
    }

  }
  //Delete Note Api call
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    console.log(id)
    const json = await response.json();
    console.log(json);
    const array = notes.filter((item) => {
      if (item._id === id) {
        return false;
      } else {
        return item;
      }
    })
    setNote(array);
  }

  //Edit Note Api call
  const editNote = async ({ id, title, description, tag }) => {
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {//here notes is array of objects
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, setNote, addNote, editNote, deleteNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  ) 
}

export default NoteState;