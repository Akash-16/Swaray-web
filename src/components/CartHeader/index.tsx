import React from 'react';

import { Button, Chip } from '@mui/material';

import { SwarayWhiteLogo } from '../../assets/img';
import { PoinstPackageList } from '../../common/interface/pointsPackage.interface';

interface Props {
  selectedPoints: PoinstPackageList;
  subscription: boolean;
}

const CartHeader = ({ selectedPoints, subscription }: Props) => {
  const date = new Date(selectedPoints.renewAt).getDate();
  const month = new Date(selectedPoints.renewAt).getMonth() + 1;
  const year = new Date(selectedPoints.renewAt).getFullYear();

  return (
    <div>
      <div className="d-flex align-center mb-20">
        <div>
          <p id="costdatas" className="f-16 f-w-600 l-h-normal txt-secondary">
            ${selectedPoints.cost}
          </p>
          {selectedPoints.isValuePack && (
            <Chip label="Value Pack" color="secondary" className="MuiChip-exSmall" />
          )}
        </div>
        <div className="flex-1 pl-16">
          {subscription ? (
            <Button
              variant="contained"
              color="secondary"
              className="minw-96 MuiButton-sizeMedium text-secondary px-12">
              <img
                className="img subscription-button-img mr-8"
                src={SwarayWhiteLogo}
                alt="Swaray Logo"
              />
              {selectedPoints.subscription}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              className="minw-96 MuiButton-sizeMedium button-selected text-secondary px-12">
              <img
                className="img subscription-button-img mr-8"
                src={SwarayWhiteLogo}
                alt="Swaray Logo"
              />
              {selectedPoints.oneTime}
            </Button>
          )}
        </div>
      </div>

      {subscription && (
        <p className="f-18 f-w-500 l-h-22 txt-primary mw-300 mb-12">
          Swaray Premium Subscription ({selectedPoints.subscription} Points)
        </p>
      )}
      {subscription ? (
        <div>
          <p className="f-14 f-w-400 l-h-normal txt-secondary">Monthly Subscription</p>
          <p className="f-12 f-w-400 l-h-normal txt-color-primary mt-6">
            Renews on {`${date}/${month}/${year}`}
          </p>
        </div>
      ) : (
        <div>
          <p className="f-14 f-w-400 l-h-normal txt-secondary">One Time Purchase</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(CartHeader);
