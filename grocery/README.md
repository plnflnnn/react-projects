# Grocery store

A full-stack grocery shop: browse categories, add items to a cart, and pay with Stripe Checkout.

## Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS + Headless UI
- Express + PostgreSQL
- Stripe Checkout

## Features

- Product catalog and category pages
- Product detail with quantity and cart persistence
- Cart updates by product id, stored in `localStorage`
- Stripe Checkout with server-side price lookup
- Payment confirmation on the success page via Stripe session id

## Project structure

```text
src/app            App shell and Redux store
src/layouts        Shared header/footer layout
src/pages          Route screens
src/features       Cart and catalog state
src/components     Reusable UI
src/lib            API client
src/utils          Formatting helpers
server             Express API, database, and checkout routes
```

## Setup

### 1. Database

Create a PostgreSQL database (default name `houseStoreDB`) with a `grocery_store` table. Expected columns:

- `id`
- `item_name`
- `item_category`
- `item_price`
- `item_src`

Category values should match the store nav, for example `Vegetables`, `Fruits`, `Dairy Products`, `Seafood`, `Meat`, `Poultry`.

### 2. API environment

Copy `server/.env.example` to `server/.env` and fill in your values.

```bash
cd server
npm install
npm start
```

The API defaults to [http://localhost:3200](http://localhost:3200).

### 3. Frontend environment

Copy `.env.example` to `.env` and add your Stripe publishable key.

```bash
npm install
npm start
```

The app defaults to [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm start`            | Start the React app       |
| `npm run start:server` | Start the Express API     |
| `npm run build`        | Production frontend build |

## Notes

- Checkout prices always come from the database, not the browser.
- The success page only clears the cart after Stripe reports `paid`.
- Do not commit `.env` files. Use the example files as the template.
