import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
    return (
        <CartProvider>
            <Navbar />
            <main className="container">
                <ProductList />
                <Cart />
            </main>
        </CartProvider>
    );
}

export default App;
