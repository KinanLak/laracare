import AppLayout from '@/layouts/app-layout';
import { type _Unite } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Eye, Pencil, Plus, Trash2 } from 'lucide-react';

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

    const fetchChambresData = async (uniteCode: string) => {
        const response = await fetch(`/api/chambres/unites/${uniteCode}/details`);
        return response.json();
    };

    const fetchAdmissionsData = async (uniteCode: string) => {
        const response = await fetch(`/api/admissions/unites/${uniteCode}/details`);
        return response.json();
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
                        const { data: chambresData, isLoading: isLoadingChambres } = useQuery({
                            queryKey: ['chambres', unite.code],
                            queryFn: () => fetchChambresData(unite.code),
                        });

                        const { data: admissionsData, isLoading: isLoadingAdmissions } = useQuery({
                            queryKey: ['admissions', unite.code],
                            queryFn: () => fetchAdmissionsData(unite.code),
                        });

                        return (
                            <div
                                key={unite.code}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{unite.nom}</h2>
                                        <div className="flex gap-2">
                                            <Link href={'#'} className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-50">
                                                <Eye className="h-5 w-5" />
                                            </Link>
                                            <Link href={'#'} className="rounded-full p-2 text-green-600 transition-colors hover:bg-green-50">
                                                <Pencil className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={'#'}
                                                method="delete"
                                                as="button"
                                                className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-50"
                                                data-confirm="Êtes-vous sûr de vouloir supprimer cette unité ?"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Responsable :</span> {unite.responsable}
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
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Localisation :</span> {unite.localization}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Équipements :</span> {unite.equipements}
                                        </p>
                                    </div>
                                </div>

                                {/* Affichage dynamique des chambres */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Chambres</h3>
                                    {isLoadingChambres ? (
                                        <div className="animate-pulse">Chargement des chambres...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {chambresData?.map((chambre: any) => (
                                                <div key={chambre.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    {/* Détails de la chambre */}
                                                    <p>Chambre {chambre.nombre}</p>
                                                    <p>Capacité: {chambre.capacite} lits</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Affichage dynamique des admissions */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Admissions récentes</h3>
                                    {isLoadingAdmissions ? (
                                        <div className="animate-pulse">Chargement des admissions...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {admissionsData?.map((admission: any) => (
                                                <div key={admission.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    {/* Détails de l'admission */}
                                                    <p>Patient: {admission.patientid}</p>
                                                    <p>Date: {admission.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
