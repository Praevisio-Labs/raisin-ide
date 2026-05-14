import type { Project } from '@/types/index'

export const eCommerceStorefront: Project = {
    id: 'e-commerce-storefront',
    name: 'E-commerce Storefront',
    description:
        'Create a polished storefront with product pages, cart state, and responsive merchandising UI built with Next.js and Tailwind.',
    overview: `## Overview

You'll build a product storefront: a grid of products, individual product detail pages, and a shopping cart that persists across navigation. No payment processing — the focus is on the UI patterns and state management that make up the front half of any e-commerce experience.

E-commerce UIs are a great learning target because they're familiar (you've used dozens of them), they have well-established patterns, and they require you to solve real problems: how do you share cart state across pages? How do you handle product variants (size, color)? How do you make a product grid that looks good at every screen size?

This project is specifically well-suited to learning because the cart is a genuinely interesting state management problem. It's not just a list — it needs to handle adding, removing, updating quantities, and computing totals. Implementing it from scratch, rather than reaching for a library, forces you to think through the data model before writing any UI.`,
    instructions: `## Your Exercise

The starter files give you the product data, the page layouts, and the cart context shell. The cart logic and product detail page are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the app is structured and how CartProvider wraps everything.

**\`components/ProductCard.tsx\` and \`components/CartButton.tsx\`** are complete — read them to understand the product grid and cart button.

**\`lib/products.ts\`** contains the product data and types. It's complete — read it to understand the \`Product\` type and the \`products\` array.

**\`lib/cart.tsx\`** is a React context that will hold the cart state. The context and provider are set up, but the cart operations are empty. You'll need to:
1. Implement \`addToCart(product, quantity)\` — if the product is already in the cart, increment its quantity; otherwise add a new entry.
2. Implement \`removeFromCart(productId)\` — remove the item with that ID.
3. Implement \`updateQuantity(productId, quantity)\` — update the quantity, or remove the item if quantity drops to 0.
4. Implement the \`total\` derived value — sum of \`item.price * item.quantity\` across all cart items.

**\`app/products/[id]/page.tsx\`** is the product detail page. The product lookup is done — you'll need to:
1. Render the product image, name, price, and description.
2. Add a quantity selector (a simple number input or +/- buttons).
3. Wire the "Add to cart" button to call \`addToCart\` from the cart context.

**\`components/CartDrawer.tsx\`** is a slide-in panel that shows the cart contents. The open/close toggle is wired. You'll need to:
1. Render each cart item with its name, quantity, and line total.
2. Add a remove button for each item.
3. Show the cart total at the bottom.

Build in this order: implement the cart context operations first (they're pure logic, easy to reason about in isolation), then the product detail page, then the cart drawer.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a React context-based cart with add, remove, update, and derived total — and understand why context is the right tool for cross-page shared state in a Next.js app.
- **Understand** Next.js dynamic routes (\`[id]\`) and how \`generateStaticParams\` pre-renders product pages at build time for fast navigation.
- **Recognize** the data model decisions behind a cart — why items are keyed by product ID, why quantity is stored on the cart item rather than the product, and how that model extends to handle variants.`,
    skills: ['next', 'tailwind', 'typescript'],
    domains: ['frontend', 'full-stack'],
    level: 'Intermediate',
    duration: '12 hrs',
    teachers: ['cs-lewis', 'lao-tzu'],
    isReleased: true,
    files: [
        {
            name: 'app/layout.tsx',
            fileType: 'typescript',
            content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'E-commerce Storefront',
    description: 'Product catalog with shopping cart',
}

// Root layout — wraps the app in CartProvider so cart state is available everywhere.
// Complete, no TODOs.
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    )
}
`,
        },
        {
            name: 'app/page.tsx',
            fileType: 'typescript',
            content: `import { products } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'
import { CartButton } from '@/components/CartButton'

// Home page — renders the product grid. Complete, no TODOs.
export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <header className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">Store</h1>
                    <CartButton />
                </div>
            </header>
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    )
}
`,
        },
        {
            name: 'app/globals.css',
            fileType: 'css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
        },
        {
            name: 'components/ProductCard.tsx',
            fileType: 'typescript',
            content: `import Link from 'next/link'
import type { Product } from '@/lib/products'

type ProductCardProps = {
    product: Product
}

// Renders a product card in the grid. Complete, no TODOs.
export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={\`/products/\${product.id}\`}
            className="group rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">\${product.price}</span>
                {!product.inStock && (
                    <span className="text-xs text-red-600">Out of stock</span>
                )}
            </div>
        </Link>
    )
}
`,
        },
        {
            name: 'components/CartButton.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { CartDrawer } from './CartDrawer'

// Cart button in the header — opens the cart drawer. Complete, no TODOs.
export function CartButton() {
    const { itemCount } = useCart()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
                Cart
                {itemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {itemCount}
                    </span>
                )}
            </button>
            <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
`,
        },
        {
            name: 'components/CartDrawer.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useCart } from '@/lib/cart'

type CartDrawerProps = {
    isOpen: boolean
    onClose: () => void
}

// Slide-in cart panel. The open/close toggle is wired.
// You'll implement the cart item rendering and total display.
export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, total, removeFromCart } = useCart()

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <p className="text-center text-sm text-gray-500">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {/* TODO: Map over items and render each one.
                                Show product name, quantity, and line total (price * quantity).
                                Add a remove button that calls removeFromCart(item.product.id). */}
                        </div>
                    )}
                </div>

                <div className="border-t px-6 py-4">
                    {/* TODO: Show the cart total.
                        Display it as "Total: $X.XX" with the total from useCart. */}
                    <button
                        onClick={onClose}
                        className="mt-3 w-full rounded-lg bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </>
    )
}
`,
        },
        {
            name: 'components/ProductDetail.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/products'

type ProductDetailProps = {
    product: Product
}

// Product detail page content. The product data is passed in.
// You'll implement the quantity selector and add-to-cart logic.
export function ProductDetail({ product }: ProductDetailProps) {
    const router = useRouter()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    function handleAddToCart() {
        // TODO: Call addToCart with the product and quantity.
        // Then navigate back to the home page with router.push('/').
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-sm text-violet-600 hover:underline"
                >
                    ← Back to products
                </button>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* TODO: Render the product image in a large container */}

                    <div>
                        {/* TODO: Render product name, price, and description */}

                        {/* TODO: Add a quantity selector.
                            A simple number input or +/- buttons work well.
                            Update the quantity state when the user changes it. */}

                        {/* TODO: Wire the "Add to cart" button to handleAddToCart.
                            Disable it if the product is out of stock. */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="mt-6 w-full rounded-lg bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                        >
                            {product.inStock ? 'Add to cart' : 'Out of stock'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
`,
        },
        {
            name: 'lib/cart.tsx',
            fileType: 'typescript',
            content: `'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from './products'

type CartItem = {
    product: Product
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    total: number
    addToCart: (product: Product, quantity: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // TODO: Implement addToCart.
    // If an item with product.id already exists in items, increment its quantity
    // by the given amount. Otherwise, push a new CartItem onto the array.
    // Remember: don't mutate state directly — create a new array.
    function addToCart(product: Product, quantity: number) {
        setItems((prev) => {
            // TODO
            return prev
        })
    }

    // TODO: Implement removeFromCart.
    // Filter out the item whose product.id matches productId.
    function removeFromCart(productId: string) {
        // TODO
    }

    // TODO: Implement updateQuantity.
    // If the new quantity is 0 or less, remove the item entirely.
    // Otherwise, update the quantity for the matching item.
    function updateQuantity(productId: string, quantity: number) {
        setItems((prev) => {
            // TODO
            return prev
        })
    }

    // TODO: Compute total — sum of (item.product.price * item.quantity) for all items.
    const total = 0

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, total, addToCart, removeFromCart, updateQuantity, itemCount }}
        >
            {children}
        </CartContext.Provider>
    )
}

// Custom hook — throws if used outside CartProvider, which catches mistakes early.
export function useCart(): CartContextType {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within a CartProvider')
    return ctx
}
`,
        },
        {
            name: 'lib/products.ts',
            fileType: 'typescript',
            content: `export type Product = {
    id: string
    name: string
    description: string
    price: number          // in dollars
    image: string          // URL or path
    category: string
    inStock: boolean
}

// Static product catalog — in a real app this would come from a database or CMS.
export const products: Product[] = [
    {
        id: 'prod-001',
        name: 'Ceramic Pour-Over Set',
        description:
            'A hand-thrown ceramic dripper and carafe for a meditative morning ritual. ' +
            'Holds 600ml. Dishwasher safe.',
        price: 68,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
        category: 'Kitchen',
        inStock: true,
    },
    {
        id: 'prod-002',
        name: 'Linen Notebook',
        description:
            'A5 dot-grid notebook with a natural linen cover and 160 pages of 90gsm paper. ' +
            'Lay-flat binding.',
        price: 24,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600',
        category: 'Stationery',
        inStock: true,
    },
    {
        id: 'prod-003',
        name: 'Brass Desk Lamp',
        description:
            'Adjustable brass lamp with a warm Edison bulb. Weighted base, fabric cord. ' +
            'Height: 45cm.',
        price: 145,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
        category: 'Lighting',
        inStock: true,
    },
    {
        id: 'prod-004',
        name: 'Merino Wool Throw',
        description:
            '100% merino wool blanket, 130 × 180cm. Machine washable on cold. ' +
            'Available in natural, slate, and rust.',
        price: 195,
        image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600',
        category: 'Home',
        inStock: false,
    },
]

export function getProduct(id: string): Product | undefined {
    return products.find((p) => p.id === id)
}
`,
        },
        {
            name: 'app/products/[id]/page.tsx',
            fileType: 'typescript',
            content: `import { notFound } from 'next/navigation'
import { getProduct, products } from '@/lib/products'
import { ProductDetail } from '@/components/ProductDetail'

// Pre-render all product pages at build time.
// Next.js calls this to know which [id] values exist.
export function generateStaticParams() {
    return products.map((p) => ({ id: p.id }))
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params
    const product = getProduct(id)

    if (!product) notFound()

    // ProductDetail is a Client Component because it uses useCart.
    // We pass the product as a prop from this Server Component.
    return <ProductDetail product={product} />
}
`,
        },
    ],
}
