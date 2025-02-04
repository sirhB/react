import { memo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import LinkedAccountsForm from './Partials/LinkedAccountsForm';
import LogoutOtherBrowserSessionsForm from './Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useSeoMetaTags } from '@/Composables/useSeoMetaTags';

export default memo(function Show({ sessions }) {
  useSeoMetaTags({
    title: 'Profile',
  });

  return (
    <AppLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <UpdateProfileInformationForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <LinkedAccountsForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <TwoFactorAuthenticationForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <LogoutOtherBrowserSessionsForm sessions={sessions} className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
});
