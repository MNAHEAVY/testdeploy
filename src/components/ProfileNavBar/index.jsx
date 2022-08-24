import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export default function ProfileNavBar() {

  return (
    <nav className="navbar shadow-lg mb-2 bg-light p-2 bg-body rounded">
    <div className="container-fluid justify-content-around ">
        <div className="d-flex align-items-center">
            <div className="navbar-nav hstack gap-3">
                <Link to='/profile/cart' className="btn btn-sm btn-outline-success" >Shopping cart</Link>
                <Link to='/profile/favorites' className="btn btn-sm btn-outline-success" >Favorites</Link>
                <Link to='/profile/my-products' className="btn btn-sm btn-outline-success" >My Products</Link>
                <Link to='/profile/shop-history' className="btn btn-sm btn-outline-success" >Shopping history</Link>
                <Link to='/profile/sold' className="btn btn-sm btn-outline-success" >Sales History</Link>
            </div>
        </div>
    </div>
</nav>
  )
}