import { Separator } from "@/Components/shadcn/ui/separator"
import AppLayout from "@/Layouts/AppLayout"
import SubscriptionManager from "@/Pages/Subscriptions/Partials/SubscriptionManager"
import { Icon } from "@iconify/react"
import { Suspense } from "react"
import InvoiceManager from "./Partials/InvoiceManager"

export default function Index({ activeSubscriptions = [], availableSubscriptions = [], activeInvoices = [] }) {
  return (
    <AppLayout title="Subscriptions">
      <div className="text-xl font-semibold leading-tight">
        Subscriptions
      </div>

      <div>
        <div className="max-w-7xl">
          <SubscriptionManager
            activeSubscriptions={activeSubscriptions}
            availableSubscriptions={availableSubscriptions}
            className="mt-10 sm:mt-0"
          />
        </div>

        <Suspense fallback={<Icon icon="lucide:loader" />}>
          {activeInvoices.length > 0 && (
            <div className="md:max-w-7xl">
              <Separator className="my-8 hidden sm:block" />
              <InvoiceManager invoices={activeInvoices} className="mt-10 sm:mt-0" />
            </div>
          )}
        </Suspense>
      </div>
    </AppLayout>
  )
}
