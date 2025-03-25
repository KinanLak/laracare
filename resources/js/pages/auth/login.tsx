import { Head, useForm } from '@inertiajs/react';
import { LogIn, UserPlus, Hospital } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Laracare - Connexion" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-8">
                    <div className="flex justify-center mb-6">
                        <Hospital className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        Connexion Laracare
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                        Gérez votre établissement de santé
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="votre.email@exemple.com"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={route('password.request')}
                                            className="text-sm text-blue-600 hover:underline"
                                            tabIndex={5}
                                        >
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Votre mot de passe"
                                    className="w-full border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="border-blue-500 dark:border-blue-400 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-400"
                                />
                                <Label htmlFor="remember" className="cursor-pointer">
                                    Se souvenir de moi
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                tabIndex={4}
                                disabled={processing}
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Se connecter
                            </Button>
                        </div>
                    </form>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Vous n'avez pas de compte ? {' '}
                        <TextLink
                            href={route('register')}
                            className="text-blue-600 hover:underline inline-flex items-center gap-1"
                            tabIndex={5}
                        >
                            <UserPlus className="h-4 w-4" />
                            Créer un compte
                        </TextLink>
                    </div>

                    {status && (
                        <div className="text-center text-sm font-medium text-green-600 bg-green-50 py-2 rounded-md mt-6">
                            {status}
                        </div>
                    )}
                </div>

                <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
                    © {new Date().getFullYear()} Laracare. Tous droits réservés.
                </footer>
            </div>
        </>
    );
}
