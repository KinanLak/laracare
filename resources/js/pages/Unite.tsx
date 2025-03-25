import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ClipboardList, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { type _Unite } from '@/lib/types';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des Unités" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <ClipboardList className="w-8 h-8 text-blue-600" />
                        Liste des Unités
                    </h1>
                    <Link
                        href={"#"}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter une unité
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {unites.map((unite) => (
                        <div
                            key={unite.code}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {unite.nom}
                                    </h2>
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
                                            data-confirm="Êtes-vous sûr de vouloir supprimer cette unité ?"
                                        >
                                            <Trash2 className="w-5 h-5" />
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
                        </div>
                    ))}
                </div>

                {unites.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <ClipboardList className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Aucune unité n'a été enregistrée pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
