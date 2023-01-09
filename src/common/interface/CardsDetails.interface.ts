export interface CardsDetails {
  isCreditCard: boolean;
  isDebitCard: boolean;
  cardNumber: number;
  expiryMonth: number;
  expiryYear: number;
  fingerprint: string;
  nameOnCard: string;
  cardId: string;
  isDeleted: boolean;
  sourceId: string | null;
  id: string;
}
