import React from 'react';

import { PoweredByStripe } from '../../assets/img';

const PaymentTerms = () => {
  return (
    <div className="mt-24">
      <div className="mb-16">
        <img src={PoweredByStripe} alt="" />
      </div>
      <p className="f-12 f-w-500 l-h-18 txt-tertiary mb-20">
        When you buy Swaray Points you receive only a limited, non-refundable, non-transferable,
        revocable license to use Swaray Points, which has no value in real currency. By selecting
        one of the Points Packages, (1) you agree that you are over 18 and that you authorize us to
        charge your account every month until you cancel the subscription, and (2) you represent
        that you understand and agree to the Terms of Use, which includes an agreement to arbitrate
        any dispute between you and Swaray, and Privacy Policy. You can cancel at any time by
        clicking “Cancel subscription” on the billing tab of the setting page. If you cancel, you
        will still be charged for the current billing period. See Terms of Use for other
        limitations.
      </p>
    </div>
  );
};

export default React.memo(PaymentTerms);
