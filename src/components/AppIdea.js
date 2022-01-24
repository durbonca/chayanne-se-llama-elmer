
import removeSvg from "../assets/img/remove.svg"
import { AcademicCapIcon, ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline'

export default function AppIdea({idea, user, userVotes, voteIdea, removeIdea, responderIdea, admins}){

  const userVoted = () => {
    if (userVotes) {
      return !(userVotes.find((item) => item === idea.id))
    }
  };

  return (
      <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center">
      {/* <!-- remove idea --> */}
      { !!user && (user.uid === idea.user ||
        admins.find( admin => admin.id === user.uid)) &&
      <img
        onClick={() => removeIdea(idea)}
        className="mr-3 cursor-pointer"
        src={removeSvg}
        alt="remove idea"
      />}
      {/* <!-- info --> */}
      <section className="text-center sm:flex-1 sm:text-left">
        <h2 className="text-xl sm:text-2xl sm:leading-6 break-words">{ idea.name }</h2>
        <small>Por { idea.userName }</small>
      </section>
      {/* <!-- votos --> */}
      <section
        className="pt-3 border-t-2 mt-6 border-black sm:pl-3 sm:border-t-0 sm:border-l-2 sm:mt-0 sm:flex sm:items-center"
      >
        <h3 className="text-3xl mx-3 font-bold text-center">{ idea.votes }</h3>
        { !!user && userVoted() && 
          <nav v-if="" className="flex justify-center sm:block">
          <ThumbUpIcon
            onClick={() => voteIdea(idea.id, true)}
            className="w-8 cursor-pointer text-gray-500 hover:text-gray-700"
            alt="votes up"
          />
          <ThumbDownIcon
            onClick={() => voteIdea(idea.id, false)}
            className="w-8 cursor-pointer text-gray-500 hover:text-gray-700"         
            alt="votes down"
          />
        </nav>}
        { !!user &&
          admins.find( admin => admin.id === user.uid) &&
          <div className="flex justify-end">
            <AcademicCapIcon 
            onClick={() => responderIdea(idea)}
            className="ml-3 cursor-pointer h-8 w-8 text-gray-500 hover:text-gray-700 text-right" 
            aria-hidden="true" />
          </div>
        }
      </section>
    </article>
  )
}