import { useState } from "react"

export default function AddIdea({user, doLogin, doLogout, db}){

    const [idea, setIdea] = useState('')

    const addIdea = async (event) => {
        event.preventDefault();
        try {
          await db.collection("ideas").add({
            name: idea,
            user: user.uid,
            userName: user.displayName,
            createdAt: Date.now(),
            votes: 0,
          });
        } catch (error) {
          console.error(error);
        }
        setIdea('')
      }; 

    const handleChange = (event) => {
        setIdea(event.target.value)
    }

    return (
        <section className="mb-6">
            <form onSubmit={addIdea} className="sm:flex">
            <input
                value={idea}
                onChange={handleChange}
                className="w-full p-3 sm:flex-auto"
                type="text"
                required
                placeholder="Escribe tu pregunta"
            />
            { 
            user &&
            <input
                className="w-full p-2 bg-gray-600 text-white sm:flex-1"
                type="submit"
                value="Enviar pregunta"
            />}
            </form>
            { !user ?
            <p className="user-actions">
            Primero <a onClick={() => doLogin()} href="#">Logueate</a> para preguntar, pana.
            </p> : 
            <p className="user-actions">
            🙋 Epale Pana { user.displayName }! Click <a onClick={() => doLogout()} href="#">Acá</a> para desloguear
            </p>}
        </section>
    )    
}