import ActionSection from "@/Components/ActionSection"
import FormSection from "@/Components/FormSection"
import InputError from "@/Components/InputError"
import { Button } from "@/Components/shadcn/ui/button"
import { Checkbox } from "@/Components/shadcn/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/shadcn/ui/dialog"
import { Input } from "@/Components/shadcn/ui/input"
import { Label } from "@/Components/shadcn/ui/label"
import { Separator } from "@/Components/shadcn/ui/separator"
import { router, useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import { toast } from "sonner"

export default function ApiTokenManager({
  tokens = [],
  availablePermissions = [],
  defaultPermissions = [],
}) {
  const [displayingToken, setDisplayingToken] = useState(false)
  const [managingPermissionsFor, setManagingPermissionsFor] = useState(null)
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null)
  const page = usePage()

  const createApiTokenForm = useForm({
    name: "",
    permissions: defaultPermissions,
  })

  const updateApiTokenForm = useForm({
    permissions: [],
  })

  const deleteApiTokenForm = useForm({})

  const createApiToken = () => {
    createApiTokenForm.post(router.route("api-tokens.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true)
        createApiTokenForm.reset()
        toast.success("Token has been created")
      },
    })
  }

  const manageApiTokenPermissions = (token) => {
    updateApiTokenForm.setData("permissions", token.abilities)
    setManagingPermissionsFor(token)
  }

  const updateApiToken = () => {
    updateApiTokenForm.put(
      router.route("api-tokens.update", managingPermissionsFor),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setManagingPermissionsFor(null)
          toast.success("Permissions have been updated")
        },
      }
    )
  }

  const confirmApiTokenDeletion = (token) => {
    setApiTokenBeingDeleted(token)
  }

  const deleteApiToken = () => {
    deleteApiTokenForm.delete(
      router.route("api-tokens.destroy", apiTokenBeingDeleted),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setApiTokenBeingDeleted(null)
          toast.success("Token has been deleted")
        },
      }
    )
  }

  const hasPermission = (permissions, permission) => {
    return permissions.includes(permission)
  }

  return (
    <div>
      {/* Generate API Token */}
      <FormSection onSubmit={createApiToken}>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Create API Token
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          API tokens allow third-party services to authenticate with our
          application on your behalf.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Token Name */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={createApiTokenForm.data.name}
              onChange={(e) =>
                createApiTokenForm.setData("name", e.target.value)
              }
              className="mt-1 block w-full"
              autoFocus
            />
            <InputError
              message={createApiTokenForm.errors.name}
              className="mt-2"
            />
          </div>

          {/* Token Permissions */}
          {availablePermissions.length > 0 && (
            <div className="col-span-6">
              <Label htmlFor="permissions">Permissions</Label>

              <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`create-${permission}`}
                      checked={hasPermission(
                        createApiTokenForm.data.permissions,
                        permission
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          createApiTokenForm.setData("permissions", [
                            ...createApiTokenForm.data.permissions,
                            permission,
                          ])
                        } else {
                          createApiTokenForm.setData(
                            "permissions",
                            createApiTokenForm.data.permissions.filter(
                              (p) => p !== permission
                            )
                          )
                        }
                      }}
                    />
                    <label
                      htmlFor={`create-${permission}`}
                      className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-400"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            disabled={createApiTokenForm.processing}
            className={createApiTokenForm.processing ? "opacity-25" : ""}
          >
            Create
          </Button>
        </div>
      </FormSection>

      {tokens.length > 0 && (
        <>
          <Separator className="my-8 hidden sm:block" />

          {/* Manage API Tokens */}
          <div className="mt-10 sm:mt-0">
            <ActionSection>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Manage API Tokens
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                You may delete any of your existing tokens if they are no longer
                needed.
              </p>

              {/* API Token List */}
              <div className="mt-6 space-y-6">
                {tokens.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between"
                  >
                    <div className="break-all dark:text-white">
                      {token.name}
                    </div>

                    <div className="ml-2 flex items-center">
                      {token.last_used_ago && (
                        <div className="text-sm text-gray-400">
                          Last used {token.last_used_ago}
                        </div>
                      )}

                      {availablePermissions.length > 0 && (
                        <button
                          className="ml-6 cursor-pointer text-sm text-gray-400 underline"
                          onClick={() => manageApiTokenPermissions(token)}
                        >
                          Permissions
                        </button>
                      )}

                      <button
                        className="ml-6 cursor-pointer text-sm text-red-500"
                        onClick={() => confirmApiTokenDeletion(token)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ActionSection>
          </div>
        </>
      )}

      {/* Token Value Modal */}
      <Dialog open={displayingToken} onOpenChange={setDisplayingToken}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Token</DialogTitle>
            <DialogDescription>
              Please copy your new API token. For your security, it won't be
              shown again.
            </DialogDescription>
          </DialogHeader>

          {page.props.jetstream.flash.token && (
            <div className="mt-4 break-all rounded bg-gray-100 px-4 py-2 font-mono text-sm text-gray-500 dark:bg-gray-900">
              {page.props.jetstream.flash.token}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDisplayingToken(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Token Permissions Modal */}
      <Dialog
        open={managingPermissionsFor !== null}
        onOpenChange={(value) => !value && setManagingPermissionsFor(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Token Permissions</DialogTitle>
            <DialogDescription>
              Update the permissions for this API token.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {availablePermissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`update-${permission}`}
                  checked={hasPermission(
                    updateApiTokenForm.data.permissions,
                    permission
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateApiTokenForm.setData("permissions", [
                        ...updateApiTokenForm.data.permissions,
                        permission,
                      ])
                    } else {
                      updateApiTokenForm.setData(
                        "permissions",
                        updateApiTokenForm.data.permissions.filter(
                          (p) => p !== permission
                        )
                      )
                    }
                  }}
                />
                <label
                  htmlFor={`update-${permission}`}
                  className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-400"
                >
                  {permission}
                </label>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setManagingPermissionsFor(null)}
            >
              Cancel
            </Button>
            <Button onClick={updateApiToken}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Token Confirmation Modal */}
      <Dialog
        open={apiTokenBeingDeleted !== null}
        onOpenChange={(value) => !value && setApiTokenBeingDeleted(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Token</DialogTitle>
            <DialogDescription>
              Are you sure you would like to delete this API token?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setApiTokenBeingDeleted(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteApiToken}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
