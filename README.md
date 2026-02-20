# MNT Store - Modern E-Commerce Platform

A high-performance, responsive e-commerce application built with Next.js 14+, Tailwind CSS v4, and Framer Motion.

## Features

- **Storefront**: Dynamic product showcase with filtering, sorting, and search.
- **Product Details**: Immersive product pages with image galleries and detailed information.
- **Shopping Cart**: Real-time cart management with a slide-out drawer.
- **Checkout**: Multi-step dummy checkout process.
- **Design System**: Fully responsive layout with custom theme variables and animations.
- **Mock Data**: Populate your store instantly with comprehensive dummy data.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
    - `ui`: Primitive components (Button, Input, Badge).
    - `layout`: Navbar, Footer, CartDrawer.
    - `home`: Homepage specific sections.
    - `product`: Product listing and card components.
- `src/context`: React Context for global state (Cart).
- `src/data`: Mock data for products and categories.
- `src/lib`: Utility functions.
