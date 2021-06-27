import { useState, useEffect } from 'react'
import AppIdea from "./components/AppIdea";
import AddIdea from "./components/AddIdea";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { firebase, auth, db } from './firebase'
import './index.css';

function App() {

  // transition
  const Fade = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={1000}
      classNames="idea"
    >
      {children}
    </CSSTransition>
  );

  const [user, setUser] = useState(null)

  //ideas
  const [ideas, setIdeas] = useState([]);

  const getIdeas = async () => {
    db.collection("ideas")
    .orderBy("votes", "desc")
    .onSnapshot(
      (snapshot) => {
        const newIdeas = [];
        snapshot.docs.forEach((doc) => {
          let { name, user, userName, createdAt, votes } = doc.data();
          let id = doc.id;
          newIdeas.push({
            name,
            user,
            userName,
            createdAt,
            votes,
            id,
          });
        });
        setIdeas(newIdeas);
      },
      (error) => console.error(error)
    );
  }


  useEffect( () => {
      getIdeas()
    } ,[])


  const doLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      setUser(await firebase.auth().signInWithPopup(provider))
    } catch (error) {
      console.error(error);
    }
  };

  const doLogout = async () => {
    try {
      setUser(await firebase.auth().signOut())
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    {/* Main box */}
    <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
      <h1 className="mb-5 text-4xl text-center">Chayanne Se Llama Elmer</h1>
      {/* <!-- add remove idea modal -->
      <teleport to="body">
        <RemoveIdea
          v-if="isModalActive"
          :name="ideaToRemove.name"
          @remove-cancel="isModalActive = !isModalActive"
          @remove-ok="removeIdea"
        />
      </teleport>
      <!-- add idea -->*/}
      <AddIdea
        user={user}
        doLogin={doLogin}
        doLogout={doLogout}
        db={db}
      />
      
      {/* <!-- Idea item --> */}
      <TransitionGroup className="list-complete">
        { ideas.length && 
          ideas.map( idea => {
            return (
            <Fade key={idea.createdAt}>
              <AppIdea
                className="idea"
                user={user}
                idea={idea}
                /* voteIdea={voteIdea} */
                /* @remove-idea="showRemoveIdeaModal" */
              />
          </Fade> )
          })
          }
      </TransitionGroup>
      {/* <!-- End Main box --> */}
    </div>
  </div>
  );
}

export default App;
