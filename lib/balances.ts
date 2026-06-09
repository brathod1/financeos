import { Transaction } from "@/types/transactions";

export function calculateAccountBalance(
  accountId: string,
  startingBalance: number,
  transactions: Transaction[]
) {
  

  let balance = startingBalance;

  transactions.forEach((transaction) => {
    if (transaction.account_id !== accountId) {
      return;
    }

    const amount = Number(transaction.amount);

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
    if (
  transaction.transaction_type ===
  "investment_sell"
) {
  balance += amount;
}
  });



  return balance;
}