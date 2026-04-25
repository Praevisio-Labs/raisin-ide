import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { inter } from '@/app/ui/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: 'Raisin.IDE',
    description: 'Rethinking Coding Education for the AI Era',
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
