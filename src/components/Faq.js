import React from 'react'
import { ItemFaq } from './ItemFaq'

function Faq() {
    return (
    <div className="container mx-auto p-4">
        <ItemFaq
            title="¿Que es esto? ¿En donde estoy?"
            message="Estas en el 'Sistema Elmer Nominal De Discusiones Objetivas - BETA' ó 'S.E.N.D.O-BETA', que es
            básicamente nuestro sistema de recolección de preguntas y respuestas para el segmento 'Chayanne se 
            Llama Elmer' de el podcast 'El Corito Histórico'"
            small="Aunque si llegaste aca asumimos que sabes de que va este beta, pana."
        />
        <ItemFaq
            title="¿Como puedo preguntar?"
            message="En el sección 'preguntar' te logueas con tu cuenta de Google, solo asi se 
            te activara el botón de enviar tu pregunta"
            small="También te puedes loguear también desde el menu en el avatar arriba a la derecha haciendo click"
        />
        <ItemFaq
            title="¿Es obligatorio loguearme?"
            message="Si, la intención de esto no es porque vamos a guardar tus datos, ni te vamos a enviar 
            correos, ni vender tu información, ni nada de ello. Es solo para evitar la famosa figura del 
            'Preguntador Anónimo', nos interesa dar el reconocimiento a la persona que hizo la pregunta"
            small=""
        />
        <ItemFaq
            title="¿Y si no tengo cuenta de google?"
            message="Lamentablemente el manganzón de nuestro programador por los momentos habilito solo 
            la opción con cuentas Google por los momentos"
            small="Pero nos prometió en algún momento iba a habilitar otras opciones de Login, esperamos a que no sea pura coba."
        />
        <ItemFaq
            title="¿Puedo preguntar lo que quiera?"
            message="Antes de hacer cualquier pregunta te invitamos a pasar a la sección de 'preguntas respondidas' en el Menu. 
            Puedes usar el buscador por la palabra clave y revisar si tu pregunta ya fue respondida por nosotros, allí encontraras 
            el enlace donde ya hablamos sobre el tema."
            small="Intenta de que tu pregunta sea coherente, se pueda entender, no este repetida y no sea una chavistada."
        />
        <ItemFaq
            title="¿De verdad responden todas las preguntas?"
            message="Hacemos nuestro mayor esfuerzo por aclarar todas las dudas, aunque son muchas y nuestra comunidad cada dia crece mas 
            consideramos principalmente las preguntas mas votadas por otros usuarios y las que mas nos llamen la atención"
            small="Las preguntas se responden todas las semanas los dias viernes a las 9:30 am - Hora Venezuela"
        />
        <ItemFaq
            title="¿Y cuando responden MI pregunta?"
            message="Tratamos de tomar la mayor cantidad de preguntas semanalmente haciendo la tarea, pero por el espacio 
            limitado de tiempo solo podemos escoger unas cuantas, si TU pregunta no sale una semana es posible que 
            la otra semana pueda aparecer si es una buena pregunta y esta entre las mas votadas por la audiencia."
            small=""
        />
        <ItemFaq
            title="¿Como voto por una pregunta?"
            message="Puedes votar a favor o en contra de las otras preguntas de otros usuarios (incluso tu propia pregunta) una única vez, 
            a la derecha de cada pregunta aparece un numero, esa
            es la cantidad de likes que tiene esa pregunta, puedes votar una única vez en los iconos de likes están al lado"
            small="Pulgar arriba para indicar que te gusta, pulgar hacia abajo para indicar lo contrario, para votar tienes que estar logueado."
        />
        <ItemFaq
            title="Me equivoque ¿puedo corregirlo?"
            message="Si no estas seguro de tu pregunta, puedes borrarla en la 'X' que aparece a la izquierda de tu pregunta y 
            enviarla nuevamente, 
            lamentablemente el voto si no se puede cambiar, ni editar aun tu pregunta directamente, quizás en un futuro"
            small="las preguntas cuando son borradas no pueden volver a recuperar los votos de la comunidad"
        />
        <ItemFaq
            title="¡AUXILIO! ¡ALGUIEN BORRO MI PREGUNTA!"
            message="Nuestro equipo de robots 🤖 (anti-chavistadas) esta muy atento de borrar algunas preguntas o 
            de marcarlas como ya respondidas para evitar acumularlas en la bandeja de entrada."
            small=""
        />
        <ItemFaq
            title="¿Es verdad que Andres Bello invento la palabra 'Totona'?"
            message="NO, PANA NO! HASTA CUANDO!? DE VERDAD DEJEN DE ANDAR DICIENDO ESA CHAVISTADA"
            small=""
        />
        <ItemFaq
            title="¡Guao panas me encanto todo esto! ¿Puedo Colaborar?"
            message="Siempre puedes colaborar con nosotros a traves de nuestro Patreon para que apoyes nuestro contenido. 
            Si eres programador y quieres ayudar con cambios o mejoras a la app, puedes contactar a nuestro programador 'Manuel Duran'"
            small="Lo encuentras en todas las redes sociales siempre como @durbonca"
        />
    </div>
    )
}

export default Faq
