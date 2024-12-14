# EnsignCart - Modern React E-commerce Platform

## 🔋 Features in Detail

### Product Catalog
- Grid layout with responsive design
- Product cards with hover effects
- Quick add to cart functionality
- Favorite/unfavorite products

### Shopping Cart
- Add/remove products
- Adjust quantities
- Persistent storage
- Total calculation
- Shipping cost calculation

### Search & Filter
- Real-time search
- Category filtering
- Price sorting
- Rating filtering

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
https://github.com/aryanjain285/ShoppingCart.git
```

2. Navigate to project directory:
```bash
cd shopping-cart
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Built With

- [React](https://reactjs.org/) - Front-end library
- [React Router](https://reactrouter.com/) - Navigation
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) - Special effects

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── SearchBar.jsx
├── context/            # React Context providers
│   ├── CartContext.jsx
│   └── FavoritesContext.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   └── ProductDetails.jsx
├── hooks/              # Custom hooks
├── styles/             # Global styles
└── App.jsx            # Root component
```



## 🔧 Development

### Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm jest` - Run tests
