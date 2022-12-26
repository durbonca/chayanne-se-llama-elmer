export function ResponsedIdea({idea, user, admins, responderIdea}){

  return (
    <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center bg-gray-200">
      <section className="text-center sm:flex-1 sm:text-left">
        <h2 className="text-xl sm:text-2xl sm:leading-6 break-words">{ idea.name }</h2>
        <small>Gracias { idea.userName } por tu pregunta 💙</small>
        <p className="text-left">Te invitamos a escuchar la respuesta en este 👉 <a className="underline text-blue-800" href={idea.url} target="_blank" rel="noreferrer">enlace</a>!
        { !!user &&
          admins.find( admin => admin.id === user.uid) &&
          <p 
            className="text-blue-500 cursor-pointer"
            onClick={() => responderIdea(idea)}
          >
            Editar enlace de respuesta...
          </p>
          }
        </p>
      </section>
    </article>
  )
}