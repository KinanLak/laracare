import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password Settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password Settings" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
                <SettingsLayout>
                    <div className="w-full max-w-2xl mx-auto space-y-8">
                        <div className="flex justify-center mb-6">
                            <Lock className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                    Password Settings
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                    Ensure your account is using a long, random password to stay secure
                                </p>
                            </div>

                            <form onSubmit={updatePassword} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="current_password">Current Password</Label>
                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        type="password"
                                        className="border-blue-500 dark:border-blue-400 mt-1 block w-full"
                                        autoComplete="current-password"
                                        placeholder="Current password"
                                    />
                                    <InputError message={errors.current_password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        type="password"
                                        className="border-blue-500 dark:border-blue-400 mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder="New password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        type="password"
                                        className="border-blue-500 dark:border-blue-400 mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        Save Password
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Password Updated
                                        </p>
                                    </Transition>
                                </div>
                            </form>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                                Use a strong, unique password to protect your account
                            </div>
                        </div>
                    </div>
                </SettingsLayout>
            </div>
        </AppLayout>
    );
}
