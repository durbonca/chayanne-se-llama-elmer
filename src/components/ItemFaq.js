import React from 'react'

export const ItemFaq = ({title, message, small}) => {
    return (
        <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
            <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center bg-gray-200">
                <section className="text-center sm:flex-1 sm:text-left">
                    <h2 className="text-center text-xl sm:text-2xl sm:leading-6">{title}</h2>
                    <p className="text-left mt-4">{message}</p>
                    <p className="text-justify mt-2 text-xs">{small}</p>
                </section>
            </article>
        </div>
    )
}
