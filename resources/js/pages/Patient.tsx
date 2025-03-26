import AppLayout from '@/layouts/app-layout';
import { _Admission, type _Patient } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, ChevronDown, ChevronUp, Plus, Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patients',
        href: '/patients',
    },
];

interface PatientProps extends Record<string, unknown> {
    patients: _Patient[];
}

export default function Patients() {
    const { patients } = usePage<PatientProps>().props;
    const [expandedPatient, setExpandedPatient] = useState<string | null>(null);

    const fetchPatientDetails = async (patientId: string) => {
        const response = await fetch(`/api/patients/${patientId}/details`);
        return response.json();
    };

    const fetchPatientData = async (dni: string) => {
        const response = await fetch(`/api/personnes/${dni}/details`);
        return response.json();
    };

    const togglePatientExpansion = (patientId: string) => {
        setExpandedPatient(expandedPatient === patientId ? null : patientId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Patients" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                        <ClipboardList className="h-8 w-8 text-blue-600" />
                        Liste des Patients
                    </h1>
                    <Link
                        href={'#'}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        Ajouter un patient
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {patients.map((patient) => {
                        const isExpanded = expandedPatient === patient.patientid;

                        const { data: patientDetails, isLoading: isLoadingPatientDetails } = useQuery({
                            queryKey: ['patient', patient.patientid],
                            queryFn: () => fetchPatientDetails(patient.patientid),
                            enabled: isExpanded,
                        });

                        const { data: patientData, isLoading: isLoadingPatientData } = useQuery({
                            queryKey: ['patient', patient.dni],
                            queryFn: () => fetchPatientData(patient.dni),
                            enabled: isExpanded,
                        });

                        return (
                            <div
                                key={patient.patientid}
                                className={`
                                    overflow-hidden rounded-xl border border-gray-200 bg-white
                                    shadow-lg transition-all duration-300 ease-in-out
                                    dark:border-gray-700 dark:bg-gray-800
                                    ${isExpanded ? 'shadow-xl' : ''}
                                `}
                            >
                                <div
                                    className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    onClick={() => togglePatientExpansion(patient.patientid)}
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Patient ID: {patient.patientid}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            DNI: {patient.dni}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={'#'}
                                                onClick={(e) => e.stopPropagation()}
                                                className="
                                                    rounded-full p-2 text-green-600
                                                    transition-all duration-300 ease-in-out
                                                    hover:bg-green-50 hover:scale-110
                                                    active:scale-95
                                                "
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={'#'}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => e.stopPropagation()}
                                                className="
                                                    rounded-full p-2 text-red-600
                                                    transition-all duration-300 ease-in-out
                                                    hover:bg-red-50 hover:scale-110
                                                    active:scale-95
                                                "
                                                data-confirm="Êtes-vous sûr de vouloir supprimer ce patient ?"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Link>
                                        </div>

                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePatientExpansion(patient.patientid);
                                            }}
                                            className="
                                                text-gray-500 hover:text-gray-700
                                                hover:bg-gray-100 rounded-full p-1
                                                transition-all duration-300 ease-in-out
                                                cursor-pointer
                                            "
                                        >
                                            {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <>
                                        {/* Détails supplémentaires du patient */}
                                        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 px-6 pb-4">
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Nom complet :</span> {isLoadingPatientData ? "Chargement.." : `${patientData?.nom} ${patientData?.prenom}`}

                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Date de naissance :</span> {isLoadingPatientData ? "Chargement.." : `${patientData?.date_naissance}`}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Âge :</span> {isLoadingPatientData ? "Chargement.." : `${patientData?.age}`}
                                            </p>
                                        </div>

                                        {/* Affichage dynamique des admissions */}
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <div className="px-6 pt-4 pb-2">
                                                <h3 className="text-lg font-semibold">Admissions</h3>
                                            </div>
                                            {isLoadingPatientDetails ? (
                                                <div className="animate-pulse px-6 py-4">Chargement des admissions...</div>
                                            ) : (
                                                <div className="px-6 pb-6 grid gap-4">
                                                    {patientDetails?.admissions?.map((admission: _Admission) => (
                                                        <div
                                                            key={admission.id}
                                                            className="
                                                                rounded-lg bg-gray-50 p-4 dark:bg-gray-700
                                                                transition-all duration-300 ease-in-out
                                                            "
                                                        >
                                                            <p>Date: {admission.date}</p>
                                                            <p>Type: {admission.type}</p>
                                                            <p>Statut: {admission.status}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {patients.length === 0 && (
                    <div className="rounded-xl bg-gray-50 py-12 text-center dark:bg-gray-800">
                        <ClipboardList className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">Aucun patient n'a été enregistré pour le moment.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
