declare module '@paystack/inline-js' {
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    metadata?: Record<string, any>;
    onSuccess: (transaction: { reference: string }) => void;
    onCancel: () => void;
  }

  class PaystackPop {
    newTransaction(options: PaystackOptions): void;
  }

  export default PaystackPop;
}