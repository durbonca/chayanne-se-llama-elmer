function ResponderIdea({idea, responderCancel, responderOk}) {
    return (
        <div className="w-full flex fixed top-40 lg:justify-center">
        <article className="w-3/4 p-4 bg-gray-400 shadow-2xl">
          <p className="text-center text-xl mb-4">Respondiendo pregunta { idea.name }</p>
          <form onSubmit={responderOk}>
          <section className="flex flex-col justify-start"> 
            <label for="link" className="mb-3">Enlace Respuesta</label>
            <input id="link" name="link" className="w-full md:w-3/4 h-8 mb-3 px-4 rounded" required/>
          </section>
          <section className="flex justify-around">
            <button onClick={ responderCancel } className="p-3 m-1 bg-gray-200">
              CANCELAR
            </button>
            <button
              type="submit"
              className="p-3 m-1 bg-blue-500 text-white"
            >
              RESPONDER ESA VERGA
            </button>
            
          </section>
          </form>
        </article>
    </div>
    )
}

export default ResponderIdea


