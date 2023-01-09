export interface TransactionDetails {
  transaction_id: string;
  transaction_isDeleted: boolean;
  transaction_created_at: string;
  transaction_updated_at: string;
  transaction_value: string;
  transaction_points: number;
  transaction_type: number;
  transaction_closing_bal: number;
  transaction_currency: string;
  transaction_method: string;
  transaction_schedule: string;
  transaction_status: number;
  transaction_nature: number;
  transaction_item: null | string;
  transaction_itemId: null | string;
  transaction_itemMetadata: any;
  transaction_senderId: string;
  transaction_senderMetadata: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: number;
    displayFullNameInProfile: boolean;
  };
  transaction_receiverId: string;
  transaction_receiverMetadata: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: number;
    displayFullNameInProfile: boolean;
  };
  transaction_fiatTransactionIdId: string;
  transaction_cryptoTransactionIdId: null | string;
}
