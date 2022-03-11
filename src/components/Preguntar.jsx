import React from 'react'
import AddIdea from "./AddIdea";
import RemoveIdea from "./RemoveIdea"
import {RefreshIcon} from '@heroicons/react/outline'
import AppIdea from "./AppIdea";
import ResponderIdea from "./ResponderIdea"

const Preguntar = ({ 
    user,
    doLogin,
    doLogout,
    db,
    ideas,
    voteIdea,
    showRemoveIdeaModal,
    showResponderIdeaModal,
    userVotes,
    setLoadingVote,
    isModalActive, 
    setIsModalActive, 
    removeIdea, 
    isModalResponderActive,
    admins,
    ideaToRemove,
    ideaToResponder,
    setIsModalResponderActive,
    setIdeaToResponder,
}) => {
  return (
    <div className="container mx-auto p-4">
        {/* Main box */}
        <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
          <h1 className="mb-5 text-4xl text-center">Chayanne Se Llama Elmer</h1>
          
          {/* <!-- add remove idea modal --> */}
          {
          isModalActive &&
            <RemoveIdea
              name={ideaToRemove.name}
              removeCancel={() => setIsModalActive(!isModalActive)}
              removeOk={() => removeIdea()}
            />
        }
          {/* <!-- add idea --> */}

          {/* <!-- add remove idea modal --> */}
          {
          isModalResponderActive &&
            <ResponderIdea
              idea={ideaToResponder}
              db={db}
              responderCancel={() => {setIsModalResponderActive(!isModalResponderActive); setIdeaToResponder({});}}
            />
        }
          {/* <!-- add idea --> */}

          <AddIdea
            user={user}
            doLogin={doLogin}
            doLogout={doLogout}
            db={db}
            setLoadingVote={setLoadingVote}
          />
          
          {/* <!-- Idea item --> */}
            { ideas?.length ? 
              ideas.map( idea => {
                return (
                    <AppIdea
                      key={idea.createdAt}
                      className="idea"
                      user={user}
                      idea={idea}
                      admins={admins}
                      userVotes={userVotes}
                      voteIdea={voteIdea}
                      removeIdea={showRemoveIdeaModal}
                      responderIdea={showResponderIdeaModal}
                    />
               )
              }) : <div className="flex items-center justify-center" ><RefreshIcon className="animate-spin w-16 h-16 mx-2.5 text-blue-500" /> cargando... </div>
              }
          {/* <!-- End Main box --> */}
        </div>
      </div>
  )
}

export default Preguntar