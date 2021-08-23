import { useState } from "react"

export default function AddIdea({user, doLogin, doLogout, db, setLoadingVote}){

    const [idea, setIdea] = useState('')

    const addIdea = async (event) => {
      setLoadingVote(true);
        event.preventDefault();
        try {
          await db.collection("ideas").add({
            name: idea,
            user: user.uid,
            userName: user.displayName,
            url: '',
            createdAt: Date.now(),
            votes: 0,
          });
        } catch (error) {
          console.error(error);
        }
        setIdea('')
      setLoadingVote(false);
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
                className="w-full p-2 bg-gray-700 text-white sm:flex-1 cursor-pointer"
                type="submit"
                value="Enviar pregunta"
            />}
            </form>
            { !user ?
            <p className="user-actions">
            Primero <button className="underline text-blue-800" onClick={() => doLogin()}>Logueate</button> para preguntar, pana.
            </p> : 
            <p className="user-actions">
            🙋 Epale Pana { user.displayName }! Click <button className="underline text-blue-800" onClick={() => doLogout()}>Acá</button> para desloguear
            </p>}
        </section>
    )    
}