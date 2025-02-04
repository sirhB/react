import ActionSection from "@/Components/ActionSection"
import { Button } from "@/Components/shadcn/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/shadcn/ui/dialog"
import { router, useForm } from "@inertiajs/react"
import { useState } from "react"

export default function DeleteTeamForm({ team }) {
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false)
  const form = useForm({})

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true)
  }

  function deleteTeam() {
    form.delete(router.route("teams.destroy", team), {
      errorBag: "deleteTeam",
    })
  }

  return (
    <ActionSection>
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Delete Team
      </h2>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Permanently delete this team.
      </p>

      <div className="mt-6">
        <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          Once a team is deleted, all of its resources and data will be
          permanently deleted. Before deleting this team, please download any data
          or information regarding this team that you wish to retain.
        </div>

        <div className="mt-5">
          <Button variant="destructive" onClick={confirmTeamDeletion}>
            Delete Team
          </Button>
        </div>

        {/* Delete Team Confirmation Modal */}
        <Dialog
          open={confirmingTeamDeletion}
          onOpenChange={setConfirmingTeamDeletion}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Team</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this team? Once a team is deleted,
                all of its resources and data will be permanently deleted.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setConfirmingTeamDeletion(false)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                className="ms-3"
                disabled={form.processing}
                onClick={deleteTeam}
              >
                Delete Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ActionSection>
  )
}
