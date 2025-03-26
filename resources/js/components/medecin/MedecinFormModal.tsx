import { type _Hopital, type _Medecin } from '@/lib/types';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

interface MedecinFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    medecin?: _Medecin;
    hopitals: _Hopital[];
}

export default function MedecinFormModal({ isOpen, onClose, medecin }: MedecinFormModalProps) {
    const [hopitals, setHopitals] = useState<_Hopital[]>([]);

    // Fetch hôpitaux - toujours actif
    const { data: hopitalsData } = useQuery({
        queryKey: ['hopitals'],
        queryFn: async () => {
            const response = await fetch('/api/hopitals');
            return response.json();
        },
    });

    // Fetch médecin details - toujours actif mais conditionné par enabled
    const { data: medecinDetails } = useQuery({
        queryKey: ['medecin', medecin?.hasld],
        queryFn: async () => {
            if (!medecin?.hasld) return null;
            const response = await fetch(`/api/medecins/${medecin.hasld}/details`);
            return response.json();
        },
        enabled: !!medecin?.hasld,
    });

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nom: '',
        prenom: '',
        specialite: '',
        hopital_id: '',
        status: '',
        contrat: '',
        licence_medicale: '',
        dni: '',
        hasld: '',
    });

    useEffect(() => {
        if (hopitalsData) {
            setHopitals(hopitalsData);
        }
    }, [hopitalsData]);

    useEffect(() => {
        if (medecinDetails) {
            setData({
                nom: medecinDetails.nom,
                prenom: medecinDetails.prenom,
                specialite: medecinDetails.specialite,
                hopital_id: String(medecinDetails.hopital?.id || ''),
                status: medecinDetails.status,
                contrat: medecinDetails.contrat,
                licence_medicale: medecinDetails.licence_medicale,
                dni: medecinDetails.dni,
                hasld: medecinDetails.hasld,
            });
        } else {
            reset();
        }
    }, [medecinDetails, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Données envoyées:', data);

        if (medecin) {
            put(route('medecins.update', medecin.hasld), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
                onError: (errors) => {
                    console.error('Erreurs:', errors);
                },
            });
        } else {
            post(route('medecins.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
                onError: (errors) => {
                    console.error('Erreurs:', errors);
                },
            });
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-opacity-25 fixed inset-0 bg-black" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                                    <Dialog.Title as="div" className="flex items-center justify-between">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            {medecin ? 'Modifier le médecin' : 'Ajouter un nouveau médecin'}
                                        </h3>
                                        <button type="button" className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={onClose}>
                                            <X className="h-5 w-5" />
                                        </button>
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom</label>
                                                <input
                                                    type="text"
                                                    value={data.nom}
                                                    onChange={(e) => setData('nom', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                />
                                                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Prénom</label>
                                                <input
                                                    type="text"
                                                    value={data.prenom}
                                                    onChange={(e) => setData('prenom', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                />
                                                {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Spécialité</label>
                                                <input
                                                    type="text"
                                                    value={data.specialite}
                                                    onChange={(e) => setData('specialite', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                />
                                                {errors.specialite && <p className="mt-1 text-sm text-red-600">{errors.specialite}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Hôpital</label>
                                                <select
                                                    value={data.hopital_id}
                                                    onChange={(e) => setData('hopital_id', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                >
                                                    <option value="">Sélectionnez un hôpital</option>
                                                    {hopitals &&
                                                        hopitals.map((hopital) => (
                                                            <option key={hopital.id} value={String(hopital.id)}>
                                                                {hopital.nom}
                                                            </option>
                                                        ))}
                                                </select>
                                                {errors.hopital_id && <p className="mt-1 text-sm text-red-600">{errors.hopital_id}</p>}
                                            </div>
                                        </div>

                                        {/* Nouveaux champs */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
                                                <select
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                >
                                                    <option value="">Sélectionnez un status</option>
                                                    <option value="actif">Actif</option>
                                                    <option value="inactif">Inactif</option>
                                                    <option value="congé">En congé</option>
                                                </select>
                                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type de Contrat</label>
                                                <select
                                                    value={data.contrat}
                                                    onChange={(e) => setData('contrat', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                >
                                                    <option value="">Sélectionnez un type</option>
                                                    <option value="cdi">CDI</option>
                                                    <option value="cdd">CDD</option>
                                                    <option value="interim">Intérim</option>
                                                </select>
                                                {errors.contrat && <p className="mt-1 text-sm text-red-600">{errors.contrat}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Licence Médicale</label>
                                                <input
                                                    type="text"
                                                    value={data.licence_medicale}
                                                    onChange={(e) => setData('licence_medicale', e.target.value)}
                                                    placeholder="ex: LM123456"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                                                />
                                                {errors.licence_medicale && <p className="mt-1 text-sm text-red-600">{errors.licence_medicale}</p>}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                {processing ? 'Envoi...' : medecin ? 'Modifier' : 'Créer'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
