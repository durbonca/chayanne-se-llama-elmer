export default function RemoveIdea({name, removeCancel, removeOk}){
    return (
    <div className="w-full flex fixed top-40 lg:justify-center">
        <article className="w-3/4 p-4 bg-gray-400 shadow-2xl">
          <p className="text-center text-xl">Borrar La pregunta { name }?</p>
          <section className="flex justify-end">
            <button
              onClick={ removeOk }
              className="p-3 m-1 bg-blue-500 text-white"
            >
              PLOMO
            </button>
            <button onClick={ removeCancel } className="p-3 m-1 bg-gray-200">
              CANCELAR
            </button>
          </section>
        </article>
    </div> )
}