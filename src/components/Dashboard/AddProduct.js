import 'react-image-crop/dist/ReactCrop.css';
import './custom-image-crop.css'
import './Dashboard.css'
import './AddProduct.css'
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react'
import ReactCrop from 'react-image-crop'
import firebaseService from "../../backend/firebaseService";
import { storage } from '../../firebase';
import { useStateValue } from '../StateProvider/StateProvider';
import { manCategory, womenCategory } from './Options';

const AddProduct = () => {
    const acceptedFileTypes = 'image/x-png, image/jpg, image/jpeg, image/gif'
    const fileInputRef = React.createRef();
    console.log('komponenta se opet rerenderala');

    const [src, selectFile] = useState(null);
    const [crop, setCrop] = useState({aspects: 16 / 9});
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [product, setProduct] = useState({title : '',
                                            before: 0, 
                                            after: 0, 
                                            id: null,
                                            });

    const [options, setOptions] = useState(null);
    const [type, setType] = useState(null);                                        
    const [{user }] = useStateValue();

    useEffect(() => {
        console.log(`user ti iznosi ${user}`);
        if(type != null){
        setOptions(type.map((el, idx) => (
        <option key={idx} value={el.path} style={{color:'#eee'}}>{el.naziv}</option>)))
        }
    }, [type])


    const handleSubmit = async(e) => {
        e.preventDefault();
        let imageName = 'posts/' + user.email + '/' + Date.now() + ".png";
        if(product.title && product.before && product.after){
            let url =  await postMessage(imageName);
            console.log(`Rezultat ti je ${url}`);
            const noviProizvod = {...product, id: new Date().getTime().toString(), link : url};
            const novica = document.getElementsByName("category")[0].value;
            firebaseService.addToCategory(noviProizvod, novica)
                .then(() => {
                    console.log("Created new item successfully");
                })
                .catch((e) => {
                    console.log(e);
                });
            setProduct({title: '', 
                        before: 0,
                        after: 0, 
                        id: null,
                        });
        }
    }
    const handleFileSelect = event => {
        console.log(typeof(event.target.files[0]));
        selectFile(URL.createObjectURL(event.target.files[0]))
        console.log(`Tu si a src ti je ${src}`);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = (["after", "before"].indexOf(name) > -1) ? 
                                            parseInt(e.target.value) : 
                                            e.target.value;
        console.log(`value ti je ${value} a tipa je ${typeof(value)}`);
        if(value == '/men'){
            setType(manCategory);
            setProduct({...product , tip: value});
        }else if(value == '/women'){
            setType(womenCategory);
            setProduct({...product , tip: value});
        }
        setProduct({...product, [name]: value})
    }

const postMessage = async function(imageName) {
  console.log("zoves tu funkciju");
  try{
    let rezultat = await fetch(result)
      .then(res => res.blob())
      let newResult = await storage.ref(imageName).put(rezultat);
      let url = await newResult.ref.getDownloadURL();
        console.log('Javni link', url);
        return new Promise((resolve, reject) => {
            resolve(url);
        })
    
  }catch(e){
    console.error("Greska", e);
  } 
}

function getCroppedImg() {
    const canvas = document.createElement('canvas');
    console.log(typeof(image));
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );
    const based64Image = canvas.toDataURL('image/jpeg')
    setResult(based64Image);
}

    return (
        <div className="dashboard">
            <div className="dashboard-center" style={{overflow: 'auto', backgroundColor: '#15172b'}}>
                <div class="forma">
      <div class="title">Proizvod</div>
      <div class="subtitle">Ovdje unesite detalje proizvoda!</div>
      <div class="input-container ic1">
        <input 
            id="title" 
            class="input"
            name="title" 
            type="text"
            value={product.title}
            onChange={handleChange}
            required 
            placeholder=" " />
        <div class="cut"></div>
        <label htmlFor="firstname" class="placeholder">Title</label>
      </div>
      <div class="input-container ic2">
        <input 
            id="before" 
            class="input"
            name="before" 
            value={product.before}
            onChange={handleChange}
            required
            type="text" 
            placeholder=" " />
        <div class="cut"></div>
        <label htmlFor="lastname" class="placeholder">Before</label>
      </div>
      <div class="input-container ic2">
        <input 
            id="after" 
            class="input"
            name="after"
            value={product.after} 
            onChange={handleChange}
            required
            type="text" 
            placeholder=" " />
        <div class="cut cut-short"></div>
        <label htmlFor="email" class="placeholder">After</label>
      </div>
      <p class="subtitle">Odaberi tip obuce po spolu (muski/zenski)</p>
                <input type="radio" id="man" name="tip" 
                       value="/men" onChange={handleChange} />
                <label htmlFor="man" class="subtitle">Musko</label>
                <input type="radio" id="woman" name="tip" 
                       value="/women" onChange={handleChange}/>
                <label htmlFor="woman" class="subtitle" style={{fontWeight: '300'}}>Zensko</label>
                <br/>
                <div class="cut"></div>
                <label class="subtitle" htmlFor="category">Kategorija</label>
                {type && 
                <select id="category" name="category" onChange={handleChange} style={{backgroundColor: '#303245'}}>
                    {
                        options
                    }
                </select>
                    }
                    <div>
                <input style={{padding: '20px'}} ref={fileInputRef} type='file' accept={acceptedFileTypes} multiple={false} onChange={handleFileSelect}/>
                </div>
                {
                    src && 
                    <div style={{display:'flex', flexWrap: 'wrap', position: 'relative', justifyContent: 'center'}}>
                        <ReactCrop
                            style={{position:'relative'}} 
                            src={src} 
                            onImageLoaded={setImage}
                            crop = {crop}
                            onChange= {setCrop}
                            />
                    {result && 
                        <img src={result} alt='Cropped Image' className='img-fluid'/>
                    }
                    <div class="cropImage">
                    <button
                    style={{marginTop: '10px', marginBottom: '10px', borderRadius: '10px', backgroundColor: '#303245!important'}} 
                    className='btn btn-danger' onClick={getCroppedImg}>Uredi sliku</button>
                    </div>
                    </div>
                }
      <button type="text" 
        class="submit button--pan" onClick={handleSubmit}><span>Unesi</span></button>
    </div>
                
               </div> 
        </div>
    )

}
export default AddProduct
