import { memo, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Label } from '@/Components/shadcn/ui/label';
import { Switch } from '@/Components/shadcn/ui/switch';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import ActionSection from '@/Components/ActionSection';

export default memo(function LinkedAccountsForm({
  className = '',
  availableProviders = {},
  activeProviders = []
}) {
  const { props: { flash } } = usePage();
  const [loadingProvider, setLoadingProvider] = useState(null);

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const toggleLink = (provider) => {
    setLoadingProvider(provider);
    if (!activeProviders.includes(provider)) {
      toast.promise(
        new Promise(resolve => setTimeout(resolve, 1000)),
        {
          loading: 'Redirecting to provider...',
        }
      );
        window.location.href = route('oauth.redirect', { provider: provider.slug });
      return;
    }

    router.delete(route('oauth.destroy', { provider }), {
      preserveScroll: true,
      onBefore: () => {
        toast.promise(
          new Promise(resolve => setTimeout(resolve, 1000)),
          {
            loading: 'Unlinking account...',
          }
        );
      },
      onSuccess: () => {
        setTimeout(() => {
          toast.success(flash.success);
        }, 1000);
      },
      onError: () => {
        toast.error(flash.message);
      },
      onFinish: () => {
        setLoadingProvider(null);
      },
    });
  };

  return (
    <ActionSection>
      <div className="flex justify-between md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium">
            Linked Accounts
          </h3>
          <p className="mt-1 text-sm">
            Manage your linked social accounts for easier login access.
          </p>
        </div>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="border px-4 py-5 shadow-xs rounded-lg sm:p-6">
          <div className="max-w-xl text-sm">
            Link your accounts to enable single sign-on and manage your connected social profiles.
          </div>

          <div>
            {Object.entries(availableProviders).map((provider) => (
              <div
                key={provider.slug}
                className="flex items-center space-x-4 rounded-md border p-4 mt-4"
              >
                <Icon icon={provider.icon} className="size-8" />
                <div className="flex-1 space-y-1">
                  <Label>
                    {provider?.slug?.charAt(0)?.toUpperCase() + provider?.slug?.slice(1)}
                  </Label>
                </div>
                <Switch
                  disabled={loadingProvider}
                  checked={activeProviders.includes(provider.slug)}
                  onCheckedChange={() => toggleLink(provider.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ActionSection>
  );
});
