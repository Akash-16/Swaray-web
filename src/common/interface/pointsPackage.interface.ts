export interface PoinstPackageList {
  cost: number;
  isValuePack: boolean;
  stripeProductId: {
    oneTime: string;
    subscription: string;
    _id: string;
  };
  currency: string;
  oneTime: number;
  subscription: number;
  type: string;
  fee: number;
  id: string;
  renewAt: string;
  totalFee: number;
  totalAmount: number;
}
