import { memo } from 'react';
import { Separator } from '@/Components/shadcn/ui/separator';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import LinkedAccountsForm from './Partials/LinkedAccountsForm';
import LogoutOtherBrowserSessionsForm from './Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { usePage } from '@inertiajs/react';

export default memo(function Show({
  sessions = [],
  confirmsTwoFactorAuthentication = false,
  availableOauthProviders = {},
  activeOauthProviders = []
}) {
  const { props: { jetstream, auth: { user } } } = usePage();

  return (
    <AppLayout title="Settings">
      <div className="text-xl font-semibold leading-tight">
        Profile Settings
      </div>

      <div>
        <div className="max-w-7xl">
          {jetstream.canUpdateProfileInformation && (
            <div>
              <UpdateProfileInformationForm user={user} />
            </div>
          )}

          {Object.keys(availableOauthProviders).length > 0 && (
            <>
              <Separator className="my-8 hidden sm:block" />
              <div>
                <LinkedAccountsForm
                  className="mt-10 sm:mt-0"
                  availableProviders={availableOauthProviders}
                  activeProviders={activeOauthProviders}
                />
              </div>
            </>
          )}

          {jetstream.canUpdatePassword && (
            <>
              <Separator className="my-8 hidden sm:block" />
              <div>
                <UpdatePasswordForm className="mt-10 sm:mt-0" />
              </div>
            </>
          )}

          {jetstream.canManageTwoFactorAuthentication && (
            <>
              <Separator className="my-8 hidden sm:block" />
              <div>
                <TwoFactorAuthenticationForm
                  className="mt-10 sm:mt-0"
                  requiresConfirmation={confirmsTwoFactorAuthentication}
                />
              </div>
            </>
          )}

          {sessions.length > 0 && (
            <>
              <Separator className="my-8 hidden sm:block" />
              <div>
                <LogoutOtherBrowserSessionsForm
                  sessions={sessions}
                  className="mt-10 sm:mt-0"
                />
              </div>
            </>
          )}

          {jetstream.hasAccountDeletionFeatures && (
            <>
              <Separator className="my-8 hidden sm:block" />
              <div>
                <DeleteUserForm className="mt-10 sm:mt-0" />
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
});
