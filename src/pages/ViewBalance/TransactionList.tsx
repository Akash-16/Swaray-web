import React from 'react';
import { FinancialInstrument } from '../../common/enum/financialInstrument.enum';
import { NatureOfTransaction } from '../../common/enum/natureOfTransaction.enum';
import { TransactionItem } from '../../common/enum/transacationItem.enum';

import { TransactionDetails } from '../../common/interface/transactionDetails.interface';

interface Props {
  transactionDetails: TransactionDetails;
}

const purchasedItem = (item: TransactionDetails) => {
  switch (true) {
    case item.transaction_method === FinancialInstrument.Fiat &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You purchased {item.transaction_points} Points
        </p>
      );
    case item.transaction_method === FinancialInstrument.Crypto &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You purchased {item.transaction_points} Points
        </p>
      );
    case item.transaction_method === FinancialInstrument.IAP &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You purchased {item.transaction_points} Points
        </p>
      );
    case item.transaction_method === FinancialInstrument.Payout &&
      item.transaction_nature === NatureOfTransaction.Debit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You cashed out {item.transaction_points} Points
        </p>
      );
    default:
      return null;
  }
};

const giftedAndEarnedItem = (item: TransactionDetails) => {
  switch (true) {
    case item.transaction_item === TransactionItem.subscription &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-NatureOfTransaction.Credit4 f-w-400 l-h-normal txt-secondary mt-12">
          You earned {item.transaction_points} from your Fan Page <br />
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name}</span>
        </p>
      );
    case item.transaction_item === TransactionItem.subscription &&
      item.transaction_nature === NatureOfTransaction.Debit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You paid {item.transaction_points} to{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} FanPage</span>
        </p>
      );
    case item.transaction_item === TransactionItem.ppv &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You earned {item.transaction_points} from your Event <br />
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name}</span>
        </p>
      );
    case item.transaction_item === TransactionItem.ppv &&
      item.transaction_nature === NatureOfTransaction.Debit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You paid {item.transaction_points} to{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} Event</span>
        </p>
      );
    case item.transaction_item === TransactionItem.eventGift &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You received a gift {item.transaction_points} from{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} Event</span>
        </p>
      );
    case item.transaction_item === TransactionItem.eventGift &&
      item.transaction_nature === NatureOfTransaction.Debit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You sent a gift {item.transaction_points} to{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} Event</span>
        </p>
      );
    case item.transaction_item === TransactionItem.fanpageGift &&
      item.transaction_nature === NatureOfTransaction.Credit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You received a gift {item.transaction_points} from{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} FanPage</span>
        </p>
      );
    case item.transaction_item === TransactionItem.fanpageGift &&
      item.transaction_nature === NatureOfTransaction.Debit:
      return (
        <p className="f-14 f-w-400 l-h-normal txt-secondary mt-12">
          You sent a gift {item.transaction_points} to{' '}
          <span className="txt-color-primary">@{item?.transaction_itemMetadata?.name} FanPage</span>
        </p>
      );
    default:
      return null;
  }
};

const TransactionList = ({ transactionDetails }: Props) => {
  let purchased = null;
  if (!transactionDetails.transaction_item) {
    purchased = purchasedItem(transactionDetails);
  } else if (transactionDetails.transaction_item) {
    purchased = giftedAndEarnedItem(transactionDetails);
  }

  return purchased;
};

export default React.memo(TransactionList);
