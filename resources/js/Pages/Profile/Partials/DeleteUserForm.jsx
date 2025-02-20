import ActionSection from '@/Components/ActionSection'
import ConfirmsPassword from '@/Components/ConfirmsPassword'
import { Button } from '@/Components/shadcn/ui/button'
import { useForm } from '@inertiajs/react'
import { memo } from 'react'
import { route } from 'ziggy-js'

export default memo(() => {
  const { delete: destroy, transform, reset } = useForm({})

  const deleteUser = (password) => {
    transform(data => ({
      ...data,
      password,
    }))

    destroy(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onFinish: () => reset(),
    })
  }

  return (
    <ActionSection>
      <div className="flex justify-between md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium">
            Delete Account
          </h3>
          <p className="mt-1 text-sm">
            Permanently delete your account.
          </p>
        </div>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="border px-4 py-5 shadow-xs rounded-lg sm:p-6">
          <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
          </div>

          <div className="mt-5">
            <ConfirmsPassword
              title="Delete Account"
              content="Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm."
              button="Delete Account"
              onConfirmed={deleteUser}
            >
              <Button variant="destructive">
                Delete Account
              </Button>
            </ConfirmsPassword>
          </div>
        </div>
      </div>
    </ActionSection>
  )
})
