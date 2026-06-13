// "use client";

// import { Investment } from "@/types/investment";

// import {
//   updateInvestment,
//   deleteInvestment,
// } from "@/app/actions/investment-actions";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";

// interface Props {
//   investment: Investment;
// }

// export function EditInvestmentForm({
//   investment,
// }: Props) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//         >
//           ✏️ Edit
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="bg-zinc-900 text-white border-zinc-800">
//         <DialogHeader>
//           <DialogTitle>
//             Edit Investment
//           </DialogTitle>
//         </DialogHeader>

//         <form
//           action={updateInvestment}
//           className="space-y-4"
//         >
//           <input
//             type="hidden"
//             name="id"
//             value={investment.id}
//           />

//           <input
//             type="hidden"
//             name="transactionId"
//             value={
//               investment.transaction_id
//             }
//           />

//           <input
//             name="name"
//             defaultValue={
//               investment.name
//             }
//             className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4"
//           />

//           <input
//             name="units"
//             type="number"
//             defaultValue={
//               investment.units
//             }
//             className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4"
//           />

//           <input
//             name="buyPrice"
//             type="number"
//             defaultValue={
//               investment.buy_price
//             }
//             className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4"
//           />

//           <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-300">
//             ⚠ Updating this investment
//             will also update the linked
//             investment transaction.
//           </div>

//           <Button
//             type="submit"
//             className="w-full"
//           >
//             Save Changes
//           </Button>
//         </form>

//         <form
//           action={deleteInvestment}
//           className="space-y-4"
//         >
//           <input
//             type="hidden"
//             name="id"
//             value={investment.id}
//           />

//           <input
//             type="hidden"
//             name="transactionId"
//             value={
//               investment.transaction_id
//             }
//           />

//           <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-300">
//             ⚠ This will:
//             <br />
//             • Delete the investment
//             <br />
//             • Delete the linked transaction
//             <br />
//             • Update account balances
//             <br />
//             • Update dashboard values
//             <br />
//             <br />
//             This action cannot be undone.
//           </div>

//           <Button
//             type="submit"
//             variant="destructive"
//             className="w-full"
//           >
//             Delete Investment
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Investment } from "@/types/investment";
import {
  updateInvestment,
  deleteInvestment,
} from "@/app/actions/investment-actions";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  investment: Investment;
}

export function EditInvestmentForm({
  investment,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger
  className="px-3 py-2 border border-zinc-700 rounded-lg"
>
  ✏️ Edit
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Investment
          </DialogTitle>
        </DialogHeader>

        <form
          action={updateInvestment}
          className="space-y-4"
        >
          <input
            type="hidden"
            name="id"
            value={investment.id}
          />

          <input
            type="hidden"
            name="transactionId"
            value={investment.transaction_id ?? ""}
          />

          <input
            name="name"
            defaultValue={investment.name}
            className="w-full border rounded-lg p-3"
          />

          <input
  name="units"
  type="number"
  min="0"
  step="0.01"
            defaultValue={investment.units}
            className="w-full border rounded-lg p-3"
          />

          <input
  name="buyPrice"
  type="number"
  min="0"
  step="0.01"
  defaultValue={investment.buy_price}
  className="w-full border rounded-lg p-3"
/>

<input
  type="date"
  name="purchaseDate"
  defaultValue={
    investment.purchase_date
  }
  className="w-full border rounded-lg p-3"
/>

          <div className="text-sm border rounded-lg p-3">
            ⚠ Updating this investment will also update the linked transaction.
          </div>

          <Button type="submit">
            Save Changes
          </Button>
        </form>

        <form
          action={deleteInvestment}
          className="space-y-4 mt-4"
        >
          <input
            type="hidden"
            name="id"
            value={investment.id}
          />

          <input
            type="hidden"
            name="transactionId"
            value={investment.transaction_id ?? ""}
          />

          <div className="text-sm border rounded-lg p-3">
            ⚠ This will delete both the investment and its linked transaction.
          </div>

          <Button
            type="submit"
            variant="destructive"
          >
            Delete Investment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}