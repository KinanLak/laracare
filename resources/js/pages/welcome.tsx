import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Hospital, LogIn, UserPlus } from 'lucide-react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Laracare - Gestion Hospitalière">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-100">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center mb-6">
            <Hospital className="w-16 h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Laracare
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Votre solution moderne de gestion hospitalière
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Hospital className="mr-2 w-5 h-5" />
                Tableau de bord
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <LogIn className="mr-2 w-5 h-5" />
                  Connexion
                </Link>
                <Link
                  href={route('register')}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>

        <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} Laracare KinLard. Tous droits réservés.
        </footer>
      </div>
    </>
  );
}
