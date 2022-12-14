import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createProduct, getAllCategories } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import './CreateProduct.css'



export default function CreateProduct() {
    //const allInstruments = useSelector(store => store.instruments)
    //const allCategories = useSelector(store => store.categories)
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [inputForm, setInputForm] = useState({
        name: '',
        description: '',
        image: [],
        category: [],
        color: '',
        price: 0,
        stock: 0,
        brand: '', 
        status: '',

    })


 

    function validate(input) {

        let error = {}
        if (input.name.length >= 0 && !input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)) {
            error.name = 'Only letters and no spaces are allowed at the end!'
        } else error.name = null

    

        if (input.category && input.category.length === 0) {
            error.category = 'You have to choose at least one category'
        } else error.category = null
        
        if (input.color && input.color.length === 0) {
            error.color = 'Must declare a color'
        } else error.color = null

        if (input.price > 10000 || input.price < 0) {
            error.price = 'It has to be between 0 and 10000 dollars'
        } else error.price = null
        
        if (input.stock > 30 || input.stock < 0) {
            error.stock = 'It has to be between 0 and 30'
        } else error.stock = null
        
        if (input.brand.length >= 0 && !input.brand.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
            error.brand = 'Only letters and no spaces are allowed at the end!'
        } else error.brand = null
        return error
    }

    function handleChange(e) {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...inputForm,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e) {
        setInputForm({
            ...inputForm,
            category: [...inputForm.category, e.target.value]
        })
        setError(validate({
            ...inputForm,
            category: [...inputForm.category, e.target.value]
        }))
    }
    function handleSelectC(e) {
        setInputForm({
            ...inputForm,
            color: [...inputForm.color, e.target.value]
        })
        setError(validate({
            ...inputForm,
            color: [...inputForm.color, e.target.value]
        }))
    }
    function handleSelectS(e) {
        setInputForm({
            ...inputForm,
            status: [...inputForm.status, e.target.value]
        })
        setError(validate({
            ...inputForm,
            status: [...inputForm.status, e.target.value]
        }))
    }
    async function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/deqxuoyrc/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        const aux = file.secure_url;
        setInputForm({
          ...inputForm,
          image: aux,
        });
      }
   

    function handleSubmit(e) {
        e.preventDefault();
        if(error.name === null && error.category === null && error.color === null && 
        error.price === null && error.stock === null && 
        error.brand === null){
       
            dispatch(createProduct(inputForm))
            alert('Successfully created')
            setInputForm({
                name: '',
                description: '',
                image: [],
                category: [],
                color: '',
                price: 0,
                stock: 0,
                brand: '', 
                status: '',
            })
        }else{
            alert('Fixes flagged errors and fills in required spaces')
        }
      
    }



    return (
        <div id='container-create'>
           

            <div id='cont-btn-home'>
                <Link to='/home'>
                    <button className="btn btn-secondary" >Back</button>
                </Link>
            </div>

            <div id='cont-title-form'>
                <h1>Post your sale!</h1>
            </div>

            <form onSubmit={(e) => { handleSubmit(e) }}>

                <div id='form-cont-left'>
                    <div id='input-name' className='form-inputs'>
                        <label>* Name:</label>
                        <input
                            type='text'
                            value={inputForm.name}
                            name='name'
                            onChange={(e) => { handleChange(e) }} />
                             {error.name&& (
                            <p>{error.name}</p>
                        )}
                       
                    </div>

                    <div id='input-dsc' className='form-inputs'>
                        <label>Description:</label>
                        <input
                            type='text'
                            value={inputForm.description}
                            name='description'
                            onChange={(e) => { handleChange(e) }} />
                       
                    </div>

                   <div id='input-name' className='form-inputs'>
                        <label>*Category:</label>
                        <select  onChange={(e)=>{handleSelect(e)}} placeholder= "-Select at least one-" >

                        <option value="default"> -Select one</option> 
                            <option value="Wind"> Wind </option>
                            <option value="Electric"> Electric </option>
                            <option value="Percussion"> Percussion </option>
                            <option value="String"> String </option>
                          </select> 
                    </div>

                    <div>
                
          
                <div>
                <label>*Image:</label>
                  <input
                    type='file'
                    id='file'
                    name='image'
                    onChange={uploadImage}
                  />
                </div>
                <br />
              </div>


                    <div id='input-name' className='form-inputs'>
                        <label>Color:</label>
                        <select  onChange={(e)=>{handleSelectC(e)}}>
                            
                            <option value="default"> -Select at least one</option> 
                            <option value="Yellow "> Yellow </option>
                            <option value="Green"> Green </option>
                            <option value="Purple"> Purple </option>
                            <option value="Brown"> Brown </option>
                            <option value="Orange"> Orange </option>
                            <option value="Lightblue"> Lightblue </option>
                            <option value="Pink"> Pink </option>
                            <option value="Gray"> Gray </option>
                            <option value="White"> White </option>
                            <option value="Black"> Black </option>
                            <option value="Other"> Other </option>
                            <option value="Art Graph"> Art Graph </option>
                        
                          </select> 
                    </div>


                    <div id='input-name' className='form-inputs'>
                        <label>Price:</label>
                        <input
                            type='text'
                            value={inputForm.price}
                            name='price'
                            onChange={(e) => { handleChange(e) }} />
                                {error.price&& (
                            <p>{error.price}</p>
                        )}
                       
                     
                    </div>
                    
                    <div id='input-stk' className='form-inputs'>
                        <label>*stock:</label>
                        <input
                            type='number'
                            value={inputForm.stock}
                            name='stock'
                            onChange={(e) => { handleChange(e) }} />
                                {error.stock&& (
                            <p>{error.stock}</p>
                        )}
                       
                       
                    </div>

                    <div id='input-brn' className='form-inputs'>
                        <label >Brand:</label>
                        <input
                            type='text'
                            value={inputForm.brand}
                            name='brand'
                            onChange={(e) => { handleChange(e) }} />
                                {error.brand&& (
                            <p>{error.brand}</p>
                        )}
                       
                      
                    </div>

                    <div id='input-name' className='form-inputs'>
                        <label>Status:</label>
                        <select  onChange={(e)=>{handleSelectS(e)}} placeholder= "-Select at least one-" >
                            
                            <option value="default"> -Select one</option> 
                            <option value="New"> New </option>
                            <option value="Used"> Used </option>
                        </select> 
                    </div>

                    <div id='cont-btn-submit'>
                        <button className="btn btn-secondary">Sell Product</button>
                    </div>

                </div>

            </form>
             {/* <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form> */}
                       
            

        </div>
    )
}