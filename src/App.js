import { useState, useEffect } from 'react'



import {RefreshIcon} from '@heroicons/react/outline'

import { ResponsedIdea } from './components/RespondedIdea'
import { LoadingVote } from './components/LoadingVote'
import Search from './components/Search'
import Faq from "./components/Faq"
import Nav from "./components/Nav"
import Preguntar from "./components/Preguntar"
import { firebase, auth, db } from './firebase'
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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
  const [ideasResponded, setIdeasResponded] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [loadingVote, setLoadingVote] = useState(false);

  const showRemoveIdeaModal = idea => {
    setIdeaToRemove(idea);
    setIsModalActive(true);
  }

  const showResponderIdeaModal = idea => {
    setIdeaToResponder(idea);
    setIsModalResponderActive(true);
  }

  const removeIdea = async () => {
    setLoadingVote(true);
    try {
      await db.collection("ideas").doc(ideaToRemove.id).delete();
      setIdeaToRemove({});
      setIsModalActive(false);
    } catch (err) {
      console.error(err);
    }
    setLoadingVote(false);
  };

  const getIdeas = async () => {
    db.collection("ideas")
    .orderBy("createdAt", "desc")
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
        setIdeas(newIdeas.filter(idea=> !idea.url));
        setIdeasResponded(newIdeas.filter(idea=> !!idea.url));
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
    setLoadingVote(true)
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
    setLoadingVote(false)
  };

  const searchBoat = ( ideasResponded, searchList ) => {
    if(ideasResponded.length) { 
      if(searchList === null) {
        return <div>😥 Tu Búsqueda no arrojo ningún resultado...</div>
      }else {
        if(searchList.length > 0) {
          return searchList.map( idea => {
           return (
                 <ResponsedIdea
                   key={idea.createdAt}
                   className="idea"
                   user={user}
                   idea={idea}
                 />
             )
           }) } else {
           return ideasResponded.map( idea => {
             return (
                   <ResponsedIdea
                     key={idea.createdAt}
                     className="idea"
                     user={user}
                     idea={idea}
                   />
               )
             }) }
        }
      } 
      else 
      { return (<div className="flex items-center justify-center" ><RefreshIcon className="animate-spin w-16 h-16 mx-2.5 text-blue-500" /> cargando... </div>) } 
  }

  return (
  <BrowserRouter>
    <Nav className="mb-14" user={user} doLogin={doLogin} doLogout={doLogout} />
    { loadingVote && <LoadingVote/> }
    <Routes>
      <Route path="/preguntar"
        element={
        <Preguntar 
          user={user}
          doLogin={doLogin}
          db={db}
          ideas={ideas}
          admins={admins}
          showResponderIdeaModal={showResponderIdeaModal}
          showRemoveIdeaModal={showRemoveIdeaModal}
          userVotes={userVotes}
          ideaToRemove={ideaToRemove}
          ideaToResponder={ideaToResponder}
          voteIdea={voteIdea}
          setIsModalResponderActive={setIsModalResponderActive}
          setLoadingVote={setLoadingVote}
          doLogout={doLogout}
          isModalActive={isModalActive}
          isModalResponderActive={isModalResponderActive} 
          setIsModalActive={setIsModalActive} 
          setIdeaToResponder={setIdeaToResponder}
          removeIdea={removeIdea}
        />}
      />
      <Route path="/respuestas"
        element={
        <div className="container mx-auto p-4">
          <h1 className='text-center font-bold text-xl my-4'>PREGUNTAS RESPONDIDAS</h1>
          <Search ideasResponded={ideasResponded} setSearchList={setSearchList} />
            <div className="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
                {/* <!-- Idea respondida item --> */} 
                  { searchBoat(ideasResponded, searchList) }   
          {/* <!-- End Main box --> */}
            </div>
        </div>
        }
      />
    <Route path="/faq" element={<Faq />}/>
    <Route path="*" element={<Navigate replace to="/preguntar"/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
