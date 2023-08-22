// Write your code here
import './index.css'

const SimilarProductsItem = props => {
  const {similarProduct} = props
  const {imageUrl, title, price, brand, rating} = similarProduct

  return (
    <div>
      <img src={imageUrl} alt={title} />
      <p>{title}</p>
      <p>by {brand}</p>
      <div>
        <p>Rs {price}/- </p>
        <p>{rating}</p>
      </div>
    </div>
  )
}

export default SimilarProductsItem
