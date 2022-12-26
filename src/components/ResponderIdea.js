import { Formik, Form, Field, ErrorMessage } from 'formik';
import { responseValidation } from '../schemas/response-validation'

function ResponderIdea({idea, responderCancel, db}) {

    const linkValue = idea.url ? idea.url : ''
    const handleSubmit = async (values) => {
      try {
        await db.collection("ideas").doc(idea.id).update({
          url: values.link
        })
      } 
      catch (error) {
        console.error(error);
      }
      responderCancel()
    }

    return (
        <div style={{maxWidth: '100vw'}} className="w-full flex fixed top-40 lg:justify-center">
        <article className="w-5/6 p-4 bg-gray-400 shadow-2xl">
          <p className="text-center text-xl mb-4">Respondiendo pregunta { idea.name.slice(0,180) }{idea.name.length > 180 && '...'}</p>
          <Formik initialValues={{ link: linkValue }} validationSchema={responseValidation} onSubmit={handleSubmit}>
            { ({ isSubmitting, values }) => (
              <Form>
              <section className="flex flex-col mb-6 justify-start"> 
                <label htmlFor="link" className="mb-3">Enlace Respuesta</label>
                <Field 
                  value={values.link}
                  id="link" 
                  name="link" 
                  as="input" 
                  placeholder="https://" 
                  className="w-full md:w-3/4 h-8 text-2xl mb-3 px-4 rounded"/>
                <div className="text-red-500">
                  <ErrorMessage name="link"/>
                </div>
              </section>
              <section className="flex justify-around">
                <button onClick={ responderCancel } className="p-3 m-1 bg-gray-200">
                  CANCELAR
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="p-3 m-1 bg-blue-500 text-white"
                  >
                  RESPONDER ESA VERGA
                </button>
              </section>
              </Form>
            )}
          </Formik>
        </article>
    </div>
    )
}
export default ResponderIdea


