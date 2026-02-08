# E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) and Dockerized for easy deployment. Made for assessment.

## 🚀 Features

- **Product Catalog**: Browse a list of products with images and prices.
- **Shopping Cart**: Add items to cart, update quantities, and remove items.
- **Data Persistence**: Uses MongoDB to store products and cart data.
- **Containerized**: Fully Dockerized development environment.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, CSS Modules/Plain CSS
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **DevOps**: Docker, Docker Compose

## 📋 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/)
- **OR** [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) (for manual setup)

## ⚡ Getting Started

### Method 1: Docker (Recommended)

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Environment Setup**
    Create `.env` files for both client and server by copying the examples.
    
    **Server:**
    ```bash
    cd server
    cp .env.example .env
    ```
    
    **Client:**
    ```bash
    cd ../client
    cp .env.example .env
    ```

3.  **Run with Docker Compose**
    From the root directory:
    ```bash
    docker-compose up --build
    ```

4.  **Access the Application**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:5000](http://localhost:5000)

### Method 2: Manual Setup

If you prefer to run locally without Docker:

1.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Ensure MongoDB is running locally
    npm run dev
    ```

2.  **Frontend Setup**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Fetch all available products (Auto-seeds if database is empty).

### Cart
- `GET /api/cart` - Fetch current cart items.
- `POST /api/cart` - Add an item to the cart.
    - Body: `{ "productId": "...", "quantity": 1 }`
- `PUT /api/cart/:id` - Update item quantity.
    - Body: `{ "quantity": 5 }`
- `DELETE /api/cart/:id` - Remove an item from the cart.

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── src/                # Source code
│   ├── Dockerfile          # Frontend Dockerfile
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Node.js Backend
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose models (Product, Cart)
│   ├── routes/             # API routes
│   ├── Dockerfile          # Backend Dockerfile
│   └── server.js           # Entry point
│
└── docker-compose.yml      # Docker Compose configuration
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
