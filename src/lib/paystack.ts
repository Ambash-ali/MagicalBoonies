import PaystackPop from '@paystack/inline-js';
import { supabase } from './supabase';

interface PaystackConfig {
  email: string;
  amount: number;
  bookingId: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}

interface PaystackTransaction {
  reference: string;
}

interface PaymentData {
  status: string;
  booking_id: string;
}

export const initializePayment = ({
  email,
  amount,
  bookingId,
  onSuccess,
  onCancel
}: PaystackConfig): void => {
  if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
    throw new Error('Paystack public key is not configured');
  }

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100, // Convert to kobo/cents
    currency: 'USD',
    metadata: {
      booking_id: bookingId
    },
    onSuccess: (transaction: PaystackTransaction) => {
      if (!transaction.reference) {
        console.error('No transaction reference received');
        return;
      }
      onSuccess(transaction.reference);
    },
    onCancel: () => {
      onCancel();
    }
  });
};

export const verifyPayment = async (reference: string): Promise<PaymentData | null> => {
  if (!reference) {
    console.error('Payment reference is required');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('status, booking_id')
      .eq('reference', reference)
      .single();

    if (error) throw error;

    if (!data) {
      throw new Error('Payment data not found');
    }

    return data as PaymentData;
  } catch (error) {
    console.error('Payment verification error:', error);
    return null;
  }
};