import { Head, useForm } from '@inertiajs/react';
import { LogIn, UserPlus, Hospital } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Laracare - Inscription" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-8">
                    <div className="flex justify-center mb-6">
                        <Hospital className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        Créer un compte Laracare
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                        Rejoignez notre plateforme de gestion hospitalière
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom complet</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Votre nom et prénom"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="votre.email@exemple.com"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Votre mot de passe"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirmation du mot de passe</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirmez votre mot de passe"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing ? (
                                    <UserPlus className="h-4 w-4 mr-2 animate-pulse" />
                                ) : (
                                    <UserPlus className="h-4 w-4 mr-2" />
                                )}
                                Créer un compte
                            </Button>
                        </div>
                    </form>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Vous avez déjà un compte ? {' '}
                        <TextLink
                            href={route('login')}
                            className="text-blue-600 hover:underline inline-flex items-center gap-1"
                            tabIndex={6}
                        >
                            <LogIn className="h-4 w-4" />
                            Connectez-vous
                        </TextLink>
                    </div>
                </div>

                <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
                    © {new Date().getFullYear()} Laracare. Tous droits réservés.
                </footer>
            </div>
        </>
    );
}
