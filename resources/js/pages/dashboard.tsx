import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';

import { _Admission, _Chambre, _Medecin, _Patient, _Unite, _Hopital } from '../lib/types';

interface AdmissionsProps extends Record<string, unknown> {
    admissions: _Admission[];
}

interface ChambresProps extends Record<string, unknown> {
    chambres: _Chambre[];
}

interface MedecinsProps extends Record<string, unknown> {
    medecins: _Medecin[];
}

interface PatientsProps extends Record<string, unknown> {
    patients: _Patient[];
}

interface UnitesProps extends Record<string, unknown> {
    unites: _Unite[];
}

interface HopitalProps extends Record<string, unknown> {
    hopitals: _Hopital[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {

    const { admissions } = usePage<AdmissionsProps>().props;
    const { chambres } = usePage<ChambresProps>().props;
    const { hopitals } = usePage<HopitalProps>().props;
    const { medecins } = usePage<MedecinsProps>().props;
    const { patients } = usePage<PatientsProps>().props;
    const { unites } = usePage<UnitesProps>().props;

    const stats = [
        { label: "Admissions", count: admissions.length, route: "Admission" },
        { label: "Chambres", count: chambres.length, route: "Chambre" },
        { label: "Hôpitaux", count: hopitals.length, route: "Hopital" },
        { label: "Médecins", count: medecins.length, route: "Medecin" },
        { label: "Patients", count: patients.length, route: "Patient" },
        { label: "Unités", count: unites.length, route: "Unite" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Grid des statistiques */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <Link href={stat.route}>
                            <div
                                key={index}
                                className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-200"
                            >
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900 dark:stroke-20" />
                                <div className="relative text-center">
                                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{stat.label}</h2>
                                    <p className="text-5xl font-bold text-primary">{stat.count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
