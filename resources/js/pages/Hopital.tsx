import AppLayout from '@/layouts/app-layout';
import { type _Hopital } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Hospital, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hôpitaux',
        href: '/hopitaux',
    },
];

interface HopitalProps extends Record<string, unknown> {
    hopitals: _Hopital[];
}

export default function Hopitaux() {
    const { hopitals } = usePage<HopitalProps>().props;
    const [expandedHopital, setExpandedHopital] = useState<string | null>(null);

    const fetchHopitalDetails = async (hopitalId: string) => {
        const response = await fetch(`/api/hopitals/${hopitalId}/details`);
        return response.json();
    };

    const toggleHopitalExpansion = (hopitalId: string) => {
        setExpandedHopital(expandedHopital === hopitalId ? null : hopitalId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Hôpitaux" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <Hospital className="h-8 w-8 text-blue-600" />
                        Nos Hôpitaux
                    </h1>
                    <Link
                        href={route('hopitals.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter un hôpital
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {hopitals.map((hopital) => {
                        const isExpanded = expandedHopital === hopital.id;

                        const { data: hopitalDetails, isLoading } = useQuery({
                            queryKey: ['hopital', hopital.id],
                            queryFn: () => fetchHopitalDetails(hopital.id),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={hopital.id}
                                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'shadow-xl' : ''}`}
                            >
                                <div
                                    className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    onClick={() => toggleHopitalExpansion(hopital.id)}
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{hopital.nom}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{hopital.ville}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('hopitals.edit', hopital.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="rounded-full p-2 text-green-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-50 active:scale-95"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={route('hopitals.destroy', hopital.id)}
                                                method="delete"
                                                as="button"
                                                onClick={() => window.location.reload()}
                                                className="rounded-full p-2 text-red-600 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-50 active:scale-95"
                                                data-confirm="Êtes-vous sûr de vouloir supprimer cet hôpital ?"
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
                                    <div className="px-6 pb-6">
                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Adresse :</span>{' '}
                                                {isLoading ? 'Chargement...' : hopitalDetails?.adresse}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Téléphone :</span>{' '}
                                                {isLoading ? 'Chargement...' : hopitalDetails?.telephone}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Email :</span>{' '}
                                                {isLoading ? 'Chargement...' : hopitalDetails?.email}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Directeur :</span>{' '}
                                                {isLoading ? 'Chargement...' : hopitalDetails?.directeur}
                                            </p>
                                        </div>

                                        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                            <h3 className="mb-2 text-lg font-semibold">Médecins</h3>
                                            <div className="grid gap-2">
                                                {isLoading ? (
                                                    <div className="animate-pulse">Chargement des médecins...</div>
                                                ) : (
                                                    hopitalDetails?.medecins?.map((medecin: any) => (
                                                        <div key={medecin.id} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                                            <p className="font-medium">
                                                                {medecin.nom} {medecin.prenom}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                Spécialité: {medecin.specialite}
                                                            </p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {hopitals.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <Hospital className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucun hôpital n'a été ajouté pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
