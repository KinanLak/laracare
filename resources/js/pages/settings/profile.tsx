import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User } from 'lucide-react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Settings',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    name: string;
    email: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile Settings" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
                <SettingsLayout>
                    <div className="w-full max-w-2xl mx-auto space-y-8">
                        <div className="flex justify-center mb-6">
                            <User className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                    Profile Information
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                    Update your name and email address
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        className="border-blue-500 dark:border-blue-400 mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="border-blue-500 dark:border-blue-400 mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="underline hover:text-yellow-800 dark:hover:text-yellow-200"
                                            >
                                                Click here to resend the verification email.
                                            </Link>
                                        </p>

                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        Save Changes
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Profile Updated
                                        </p>
                                    </Transition>
                                </div>
                            </form>

                            <div className="mt-8">
                                <DeleteUser />
                            </div>
                        </div>
                    </div>
                </SettingsLayout>
            </div>
        </AppLayout>
    );
}
