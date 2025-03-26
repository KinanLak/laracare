import AppLayout from '@/layouts/app-layout';
import { type _Medecin } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Eye, Pencil, Plus, Trash2 } from 'lucide-react';

import { _Patient, _Admission } from '@/lib/types';

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

    const fetchMedecinData = async (medecinId: string) => {
        const response = await fetch(`/api/medecins/${medecinId}/details`);
        return response.json();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Médecins" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <ClipboardList className="h-8 w-8 text-blue-600" />
                        Liste des Médecins
                    </h1>
                    <Link
                        href={'#'}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter un médecin
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {medecins.map((medecin) => {
                        const { data: medecinDetails, isLoading } = useQuery({
                            queryKey: ['medecin', medecin.hasld],
                            queryFn: () => fetchMedecinData(medecin.hasld),
                        });

                        return (
                            <div
                                key={medecin.hasld}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Spécialité : {medecin.specialite}</h2>
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
                                                data-confirm="Êtes-vous sûr de vouloir supprimer ce médecin ?"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Statut :</span> {medecin.status}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Contrat :</span> {medecin.contrat}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Licence Médicale :</span>{' '}
                                            {medecin.licence_medicale}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">Hôpital :</span> {medecin.hopital_id}
                                        </p>
                                    </div>
                                </div>

                                {/* Affichage dynamique des patients */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Patients actuels</h3>
                                    {isLoading ? (
                                        <div className="animate-pulse">Chargement des patients...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {medecinDetails?.patients.map((patient: _Patient) => (
                                                <div key={patient.patientid} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    {/* Détails du patient */}
                                                    <p>ID: {patient.patientid}</p>
                                                    <p>DNI: {patient.dni}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Affichage dynamique des admissions */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Admissions récentes</h3>
                                    {isLoading ? (
                                        <div className="animate-pulse">Chargement des admissions...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {medecinDetails?.admissions.map((admission: _Admission) => (
                                                <div key={admission.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    {/* Détails de l'admission */}
                                                    <p>Date: {admission.date}</p>
                                                    <p>Patient: {admission.patientid}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {medecins.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <ClipboardList className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucun médecin n'a été enregistré pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
