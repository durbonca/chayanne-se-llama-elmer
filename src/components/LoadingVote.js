import {RefreshIcon} from '@heroicons/react/outline'
import React from 'react'

export const LoadingVote = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-16 z-10 w-full bg-white flex justify-center items-center">
            <RefreshIcon className="animate-spin w-16 h-16 mx-2.5 text-blue-500" />
            Enviando...
        </div>
    )
}
