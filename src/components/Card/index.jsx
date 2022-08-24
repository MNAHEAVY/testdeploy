import './Card.css'
import { Link } from 'react-router-dom'
import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ProductCard({ id, name, price, rating, image, brand }) {

  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt={name}/>
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{name}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item>${price}</ListGroup.Item>
          <ListGroup.Item>{brand}</ListGroup.Item>
          <ListGroup.Item>Rating: {rating}/5</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <div className='containerButton'>
        <BsCartFill className='CardIcon' />
        <BsStarFill className='CardIcon' />
      </div>
    </Card>
  )
}
