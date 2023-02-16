import React, {useContext} from 'react'
import { UserContext } from '../context/userContext';

export default function AddPost() {

    const {user, setUser} = useContext(UserContext);


    const handleAddPost = (event) => {
        event.preventDefault();
        
        let newPost = {
            content : event.target.elements.content.value,
            id : user.infos.id
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        };
        
        console.log(newPost);

        fetch(`http://localhost:5000/addPost`, requestOptions)
        .then((response) => response.json())
       

        event.target.reset();
    }


  return (
    <form onSubmit={handleAddPost}>
        <h2>Créer une publication</h2>
        <div>
            <label htmlFor="content">Quoi de neuf ?</label>
            <input type="text" id='content'/>
        </div>
            <button >PUBLIER</button>
    </form>
  )
}
