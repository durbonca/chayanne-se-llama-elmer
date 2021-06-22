export default function AddIdea({...props}){

  const {user, doLogin, doLogout, addIdea} = props

    console.log(user)

    return (
        <section className="mb-6">
            <form onSubmit={() => addIdea()} className="sm:flex">
            <input
                v-model="idea"
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
            🙋 Epale Pana { user.user.displayName }! Click <a onClick={() => doLogout()} href="#">Acá</a> para desloguear
            </p>}
        </section>
    )    
}