import { useState, useEffect } from 'react'
import AppIdea from "./components/AppIdea";
import AddIdea from "./components/AddIdea";
import RemoveIdea from "./components/RemoveIdea"
import ResponderIdea from "./components/ResponderIdea"
import { ResponsedIdea } from './components/RespondedIdea'
import Faq from "./components/Faq"
import Nav from "./components/Nav"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { firebase, auth, db } from './firebase'
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


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

  const [user, setUser] = useState(null);
  const [userVotes, setUserVotes] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [ideaToRemove, setIdeaToRemove] = useState({});
  const [isModalResponderActive, setIsModalResponderActive] = useState(false);
  const [ideaToResponder, setIdeaToResponder] = useState({});
  //ideas
  const [ideas, setIdeas] = useState([]);

  const showRemoveIdeaModal = idea => {
    setIdeaToRemove(idea);
    setIsModalActive(true);
  }

  const showResponderIdeaModal = idea => {
    setIdeaToResponder(idea);
    setIsModalResponderActive(true);
  }

  const removeIdea = async () => {
    try {
      await db.collection("ideas").doc(ideaToRemove.id).delete();
      setIdeaToRemove({});
      setIsModalActive(false);
    } catch (err) {
      console.error(err);
    }
  };

  const responseIdea = async () => {
    try {
      // await db.collection("ideas").doc(ideaToRemove.id).delete();
      alert('cojo culo');
      setIdeaToResponder({});
      setIsModalResponderActive(false);
    } catch (err) {
      console.error(err);
    }
  }

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
      getIdeas();
      auth.onAuthStateChanged(async (auth) => {
        if (auth) {
          setUser(auth);
          /* setUserVotes(db.collection("votes").doc(user.uid).onSnapshot((doc) => {
              if (doc.exists) {
                let document = doc.data();
                if ("ideas" in document) {
                  user.votes = document.ideas;
                }
              }
            })); */
        } else {
          setUser(null);
          setUserVotes([]);
        }
      });
    } ,[])

  // get votes 

  

  const doLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.error(error);
    }
  };

  const doLogout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error);
    }
  };

  const voteIdea = async ({ id, type }) => {
    try {
      let votes = await db.collection("votes").doc(user.uid).get();
      if (votes.exists) {
        votes = votes.data().ideas;
        if (votes.find((vote) => vote === id)) {
          throw new Error("user already voted!");
        }
      }
      await db
        .collection("ideas")
        .doc(id)
        .update({
          votes: firebase.firestore.FieldValue.increment(type ? 1 : -1),
        });
      await db
        .collection("votes")
        .doc(user.uid)
        .set(
          {
            ideas: firebase.firestore.FieldValue.arrayUnion(id),
          },
          {
            merge: true,
          }
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <Router>
    <Nav user={user} doLogin={doLogin} doLogout={doLogout} />
    <Switch>
      <Route exact path="/">
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
              responderCancel={() => setIsModalResponderActive(!isModalResponderActive)}
              responderOk={() => responseIdea()}
            />
        }
          {/* <!-- add idea --> */}

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
                    userVotes={userVotes}
                    voteIdea={voteIdea}
                    removeIdea={showRemoveIdeaModal}
                    responderIdea={showResponderIdeaModal}
                  />
              </Fade> )
              })
              }
          </TransitionGroup>
          {/* <!-- End Main box --> */}
        </div>
      </div>
      </Route>
      <Route path="/respuestas">
      <div className="container mx-auto p-4">
            <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
                {/* <!-- Idea item --> */}
                <TransitionGroup className="list-complete">
                  { ideas.length && 
                    ideas.map( idea => {
                      return (
                      <Fade key={idea.createdAt}>
                        <ResponsedIdea
                          className="idea"
                          user={user}
                          idea={idea}
                          userVotes={userVotes}
                          voteIdea={voteIdea}
                          removeIdea={showRemoveIdeaModal}
                        />
                    </Fade> )
                    })
                    }
                </TransitionGroup>
          {/* <!-- End Main box --> */}
            </div>
        </div>
      </Route>
      <Route>
        <Faq/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
