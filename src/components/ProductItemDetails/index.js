// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    itemDetails: '',
    similarProducts: [],
    count: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {id} = this.props
    const url = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(url)
    console.log(response)
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
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button type="button">Continue Shopping</button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
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

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
