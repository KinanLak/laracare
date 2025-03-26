import AppLayout from '@/layouts/app-layout';
import { type _Medecin } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Pencil, Plus, Stethoscope, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Médecins',
        href: '/medecins',
    },
];

interface MedecinProps extends Record<string, unknown> {
    medecins: _Medecin[];
}

export default function Medecins() {
    const { medecins } = usePage<MedecinProps>().props;
    const [expandedMedecin, setExpandedMedecin] = useState<string | null>(null);

    const fetchMedecinDetails = async (medecinId: string) => {
        const response = await fetch(`/api/medecins/${medecinId}/details`);
        return response.json();
    };

    const toggleMedecinExpansion = (medecinId: string) => {
        setExpandedMedecin(expandedMedecin === medecinId ? null : medecinId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Médecins" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <Stethoscope className="h-8 w-8 text-blue-600" />
                        Liste des Médecins
                    </h1>
                    <Link
                        href={route('medecins.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter un médecin
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {medecins.map((medecin: any) => {
                        const isExpanded = expandedMedecin === medecin.hasld;

                        const { data: medecinDetails, isLoading } = useQuery({
                            queryKey: ['medecin', medecin.hasld],
                            queryFn: () => fetchMedecinDetails(medecin.hasld),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={medecin.hasld}
                                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'shadow-xl' : ''}`}
                            >
                                <div
                                    className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    onClick={() => toggleMedecinExpansion(medecin.hasld)}
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {medecin.personne ? `Dr. ${medecin.personne.nom} ${medecin.personne.prenom}` : `Médecin ${medecin.hasld}`}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {medecin.specialite}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('medecins.edit', medecin.hasld)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="rounded-full p-2 text-green-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-50 active:scale-95"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={route('medecins.destroy', medecin.hasld)}
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
                                        <div className="mt-4 space-y-2 px-6 pb-4 text-sm text-gray-600 dark:text-gray-300">
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Nom complet :</span>{' '}
                                                {isLoading ? 'Chargement...' : `${medecinDetails?.nom} ${medecinDetails?.prenom}`}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Hopital :</span>{' '}
                                                {isLoading ? 'Chargement...' : medecinDetails?.hopital.nom}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Status:</span>{' '}
                                                {isLoading ? 'Chargement...' : medecinDetails?.status}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Contrat:</span>{' '}
                                                {isLoading ? 'Chargement...' : medecinDetails?.contrat}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Licence médicale:</span>{' '}
                                                {isLoading ? 'Chargement...' : medecinDetails?.licence_medicale}
                                            </p>
                                        </div>

                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <div className="px-6 pt-4 pb-2">
                                                <h3 className="text-lg font-semibold">Admissions</h3>
                                            </div>
                                            {isLoading ? (
                                                <div className="animate-pulse px-6 py-4">Chargement des admissions...</div>
                                            ) : medecinDetails?.admissions?.length ? (
                                                <div className="grid gap-4 px-6 pb-6">
                                                    {medecinDetails.admissions.map((admission: any) => (
                                                        <div key={admission.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                            <p>Date: {admission.date}</p>
                                                            <p>Type: {admission.type}</p>
                                                            <p>Status: {admission.status}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-6 pb-6 text-gray-500 dark:text-gray-400">Aucune admission pour ce médecin.</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {medecins.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <Stethoscope className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucun médecin n'a été enregistré pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
