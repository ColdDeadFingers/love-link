import './App.css';
import { useState, useEffect } from 'react';
import AuthPage from './components/auth'
import { db, auth, storage } from './config/firebase';
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';



function App() {
  const [movieList, setMovieList] = useState([])


  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "users")

  const getMovieList = async () => {
    try{
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(), 
      id: doc.id,
    }))

    console.log(filteredData);

    setMovieList(filteredData);
    } catch (err){
      console.error(err)
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "users", id )
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "users", id )
    await updateDoc(movieDoc, {title: updatedTitle});
  }

  const onSubmitMovie = async () => {
    try{
    await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid, 
      });

      getMovieList();
    } catch (err){
      console.error(err);
    }
  }

  useEffect(() => {
    const getMovieList = async() => {
      try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch(err){
        console.error(err);
      }
    };
    getMovieList ();
  }, [onSubmitMovie]);


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
          <AuthPage />

          <div>
            <input 

            placeholder='Movie title' 
            onChange={(e) => setNewMovieTitle(e.target.value)}
            />

            <input

             placeholder='Release Date' type="number"
             onChange={(e) => setNewReleaseDate(e.target.value)}
            />

            <input 
            type="checkbox" 
            checked = {isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}  
            />

            <label> Received an Oscar </label>
            <button onClick={onSubmitMovie}>Submit Movie</button>


          </div>

          <div>
            {movieList.map((movie) => (
              <div>
                <h1> {movie.title} </h1>

                <p>Release Date: {movie.releaseDate} </p>

                <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

                <input 
                placeholder='new title'
                onChange={(e) => setUpdatedTitle(e.target.value)}
                
                />
                <button onClick={() => updateMovieTitle(movie.id)} >Update Title</button>

              </div>
            ))}
          </div>

              <div>
                <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}> Upload File</button>
              </div>
    </div>


  );
}

export default App;