import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './components/auth'
import { db, auth, storage } from './config/firebase';
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';
import Hero from './components/Hero';
import Display from './components/Display';



function App() {
  const [userList, setUserList] = useState([])


  //New User States
  const [newUserTitle, setNewUserTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isNewUserOscar, setIsNewUserOscar] = useState(false);

  //Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  const usersCollectionRef = collection(db, "users")

  const getUserList = async () => {
    try{
    const data = await getDocs(usersCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(), 
      id: doc.id,
    }))

    console.log(filteredData);

    setUserList(filteredData);
    } catch (err){
      console.error(err)
    }
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id )
    await deleteDoc(userDoc);
  }

  const updateUserTitle = async (id) => {
    const userDoc = doc(db, "users", id )
    await updateDoc(userDoc, {title: updatedTitle});
  }

  const onSubmitUser = async () => {
    try{
    await addDoc(usersCollectionRef, {
        title: newUserTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewUserOscar,
        userId: auth?.currentUser?.uid, 
      });

      getUserList();
    } catch (err){
      console.error(err);
    }
  }

  useEffect(() => {
    const getUserList = async() => {
      try{
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(filteredData);
      } catch(err){
        console.error(err);
      }
    };
    getUserList ();
  }, [onSubmitUser]);


  const uploadFile = async () => {
    if (fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
    await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className='App'>
          <Hero />
          <Display />
       { /* <AuthPage />*/}   

        {/*  <div>
             <input 

            placeholder='User title' 
            onChange={(e) => setNewUserTitle(e.target.value)}
            />

            <input

             placeholder='Release Date' type="number"
             onChange={(e) => setNewReleaseDate(e.target.value)}
            />

            <input 
            type="checkbox" 
            checked = {isNewUserOscar}
            onChange={(e) => setIsNewUserOscar(e.target.checked)}  
            />

            <label> Received an Oscar </label>
            <button onClick={onSubmitUser}>Submit User</button>


          </div>

          <div>
            {userList.map((user) => (
              <div>
                <h1> {user.title} </h1>

                <p>Release Date: {user.releaseDate} </p>

                <button onClick={() => deleteUser(user.id)}> Delete User</button>

                <input 
                placeholder='new title'
                onChange={(e) => setUpdatedTitle(e.target.value)}
                
                />
                <button onClick={() => updateUserTitle(user.id)} >Update Title</button>

              </div>
            ))}
          </div>

              <div>
                <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}> Upload File</button>
              </div> */}
    </div>


  );
}

export default App;
