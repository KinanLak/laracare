import AppLayout from '@/layouts/app-layout';
import { type _Patient } from '@/lib/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Eye, Pencil, Plus, Trash2 } from 'lucide-react';

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

    const fetchPatientData = async (patientId: string) => {
        const response = await fetch(`/api/patients/${patientId}/details`);
        return response.json();
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
                        const { data: patientDetails, isLoading } = useQuery({
                            queryKey: ['patient', patient.patientid],
                            queryFn: () => fetchPatientData(patient.patientid),
                        });

                        return (
                            <div
                                key={patient.patientid}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Patient ID: {patient.patientid}</h2>
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
                                                data-confirm="Êtes-vous sûr de vouloir supprimer ce patient ?"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">DNI :</span> {patient.dni}
                                        </p>
                                    </div>
                                </div>

                                {/* Affichage dynamique des admissions */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Admissions</h3>
                                    {isLoading ? (
                                        <div className="animate-pulse">Chargement des admissions...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {patientDetails?.admissions.map((admission: any) => (
                                                <div key={admission.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    <p>Date: {admission.date}</p>
                                                    <p>Type: {admission.type}</p>
                                                    <p>Statut: {admission.status}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Affichage dynamique des consultations */}
                                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                                    <h3 className="mb-4 text-lg font-semibold">Consultations</h3>
                                    {isLoading ? (
                                        <div className="animate-pulse">Chargement des consultations...</div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {patientDetails?.consultations.map((consultation: any) => (
                                                <div key={consultation.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                                    <p>Date: {consultation.date}</p>
                                                    <p>Médecin: {consultation.medecin_id}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
