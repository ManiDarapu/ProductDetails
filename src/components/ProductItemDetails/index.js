// Write your code here
import {Component} from 'react'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {itemDetails: '', similarProducts: [], count: 0}

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    const {id} = this.props
    const url = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        description: data.description,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const updatedSimilarData = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
      }))
      this.setState({
        itemDetails: updatedData,
        similarProducts: updatedSimilarData,
      })
    }
  }

  render() {
    const {itemDetails, count, similarProducts} = this.state
    const {
      imageUrl,
      title,
      brand,
      price,
      description,
      totalReviews,
      rating,
      availability,
    } = itemDetails
    return (
      <div>
        <Header />
        <div>
          <img src={imageUrl} alt={title} />
          <div>
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div>
              <p>{rating}</p>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>
              <span>Available:</span> {availability}
            </p>
            <p>
              <span>Brand:</span> {brand}
            </p>
            <hr />
            <div>
              <button type="button">-</button>
              <p>{count}</p>
              <button type="button">+</button>
            </div>
            <button type="button">ADD TO CART</button>
          </div>
        </div>
        <div>
          <h1>Similar Products</h1>
          <div>
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} similarProduct={each} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductItemDetails
