import { Head } from '@inertiajs/react';
import { Palette } from 'lucide-react';
import AppearanceTabs from '@/components/appearance-tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Appearance Settings',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance Settings" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
        <SettingsLayout>
          <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="flex justify-center mb-6">
              <Palette className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                  Appearance Settings
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Customize the look and feel of your account
                </p>
              </div>

              <AppearanceTabs />

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Your preferences will be applied across all devices
              </div>
            </div>
          </div>
        </SettingsLayout>
      </div>
    </AppLayout>
  );
}
