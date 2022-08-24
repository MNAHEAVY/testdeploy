import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {filteredIntruments} from '../../redux/actions'
import iconSearch from '../img/search_FILL0.png'
import 'bootstrap/dist/css/bootstrap.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input,setInput] = useState({
        name:''
    })
    function handleInputChange(e){
        e.preventDefault();
        setInput(prevState=>{
            return{
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(filteredIntruments(input))
        setInput(prevState=>{
            return{
                ...prevState,
                name:''
            }
        })
    }
    return(
        <div className='d-flex  w-25'>
            <form className="d-flex input-group" role="search" onSubmit={(e)=>{handleSubmit(e)}} >
                <button className="input-group-text" id="inputGroup-sizing-default" type='submit'><img src={iconSearch}  alt="search Icon" width="25" height="25"/></button>
                <input className="form-control me-2" value={input.name} name={"name"} onChange={(e)=>{handleInputChange(e)}} placeholder='Type your search...' />
            </form>
        </div>
    )
}