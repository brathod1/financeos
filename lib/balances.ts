import { Transaction } from "@/types/transactions";

export function calculateAccountBalance(
  accountId: string,
  startingBalance: number,
  transactions: Transaction[]
) {
  let balance = startingBalance;

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    // Money leaving this account
    if (transaction.account_id === accountId) {
      if (transaction.transaction_type === "expense") {
        balance -= amount;
      }

      if (transaction.transaction_type === "investment") {
        balance -= amount;
      }

      if (transaction.transaction_type === "transfer") {
        balance -= amount;
      }

      if (transaction.transaction_type === "income") {
        balance += amount;
      }
    }

    // Money arriving into this account
    if (
      transaction.transaction_type === "transfer" &&
      transaction.transfer_account_id === accountId
    ) {
      balance += amount;
    }
  });

  return balance;
}