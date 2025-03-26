import AppLayout from '@/layouts/app-layout';
import { _Admission, type _Chambre } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { BedDouble, ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chambres',
        href: '/chambres',
    },
];

interface ChambreProps extends Record<string, unknown> {
    chambres: _Chambre[];
}

export default function Chambres() {
    const { chambres } = usePage<ChambreProps>().props;
    const [expandedChambre, setExpandedChambre] = useState<string | null>(null);

    const fetchChambreData = async (nombre: string) => {
        const response = await fetch(`/api/chambres/${nombre}/details`);
        return await response.json();
    };

    const toggleChambreExpansion = (chambreNombre: string) => {
        setExpandedChambre(expandedChambre === chambreNombre ? null : chambreNombre);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Chambres" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <BedDouble className="h-8 w-8 text-blue-600" />
                        Liste des Chambres
                    </h1>
                    <Link
                        href={'#'}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter une chambre
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {chambres.map((chambre) => {
                        const isExpanded = expandedChambre === chambre.nombre;

                        const { data: chambreData, isLoading } = useQuery({
                            queryKey: ['chambre', chambre.nombre],
                            queryFn: () => fetchChambreData(chambre.nombre),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={chambre.nombre}
                                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'shadow-xl' : ''}`}
                            >
                                <div
                                    className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    onClick={() => toggleChambreExpansion(chambre.nombre)}
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Chambre {chambre.nombre}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Capacité: {chambre.capacite}</p>
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
                                                href={route("api.chambres.destroy", chambre.nombre)}
                                                method="delete"
                                                as="button"
                                                onClick={() => window.location.reload()}
                                                className="hover:cursor-pointer rounded-full p-2 text-red-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-50 active:scale-95"
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
                                        {/* Détails de la chambre */}
                                        <div className="mt-4 space-y-2 px-6 pb-4 text-sm text-gray-600 dark:text-gray-300">
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Capacité :</span> {chambre.capacite}{' '}
                                                personnes
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Surface :</span> {chambre.surface} m²
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Étage :</span> {chambre.etage}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Équipements :</span>{' '}
                                                {chambre.equipements}
                                            </p>
                                        </div>

                                        {/* Section admissions avec bordure */}
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <div className="px-6 pt-4 pb-2">
                                                <h3 className="text-lg font-semibold">Admissions</h3>
                                            </div>
                                            <div className="grid gap-4 px-6 pb-6">
                                                {isLoading ? (
                                                    <div className="animate-pulse">Chargement des admissions...</div>
                                                ) : !chambreData?.admissions || chambreData.admissions.length === 0 ? (
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        Aucune admission n'est associée à cette chambre.
                                                    </div>
                                                ) : (
                                                    chambreData.admissions.map((admission: _Admission) => (
                                                        <div key={admission.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
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

                {chambres.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <BedDouble className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucune chambre n'a été enregistrée pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
