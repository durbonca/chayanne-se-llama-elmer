export default function RemoveIdea(){
    return (
    <div className="w-full flex justify-center fixed top-40">
        <article className="w-3/4 p-4 bg-gray-400 shadow-2xl">
          <p className="text-center text-xl">Borrar La pregunta { name }?</p>
          <section className="flex justify-end">
            <button
              onClick="$emit('remove-ok')"
              className="p-3 m-1 bg-blue-500 text-white"
            >
              PLOMO
            </button>
            <button onClick="$emit('remove-cancel')" className="p-3 m-1 bg-gray-200">
              CANCELAR
            </button>
          </section>
        </article>
    </div> )
}