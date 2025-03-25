import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, GitBranch } from 'lucide-react';
import { Hospital } from 'lucide-react';


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
        title: 'GitHub Kinan Lakdhar',
        url: 'https://github.com/KinanLak',
        icon: GitBranch,
    },
    {
        title: 'GitHub Thomas Vansteenwinckel',
        url: 'https://github.com/KSOOOW',
        icon: GitBranch,
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
                                <Hospital className="w-16 h-16 ml-2.5 text-blue-600 dark:text-blue-400" strokeWidth={2.0} />
                                <h1 className='font-bold text-blue-600 dark:text-blue-400'>Laracare</h1>
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
