import ActionSection from "@/Components/ActionSection"
import FormSection from "@/Components/FormSection"
import InputError from "@/Components/InputError"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/shadcn/ui/avatar"
import { Button } from "@/Components/shadcn/ui/button"
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

export default function TeamMemberManager({ team, availableRoles, userPermissions }) {
  const page = usePage()
  const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false)
  const [managingRoleFor, setManagingRoleFor] = useState(null)
  const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false)
  const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(null)

  const addTeamMemberForm = useForm({
    email: "",
    role: null,
  })

  const updateRoleForm = useForm({
    role: null,
  })

  const leaveTeamForm = useForm({})
  const removeTeamMemberForm = useForm({})

  function addTeamMember() {
    addTeamMemberForm.post(router.route("team-members.store", team), {
      errorBag: "addTeamMember",
      preserveScroll: true,
      onSuccess: () => {
        addTeamMemberForm.reset()
        toast.success("Team member added")
      },
    })
  }

  function cancelTeamInvitation(invitation) {
    router.delete(router.route("team-invitations.destroy", invitation), {
      preserveScroll: true,
      onSuccess: () => toast.success("Team invitation canceled"),
    })
  }

  function manageRole(teamMember) {
    setManagingRoleFor(teamMember)
    updateRoleForm.setData("role", teamMember.membership.role)
    setCurrentlyManagingRole(true)
  }

  function updateRole() {
    updateRoleForm.put(router.route("team-members.update", [team, managingRoleFor]), {
      preserveScroll: true,
      onSuccess: () => {
        setCurrentlyManagingRole(false)
        toast.success("Team member role updated")
      },
    })
  }

  function confirmLeavingTeam() {
    setConfirmingLeavingTeam(true)
  }

  function leaveTeam() {
    leaveTeamForm.delete(router.route("team-members.destroy", [team, page.props.auth.user]), {
      onSuccess: () => {
        setConfirmingLeavingTeam(false)
        toast.success("Team left successfully")
      },
    })
  }

  function confirmTeamMemberRemoval(teamMember) {
    setTeamMemberBeingRemoved(teamMember)
  }

  function removeTeamMember() {
    removeTeamMemberForm.delete(router.route("team-members.destroy", [team, teamMemberBeingRemoved]), {
      errorBag: "removeTeamMember",
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setTeamMemberBeingRemoved(null)
        toast.success("Team member removed successfully")
      },
    })
  }

  function displayableRole(role) {
    return availableRoles.find((r) => r.key === role).name
  }

  return (
    <div>
      {userPermissions.canAddTeamMembers && (
        <div>
          <Separator className="my-8 hidden sm:block" />

          {/* Add Team Member */}
          <FormSection onSubmit={addTeamMember}>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Add Team Member
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Add a new team member to your team, allowing them to collaborate with you.
            </p>

            <div className="mt-6">
              <div className="col-span-6">
                <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                  Please provide the email address of the person you would like to add to this team.
                </div>
              </div>

              {/* Member Email */}
              <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={addTeamMemberForm.data.email}
                  onChange={(e) => addTeamMemberForm.setData("email", e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={addTeamMemberForm.errors.email} className="mt-2" />
              </div>

              {/* Role */}
              {availableRoles.length > 0 && (
                <div className="col-span-6 lg:col-span-4">
                  <Label htmlFor="roles">Role</Label>

                  <div className="relative z-0 mt-1 cursor-pointer rounded-lg border">
                    {availableRoles.map((role, i) => (
                      <button
                        key={role.key}
                        type="button"
                        className={`relative inline-flex w-full rounded-lg px-4 py-3 focus:z-10 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary ${
                          i > 0 ? "rounded-t-none border-t focus:border-none" : ""
                        } ${
                          i !== Object.keys(availableRoles).length - 1
                            ? "rounded-b-none"
                            : ""
                        }`}
                        onClick={() => addTeamMemberForm.setData("role", role.key)}
                      >
                        <div
                          className={
                            addTeamMemberForm.data.role &&
                            addTeamMemberForm.data.role !== role.key
                              ? "opacity-50"
                              : ""
                          }
                        >
                          {/* Role Name */}
                          <div className="flex items-center">
                            <div
                              className={`text-sm text-primary ${
                                addTeamMemberForm.data.role === role.key
                                  ? "font-semibold"
                                  : ""
                              }`}
                            >
                              {role.name}
                            </div>

                            {addTeamMemberForm.data.role === role.key && (
                              <svg
                                className="ms-2 size-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Role Description */}
                          <div className="mt-2 text-start text-xs">
                            {role.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <InputError
                    message={addTeamMemberForm.errors.role}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                disabled={addTeamMemberForm.processing}
                className={addTeamMemberForm.processing ? "opacity-25" : ""}
              >
                Add
              </Button>
            </div>
          </FormSection>
        </div>
      )}

      {team.team_invitations.length > 0 && userPermissions.canAddTeamMembers && (
        <div>
          <Separator className="my-8 hidden sm:block" />

          {/* Team Member Invitations */}
          <ActionSection>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Pending Team Invitations
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              These people have been invited to your team and have been sent an invitation email. They may join
              the team by accepting the email invitation.
            </p>

            {/* Pending Team Member Invitation List */}
            <div className="mt-6">
              <div className="space-y-6">
                {team.team_invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between"
                  >
                    <div className="text-gray-600 dark:text-gray-400">
                      {invitation.email}
                    </div>

                    <div className="flex items-center">
                      {/* Cancel Team Invitation */}
                      {userPermissions.canRemoveTeamMembers && (
                        <button
                          className="ms-6 cursor-pointer text-sm text-red-500 focus:outline-hidden"
                          onClick={() => cancelTeamInvitation(invitation)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ActionSection>
        </div>
      )}

      {team.users.length > 0 && (
        <div>
          <Separator className="my-8 hidden sm:block" />

          {/* Manage Team Members */}
          <ActionSection>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Team Members
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              All of the people that are part of this team.
            </p>

            {/* Team Member List */}
            <div className="mt-6 space-y-6">
              {team.users.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage
                        src={user.profile_photo_path ?? ""}
                        alt={user.name}
                      />
                      <AvatarFallback className="rounded-full bg-secondary p-2">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="ms-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {/* Manage Team Member Role */}
                    {userPermissions.canAddTeamMembers &&
                      availableRoles.length > 0 && (
                        <button
                          className="ms-2 text-sm text-gray-400 underline"
                          onClick={() => manageRole(user)}
                        >
                          {displayableRole(user.membership.role)}
                        </button>
                      )}

                    {/* Leave Team */}
                    {page.props.auth.user.id === user.id && (
                      <button
                        className="ms-6 cursor-pointer text-sm text-red-500"
                        onClick={confirmLeavingTeam}
                      >
                        Leave
                      </button>
                    )}

                    {/* Remove Team Member */}
                    {userPermissions.canRemoveTeamMembers &&
                      page.props.auth.user.id !== user.id && (
                        <button
                          className="ms-6 cursor-pointer text-sm text-red-500"
                          onClick={() => confirmTeamMemberRemoval(user)}
                        >
                          Remove
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </ActionSection>
        </div>
      )}

      {/* Role Management Modal */}
      <Dialog open={currentlyManagingRole} onOpenChange={setCurrentlyManagingRole}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Role</DialogTitle>
            <DialogDescription>
              {managingRoleFor?.name}'s role
            </DialogDescription>
          </DialogHeader>

          <div className="relative z-0 mt-1">
            {availableRoles.map((role, i) => (
              <button
                key={role.key}
                type="button"
                className={`relative inline-flex w-full rounded-lg px-4 py-3 focus:z-10 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary ${
                  i > 0 ? "rounded-t-none border-t focus:border-none" : ""
                } ${
                  i !== Object.keys(availableRoles).length - 1
                    ? "rounded-b-none"
                    : ""
                }`}
                onClick={() => updateRoleForm.setData("role", role.key)}
              >
                <div
                  className={
                    updateRoleForm.data.role &&
                    updateRoleForm.data.role !== role.key
                      ? "opacity-50"
                      : ""
                  }
                >
                  {/* Role Name */}
                  <div className="flex items-center">
                    <div
                      className={`text-sm ${
                        updateRoleForm.data.role === role.key
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {role.name}
                    </div>

                    {updateRoleForm.data.role === role.key && (
                      <svg
                        className="ms-2 size-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Role Description */}
                  <div className="mt-2 text-start text-xs text-gray-600">
                    {role.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setCurrentlyManagingRole(false)}>
              Cancel
            </Button>

            <Button
              disabled={updateRoleForm.processing}
              onClick={updateRole}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave Team Confirmation Modal */}
      <Dialog open={confirmingLeavingTeam} onOpenChange={setConfirmingLeavingTeam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Team</DialogTitle>
            <DialogDescription>
              Are you sure you would like to leave this team?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setConfirmingLeavingTeam(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="ms-3"
              disabled={leaveTeamForm.processing}
              onClick={leaveTeam}
            >
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Team Member Confirmation Modal */}
      <Dialog
        open={teamMemberBeingRemoved !== null}
        onOpenChange={(value) => !value && setTeamMemberBeingRemoved(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you would like to remove this person from the team?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setTeamMemberBeingRemoved(null)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="ms-3"
              disabled={removeTeamMemberForm.processing}
              onClick={removeTeamMember}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
