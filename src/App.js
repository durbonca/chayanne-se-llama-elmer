import { useState } from 'react'
import AppIdea from "./components/AppIdea";
import AddIdea from "./components/AddIdea";
import { firebase, auth, db } from './firebase'

function App() {

  const [user, setUser] = useState(null)

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

  const addIdea = () => {
    console.log('Agregando mi idea')
  }
  
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
        addIdea={addIdea}
      />{/* 
      <!-- Idea item -->
      <transition-group name="list-complete">
        <AppIdea
          :user="user"
          v-for="idea in ideas"
          :key="idea.createdAt"
          :idea="idea"
          @vote-idea="voteIdea"
          @remove-idea="showRemoveIdeaModal"
          className="idea"
        />
      </transition-group>
      <!-- End Main box --> */}
    </div>
  </div>
  );
}

export default App;
