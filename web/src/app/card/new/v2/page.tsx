import { redirect } from 'next/navigation';
import { InteractiveCardForm } from '@/components/card/v2/interactive-card-form';
import { getAuthenticatedUser } from '@/lib/auth/server';
import { createCardV2 } from '@/actions/card-creator-v2';

export const metadata = {
  title: 'Create Card - Interactive',
  description: 'Create a new card with interactive design',
};

type CardCreatorV2PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CardCreatorV2Page({ searchParams }: CardCreatorV2PageProps) {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/auth?next=/card/new/v2');
  }

  const params = await searchParams;
  const errorMessage = params?.error
    ? Array.isArray(params.error)
      ? params.error[0]
      : params.error
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Card
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Design and configure your card with live preview
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
          <InteractiveCardForm onSubmit={createCardV2} />
        </div>
      </div>
    </main>
  );
}
