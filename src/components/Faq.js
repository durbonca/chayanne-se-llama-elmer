import React from 'react'
import { ItemFaq } from './ItemFaq'

function Faq() {
    return (
    <div className="container mx-auto p-4">
        <ItemFaq
            title="¿Como puedo preguntar?"
            message="Facil, te logueas"
            small=""
        />
        <ItemFaq
            title="¿Me van a preñar?"
            message="Siempre"
            small=""
        />
    </div>
    )
}

export default Faq
