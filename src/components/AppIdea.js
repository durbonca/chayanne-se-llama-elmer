
import removeSvg from "../assets/img/remove.svg"
import voteArrowSvg from "../assets/img/arrow.svg"

export default function AppIdea({idea, user, userVoted}){
    return (
        <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center">
        {/* <!-- remove idea --> */}
        {
        <img
          onClick="removeIdea"
          className="mr-3 cursor-pointer"
          v-if="userIdea"
          src={removeSvg}
          alt="remove idea"
        />}
        {/* <!-- info --> */}
        <section className="text-center sm:flex-1 sm:text-left">
          <h2 className="text-xl sm:text-2xl sm:leading-6">{ idea.name }</h2>
          <small>Por { idea.userName }</small>
        </section>
        {/* <!-- votos --> */}
        <section
          className="pt-3 border-t-2 mt-6 border-black sm:pl-3 sm:border-t-0 sm:border-l-2 sm:mt-0 sm:flex sm:items-center"
        >
          <h3 className="text-3xl font-bold text-center">{ idea.votes }</h3>
          { user && !userVoted && 
            <nav v-if="" className="flex justify-center sm:block">
            <img
              onClick="voteIdea(true)"
              className="w-10 cursor-pointer"
              src={voteArrowSvg}
              alt="votes up"
            />
            <img
              onClick="voteIdea(false)"
              className="w-10 cursor-pointer transform rotate-180"
              src={voteArrowSvg}
              alt="votes down"
            />
          </nav>}
        </section>
      </article>
    )
}