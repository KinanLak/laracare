import AppLayout from '@/layouts/app-layout';
import { _Admission, type _Unite } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, ClipboardList, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { _Chambre } from '@/lib/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unités',
        href: '/unites',
    },
];

interface UniteProps extends Record<string, unknown> {
    unites: _Unite[];
}

export default function Unites() {
    const { unites } = usePage<UniteProps>().props;
    const [expandedUnite, setExpandedUnite] = useState<string | null>(null);

    const fetchUniteData = async (code: string) => {
        const response = await fetch(`/api/unites/${code}/details`);
        const data = await response.json();
        return data;
    };

    const toggleUniteExpansion = (uniteCode: string) => {
        setExpandedUnite(expandedUnite === uniteCode ? null : uniteCode);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Unités" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <ClipboardList className="h-8 w-8 text-blue-600" />
                        Liste des Unités
                    </h1>
                    <Link
                        href={'#'}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter une unité
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {unites.map((unite) => {
                        const isExpanded = expandedUnite === unite.code;

                        const { data: uniteData, isLoading } = useQuery({
                            queryKey: ['unite', unite.code],
                            queryFn: () => fetchUniteData(unite.code),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={unite.code}
                                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'shadow-xl' : ''}`}
                            >
                                <div
                                    className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    onClick={() => toggleUniteExpansion(unite.code)}
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{unite.nom} {unite.code}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{unite.specialite}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={'#'}
                                                onClick={(e) => e.stopPropagation()}
                                                className="rounded-full p-2 text-green-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-50 active:scale-95"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={'#'}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => e.stopPropagation()}
                                                className="rounded-full p-2 text-red-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-50 active:scale-95"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Link>
                                        </div>

                                        <div className="cursor-pointer rounded-full p-1 text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700">
                                            {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <>
                                        {/* Détails de l'unité */}
                                        <div className="mt-4 space-y-2 px-6 pb-4 text-sm text-gray-600 dark:text-gray-300">
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Responsable :</span>{' '}
                                                {unite.responsable}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Spécialité :</span> {unite.specialite}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Capacité :</span> {unite.capacite} lits
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Bâtiment :</span> {unite.batiment}
                                            </p>
                                        </div>

                                        {/* Section chambres avec bordure */}
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <div className="px-6 pt-4 pb-2">
                                                <h3 className="text-lg font-semibold">Chambres</h3>
                                            </div>
                                            <div className="grid gap-4 px-6 pb-6">
                                                {isLoading ? (
                                                    <div className="animate-pulse">Chargement des chambres...</div>
                                                ) : (
                                                    uniteData?.chambres?.map((chambre: _Chambre) => (
                                                        <div
                                                            key={chambre.nombre}
                                                            className="rounded-lg bg-gray-50 p-4 transition-all duration-300 ease-in-out dark:bg-gray-700"
                                                        >
                                                            <p>Chambre {chambre.nombre}</p>
                                                            <p>Capacité: {chambre.capacite} lits</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        {/* Section admissions avec bordure */}
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <div className="px-6 pt-4 pb-2">
                                                <h3 className="text-lg font-semibold">Admissions récentes</h3>
                                            </div>
                                            <div className="grid gap-4 px-6 pb-6">
                                                {isLoading ? (
                                                    <div className="animate-pulse">Chargement des admissions...</div>
                                                ) : (
                                                    uniteData?.admissions?.map((admission: _Admission) => (
                                                        <div
                                                            key={admission.id}
                                                            className="rounded-lg bg-gray-50 p-4 transition-all duration-300 ease-in-out dark:bg-gray-700"
                                                        >
                                                            <p>Patient: {admission.patientid}</p>
                                                            <p>Date: {admission.date}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {unites.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <ClipboardList className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucune unité n'a été enregistrée pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
