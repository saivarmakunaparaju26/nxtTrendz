import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const d = cartList.filter(each => each.id === product.id)
    console.log(d.length)
    if (d.length !== 0) {
      const s = cartList.map(each => {
        if (each.id === product.id) {
          return {
            id: each.id,
            availability: each.availability,
            brand: each.brand,
            description: each.description,
            imageUrl: each.imageUrl,
            price: each.price,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
            quantity: each.quantity + 1,
          }
        }
        return each
      })
      console.log(s)
      this.setState({cartList: s})
    } else if (d.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const a = cartList.map(each => {
      if (each.id === id) {
        return {
          id: each.id,
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          imageUrl: each.imageUrl,
          price: each.price,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    this.setState({cartList: a})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const a = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 1) {
          return {
            id: each.id,
            availability: each.availability,
            brand: each.brand,
            description: each.description,
            imageUrl: each.imageUrl,
            price: each.price,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
            quantity: each.quantity - 1,
          }
        }
        return each
      }
      return each
    })
    this.setState({cartList: a})
    const v = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity === 1) {
          const d = cartList.filter(e => e.id !== id)
          this.setState({cartList: d})
          return d
        }
      }
      return each
    })
    console.log(v)
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const h = cartList.filter(each => each.id !== id)
    this.setState({cartList: h})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
