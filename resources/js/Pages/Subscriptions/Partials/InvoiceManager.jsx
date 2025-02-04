import ActionSection from "@/Components/ActionSection"
import { Button } from "@/Components/shadcn/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/shadcn/ui/table"
import { Icon } from "@iconify/react"

export default function InvoiceManager({ invoices = [] }) {
  return (
    <ActionSection>
      <div className="flex items-center space-x-2">
        <p>View and download your past invoices.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  {new Date(invoice.created * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoice.customer_name}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">
                  ${(invoice.amount_paid / 100).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" asChild>
                    <a href={invoice.hosted_invoice_url} target="_blank" rel="noreferrer">
                      <Icon icon="lucide:download" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ActionSection>
  )
}
