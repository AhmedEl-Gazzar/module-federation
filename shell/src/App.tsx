import './App.css'
import Header from 'header'
import Products from 'products'

const App = () => {
  return (
    <div className="content">
      <Header collapse={true} />
      <Products />
    </div>
  )
}

export default App
