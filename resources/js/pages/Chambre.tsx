import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BedDouble, Eye, Pencil, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { _Admission, type _Chambre } from '@/lib/types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <BedDouble className="w-8 h-8 text-blue-600" />
                        Liste des Chambres
                    </h1>
                    <Link
                        href={"#"}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
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
                                onClick={() => toggleChambreExpansion(chambre.nombre)}
                                className={`
                                    overflow-hidden rounded-xl border border-gray-200 bg-white
                                    shadow-lg transition-all duration-300 ease-in-out cursor-pointer
                                    hover:bg-gray-50/50 dark:hover:bg-gray-700/50
                                    dark:border-gray-700 dark:bg-gray-800
                                    ${isExpanded ? 'shadow-xl' : ''}
                                `}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Chambre {chambre.nombre}
                                            </h2>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleChambreExpansion(chambre.nombre);
                                                }}
                                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={"#"}
                                                className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={"#"}
                                                className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={"#"}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                data-confirm="Êtes-vous sûr de vouloir supprimer cette chambre ?"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>

                                    {!isExpanded ? (
                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <p>Capacité: {chambre.capacite} personnes</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                <p>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">Capacité :</span> {chambre.capacite} personnes
                                                </p>
                                                <p>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">Surface :</span> {chambre.surface} m²
                                                </p>
                                                <p>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">Étage :</span> {chambre.etage}
                                                </p>
                                                <p>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">Description :</span> {chambre.description}
                                                </p>
                                                <p>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">Équipements :</span> {chambre.equipements}
                                                </p>
                                            </div>

                                            {isLoading ? (
                                                <div className="animate-pulse">Chargement des données...</div>
                                            ) : (
                                                <>
                                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                        <h3 className="mb-4 text-lg font-semibold">Admissions</h3>
                                                        <div className="grid gap-4">
                                                            {(!chambreData || !chambreData.admissions || chambreData.admissions.length === 0) ? (
                                                                <p>Aucune admission enregistrée pour cette chambre</p>
                                                            ) : (
                                                                chambreData.admissions.map((admission: _Admission) => (
                                                                    <div
                                                                        key={admission.id}
                                                                        className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
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
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {chambres.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <BedDouble className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Aucune chambre n'a été enregistrée pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
