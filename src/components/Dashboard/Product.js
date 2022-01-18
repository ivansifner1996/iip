import React, {useState, useEffect} from 'react'
import firebaseService from "../../backend/firebaseService";

const Product = ({tutorial, refreshList}) => {
    const [currentTutorial, setCurrentTutorial] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
      console.log("renderanje producta");
      setCurrentTutorial({key: tutorial.key,
                      category : tutorial.category,
                      id : tutorial.id,
                      title : tutorial.title,
                      before : tutorial.before,
                      after : tutorial.after,
                      link : tutorial.link});
    }, [tutorial])

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setCurrentTutorial({...currentTutorial, title : title});
    }

    const onChangeBefore = (e) => {
        const before = e.target.value;
        setCurrentTutorial({...currentTutorial, before : Number(before)});
    }

    const onChangeAfter = (e) => {
        const after = e.target.value;
        setCurrentTutorial({...currentTutorial, after : Number(after)});
        console.log(currentTutorial);
    }

    const updateProduct = () => {
        const data = {
            title : currentTutorial.title,
            before : currentTutorial.before,
            after : currentTutorial.after
        }
        console.log(`Kategorija iznosi ${currentTutorial.category}`);
        console.log(`Tip od befora je ${typeof(before)} a od aftera je ${typeof(after)}`)
        firebaseService.update(currentTutorial.key, currentTutorial.category, currentTutorial.id, data)
          .then(() => {setMessage("Uspjesno ste azurirali proizvod");
        }).catch((e) => {
                console.log(e);
            });
    }

    const deleteProduct = () => {
        console.log(`Kod delete ti je key ${currentTutorial.key}`);
        firebaseService.deleteRecord(currentTutorial.key, currentTutorial.category, currentTutorial.id)
            .then(() => {
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
        firebaseService.deleteFromStorage(currentTutorial.link)
    }


    return (
        <div>
           <h4>Proizvod</h4>
        {currentTutorial ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Naziv</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Prije</label>
                <input
                  type="number"
                  className="form-control"
                  id="before"
                  value={parseInt(currentTutorial.before)}
                  onChange={onChangeBefore}
                />
              </div>
                <div className="form-group">
                <label htmlFor="description">Poslije</label>
                <input
                  type="number"
                  className="form-control"
                  id="after"
                  value={parseInt(currentTutorial.after)}
                  onChange={onChangeAfter}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={deleteProduct}
              style={{backgroundColor: '#dc3545', borderColor: '#dc3545'}}
            >
              Obrisi
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateProduct}
              style={{backgroundColor: '#00ff7f', borderColor: '#00ff7f'}}
            >
              Azuriraj
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Odaberite proizvod...</p>
          </div>
        )} 
        </div>
    )
}

export default Product
