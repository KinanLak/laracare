import AppLayout from '@/layouts/app-layout';
import { type _Admission } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, ClipboardList, Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admissions',
        href: '/admissions',
    },
];

interface AdmissionProps extends Record<string, unknown> {
    admissions: _Admission[];
}

export default function Admissions() {
    const { admissions } = usePage<AdmissionProps>().props;
    const [expandedAdmission, setExpandedAdmission] = useState<string | null>(null);

    const fetchAdmissionData = async (id: string) => {
        const response = await fetch(`/api/admissions/${id}/details`);
        return await response.json();
    };

    const toggleAdmissionExpansion = (admissionId: string) => {
        setExpandedAdmission(expandedAdmission === admissionId ? null : admissionId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Admissions" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <ClipboardList className="h-8 w-8 text-blue-600" />
                        Liste des Admissions
                    </h1>
                    <Link
                        href={route('admissions.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Nouvelle admission
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {admissions.map((admission) => {
                        const isExpanded = expandedAdmission === admission.id;

                        const { data: admissionData, isLoading } = useQuery({
                            queryKey: ['admission', admission.id],
                            queryFn: () => fetchAdmissionData(admission.id),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={admission.id}
                                onClick={() => toggleAdmissionExpansion(admission.id)}
                                className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all hover:bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Admission {admission.id}</h2>
                                                <div className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                                </div>
                                            </div>
                                            {!isExpanded && (
                                                <p className="text-sm text-gray-600 dark:text-gray-300">Patient ID: {admission.patientid}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-2">{/* Contrôles existants */}</div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 space-y-4">
                                            {isLoading ? (
                                                <div className="animate-pulse">Chargement des détails...</div>
                                            ) : (
                                                <>
                                                    <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Date :</span>{' '}
                                                            {admissionData?.date} à {admissionData?.heure}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Type :</span>{' '}
                                                            {admissionData?.type}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Justification :</span>{' '}
                                                            {admissionData?.justification}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Statut :</span>{' '}
                                                            {admissionData?.status}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Assurance :</span>{' '}
                                                            {admissionData?.insurance}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200">Commentaires :</span>{' '}
                                                            {admissionData?.commentaires}
                                                        </p>
                                                    </div>

                                                    {/* Informations du patient */}
                                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                        <h3 className="mb-4 text-lg font-semibold">Informations du patient</h3>
                                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                            <p>
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">ID :</span>{' '}
                                                                {admission.patientid}
                                                            </p>
                                                            <p>
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">Nom :</span>{' '}
                                                                {admissionData?.patient?.personne?.nom}
                                                            </p>
                                                            <p>
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">Prénom :</span>{' '}
                                                                {admissionData?.patient?.personne?.prenom}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Médecin traitant */}
                                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                        <h3 className="mb-4 text-lg font-semibold">Médecin traitant</h3>
                                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                            <p>
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">Nom :</span>{' '}
                                                                {admissionData?.medecin?.personne?.nom}
                                                            </p>
                                                            <p>
                                                                <span className="font-medium text-gray-800 dark:text-gray-200">Prénom :</span>{' '}
                                                                {admissionData?.medecin?.personne?.prenom}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Unités */}
                                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                        <h3 className="mb-4 text-lg font-semibold">Unités</h3>
                                                        <div className="grid gap-4">
                                                            {admissionData?.unites?.map((unite: any) => (
                                                                <div key={unite.code} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                                    <p className="font-medium">{unite.nom}</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                        Spécialité: {unite.specialite}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Chambres */}
                                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                        <h3 className="mb-4 text-lg font-semibold">Chambres</h3>
                                                        <div className="grid gap-4">
                                                            {admissionData?.chambres?.map((chambre: any) => (
                                                                <div key={chambre.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                                    <p className="font-medium">Chambre {chambre.nombre}</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                        Capacité: {chambre.capacite} lits
                                                                    </p>
                                                                </div>
                                                            ))}
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

                {admissions.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <ClipboardList className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucune admission n'a été enregistrée pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
