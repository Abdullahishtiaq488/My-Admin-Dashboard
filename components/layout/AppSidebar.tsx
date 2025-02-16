'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'

import { navLinks } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'

export function AppSidebar() {
    const pathname = usePathname()

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Image src="/logo.png" alt="logo" width={150} height={70} />
            </div>
            <nav className="flex-1 p-4">
                {navLinks.map((link) => (
                    <Link
                        href={link.url}
                        key={link.label}
                        className={`flex items-center gap-4 p-3 text-body-medium rounded-lg transition-colors ${pathname === link.url ? 'text-blue-1 bg-blue-100' : 'text-gray-1 hover:bg-gray-100'
                            }`}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-body-medium">
                    <UserButton />
                    <p>Edit Profile</p>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="h-screen w-64 bg-gray-100 shadow-xl hidden lg:block">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <span className="lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </span>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    )
}
