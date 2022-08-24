import './Pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Pagination({currentPage, postPerPage, totalPosts, paginate}) {
  
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }
  
  return (
    <div className='Pagination' >
      <ul>
        {pages.map(e => <li key={e} className='pagItem' onClick={()=>paginate(e)} >{e}</li>)}
      </ul>
    </div>
  )
}



