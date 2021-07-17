export function ResponsedIdea({idea}){

  return (
    <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center bg-gray-200">
      <section className="text-center sm:flex-1 sm:text-left">
        <h2 className="text-xl sm:text-2xl sm:leading-6">{ idea.name }</h2>
        <small>Gracias { idea.userName } por tu pregunta 💙</small>
        <p className="text-left">Te invitamos a escuchar la respuesta en este 👉 <a className="underline text-blue-800" href={idea.url} target="_blank">enlace</a>!</p>
      </section>
    </article>
  )
}