import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { inter } from '@/app/ui/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: 'Raisin.IDE',
    description: 'Rethinking Coding Education for the AI Era',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
        ],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
