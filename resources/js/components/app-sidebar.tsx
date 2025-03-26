import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Github, Hospital, LayoutGrid } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Hopitaux',
        url: '/Hopital',
        icon: LayoutGrid,
    },
    {
        title: 'Médecins',
        url: '/Medecin',
        icon: LayoutGrid,
    },
    {
        title: 'Unités',
        url: '/Unite',
        icon: LayoutGrid,
    },
    {
        title: 'Chambres',
        url: '/Chambre',
        icon: LayoutGrid,
    },
    {
        title: 'Patients',
        url: '/Patient',
        icon: LayoutGrid,
    },
    {
        title: 'Admissions',
        url: '/Admission',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Kinan',
        url: 'https://github.com/KinanLak',
        icon: Github,
    },
    {
        title: 'Thomas',
        url: 'https://github.com/KSOOOW',
        icon: Github,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <Hospital className="ml-2.5 text-blue-600 dark:text-blue-400" strokeWidth={2.0} />
                                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Laracare</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
