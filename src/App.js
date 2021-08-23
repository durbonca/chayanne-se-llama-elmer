import { useState, useEffect } from 'react'
import AppIdea from "./components/AppIdea";
import AddIdea from "./components/AddIdea";
import RemoveIdea from "./components/RemoveIdea"
import ResponderIdea from "./components/ResponderIdea"
import { ResponsedIdea } from './components/RespondedIdea'
import Faq from "./components/Faq"
import Nav from "./components/Nav"
import { firebase, auth, db } from './firebase'
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  const [user, setUser] = useState(null);
  const [userVotes, setUserVotes] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [ideaToRemove, setIdeaToRemove] = useState({});
  const [isModalResponderActive, setIsModalResponderActive] = useState(false);
  const [ideaToResponder, setIdeaToResponder] = useState({});
  const [admins, setAdmins] = useState([]);
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

  const getIdeas = async () => {
    db.collection("ideas")
    .orderBy("votes", "desc")
    .onSnapshot(
      (snapshot) => {
        const newIdeas = [];
        snapshot.docs.forEach((doc) => {
          let { name, user, userName, url, createdAt, votes } = doc.data();
          let id = doc.id;
          newIdeas.push({
            name,
            user,
            userName,
            url,
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

  const getAdmins = async () => {
    const newAdmins = [];
    db.collection("admin").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let id = doc.id;
          newAdmins.push({
            id,
          });
        });
        setAdmins(newAdmins);
      },
      (error) => console.error(error)
    );
  }

  useEffect( () => {
      getIdeas();
      getAdmins();
      auth.onAuthStateChanged( async (auth) => {
        if (auth) {
          setUser(auth);
        } else {
          setUser(null);
        }
      });
    } ,[]);
  
  useEffect( () => {
  if(!!user) {
    db.collection("votes").doc(user.uid).onSnapshot( (doc) => {
    if (doc.exists) {
      let document = doc.data();
      if ("ideas" in document) {
        setUserVotes(document.ideas);
      }
    }
    })
    } else {
      setUserVotes([]);
    }
  }
  , [user]);
 
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

  const voteIdea = async ( id, type ) => {
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
          />
          
          {/* <!-- Idea item --> */}
            { ideas.length ? 
              ideas.map( idea => {
                return (
                <>
                { !idea.url &&
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
                }
              </> )
              }) : "cargando..."
              }
          {/* <!-- End Main box --> */}
        </div>
      </div>
      </Route>
      <Route path="/respuestas">
      <div className="container mx-auto p-4">
            <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
                {/* <!-- Idea respondida item --> */}
                  { ideas.length ? 
                    ideas.map( idea => {
                    return (<>
                      { !!idea.url &&
                          <ResponsedIdea
                            key={idea.createdAt}
                            className="idea"
                            user={user}
                            idea={idea}
                          />
                      } 
                    </>)
                    }) : "cargando..."
                    }
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
