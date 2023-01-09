import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

import {
  styled,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Switch,
  SwitchProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { SwarayCoinLogo } from '../../assets/img';
import { UserDetails } from '../../common/interface/userDetails.interface';
import { PointsPackageType } from '../../common/enum/pointsPackage.enum';
import { AppLoader } from '../../components';
import routes from '../../constants/routes';
import { Client } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import { FinancialInstrument } from '../../common/enum/financialInstrument.enum';
import { TransactionDetails } from '../../common/interface/transactionDetails.interface';

import './style.scss';
import { TransactionFilter } from '../../common/enum/transactionFilter.enum';
import TransactionList from './TransactionList';
import { NatureOfTransaction } from '../../common/enum/natureOfTransaction.enum';
import { Errors, NotiStackErrorMessage } from '../../constants/errors';

interface Istate {
  userDetails: {
    userDetails: UserDetails;
  };
}

interface SortOptions {
  pointBalanceManagement: boolean;
  nftPurchase: boolean;
  subscriptions: boolean;
  payPerView: boolean;
}

const ViewBalance = () => {
  const [mondalOpen, setOpen] = React.useState(false);

  const [limit, setLimit] = React.useState(10);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const [sortByOption, setSortByOption] = React.useState<SortOptions>({
    pointBalanceManagement: false,
    nftPurchase: false,
    subscriptions: false,
    payPerView: false
  });

  const getSelectedData = Object.values(sortByOption);

  const { enqueueSnackbar } = useSnackbar();

  const { userDetails } = useSelector((state: Istate) => state?.userDetails);

  const navigate = useNavigate();

  const { state } = useLocation();

  const handleClose = () => setOpen(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const selectSortOptions = (): string => {
    switch (true) {
      case sortByOption.subscriptions &&
        sortByOption.nftPurchase &&
        sortByOption.payPerView &&
        sortByOption.pointBalanceManagement:
        return `${TransactionFilter.Subscription},${TransactionFilter.NFT},${TransactionFilter.PPV},${TransactionFilter.Balance}`;
      case sortByOption.subscriptions && sortByOption.nftPurchase && sortByOption.payPerView:
        return `${TransactionFilter.Subscription},${TransactionFilter.NFT},${TransactionFilter.PPV}`;
      case sortByOption.subscriptions && sortByOption.nftPurchase:
        return `${TransactionFilter.Subscription},${TransactionFilter.NFT}`;
      case sortByOption.subscriptions:
        return TransactionFilter.Subscription;
      case sortByOption.nftPurchase:
        return TransactionFilter.NFT;
      case sortByOption.pointBalanceManagement:
        return TransactionFilter.Balance;
      case sortByOption.payPerView:
        return TransactionFilter.PPV;
      default:
        return TransactionFilter.ALL;
    }
  };

  const { data, isLoading } = useQuery(['subscription', sortByOption, limit], () => {
    return Client.get(`${apiRoutes.TransactionList}`, {
      params: {
        limit: limit.toString(),
        page: '1',
        filterBy: selectSortOptions()
      }
    });
  });

  const transactionList = data?.data?.data as TransactionDetails[];

  const scrollDiv = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight && limit <= transactionList?.length) {
        setLimit((prevData) => prevData + 10);
      }
    }
  };

  const handleCryptoModel = () => {
    if (state?.isWalletActive) {
      navigate(routes.pointsList, {
        state: {
          pointsPackageName: PointsPackageType.crypto
        }
      });
    } else {
      enqueueSnackbar(Errors.walletConnect, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    }
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#ffffff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 18,
      height: 18
    }
  }));

  return (
    <>
      <div className="view-balance-page d-flex flex-column align-center">
        <div className="p-20 w-100">
          <h2 className="text-center f-28 f-w-700 l-h-normal txt-primary mb-20">My Balance</h2>
          <div className="f-32 d-flex justify-center align-center">
            <img className="img swaray-balance-img mr-8" src={SwarayCoinLogo} alt="Swaray Logo" />
            {userDetails?.wallet?.pts}
          </div>
          <div className="d-flex justify-center align-center mt-6 pb-24 border-bottom-light pt-10">
            <div className="d-flex align-center mr-20">
              <p className="f-10 f-w-400 txt-primary">
                <span className="batch batch-earn mr-4"></span>
                <span className="f-w-700 mr-2">{userDetails?.wallet?.earned}</span>Earned
              </p>
            </div>
            <div className="d-flex align-center">
              <p className="f-10 f-w-400 txt-primary">
                <span className="batch batch-purchase mr-4"></span>
                <span className="f-w-700 mr-2">{userDetails?.wallet?.purchased}</span>
                Purchased
              </p>
            </div>
          </div>
          <div>
            <div className="d-flex align-center justify-between mt-10">
              <p className="f-16 f-w-500 l-h-normal txt-tertiary">Transaction history</p>

              <Button
                id="demo-customized-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                size="small"
                disableElevation
                onClick={handleClick}
                className="wallet-filter-btn"
                endIcon={!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}>
                {open ? 'Close' : 'Sort By'}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={menuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
                className="wallet-dropdown-menu">
                <MenuItem>
                  <div className="d-flex align-center justify-between w-100">
                    <p className="f-14 f-w-500 l-h-normal txt-secondary">
                      filter
                      {`${
                        getSelectedData.filter((item) => item === true).length
                          ? `(${getSelectedData.filter((item) => item === true).length})`
                          : ''
                      }`}
                    </p>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="d-flex align-center justify-between w-100">
                    <p className="f-14 f-w-500 l-h-normal txt-secondary">Point Balance Managment</p>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={sortByOption.pointBalanceManagement}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSortByOption((prevData) => ({
                          ...prevData,
                          pointBalanceManagement: event.target.checked
                        }));
                      }}
                    />
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="d-flex align-center justify-between w-100">
                    <p className="f-14 f-w-500 l-h-normal txt-secondary">NFT Purchases</p>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={sortByOption.nftPurchase}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSortByOption((prevData) => ({
                          ...prevData,
                          nftPurchase: event.target.checked
                        }));
                      }}
                    />
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="d-flex align-center justify-between w-100">
                    <p className="f-14 f-w-500 l-h-normal txt-secondary">Subscriptions</p>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={sortByOption.subscriptions}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSortByOption((prevData) => ({
                          ...prevData,
                          subscriptions: event.target.checked
                        }));
                      }}
                    />
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="d-flex align-center justify-between w-100">
                    <p className="f-14 f-w-500 l-h-normal txt-secondary">Pay-Per-View</p>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={sortByOption.payPerView}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSortByOption((prevData) => ({
                          ...prevData,
                          payPerView: event.target.checked
                        }));
                      }}
                    />
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div ref={scrollRef} onScroll={scrollDiv} className="view-balance-cards w-100 px-20">
          {transactionList?.map((item, index) => {
            return (
              <div key={index} className="bg-secondary radius-12 p-16 mb-8">
                <div className="d-flex w-100">
                  <div className="flex-1 d-flex align-center">
                    <CalendarTodayIcon className="f-14 txt-tertiary mr-4" />
                    <p className="f-12 f-w-500 l-h-normal txt-tertiary">
                      {monthNames[new Date(item.transaction_created_at).getMonth()]}{' '}
                      {new Date(item.transaction_created_at).getDate()},{' '}
                      {new Date(item.transaction_created_at).getFullYear()}
                    </p>
                  </div>

                  {item.transaction_nature === NatureOfTransaction.Credit && (
                    <p className="f-12 f-w-500 l-h-normal txt-success">
                      +{item.transaction_points}
                    </p>
                  )}

                  {item.transaction_nature === NatureOfTransaction.Debit && (
                    <p className="f-12 f-w-500 l-h-normal txt-error">-{item.transaction_points}</p>
                  )}
                </div>
                <TransactionList transactionDetails={item} />
              </div>
            );
          })}
        </div>
        <div className="purchase-button w-100 px-20 py-10">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={() => setOpen(true)}>
            Purchase Points
          </Button>
        </div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          className="purchase-coins-modal"
          open={mondalOpen}>
          <DialogContent>
            <div className="d-flex align-center mb-24">
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon className="f-24 txt-secondary mr-24" />
              </IconButton>
            </div>

            <List className="my-purchase-menu d-grid g-8">
              <ListItem
                onClick={() =>
                  navigate(routes.pointsList, {
                    state: {
                      pointsPackageName: PointsPackageType.Fiat
                    }
                  })
                }
                className="Mui-selected">
                <div className="d-flex align-center justify-between w-100">
                  <div className="flex-1">
                    <ListItemText primary="Pay with Card" />
                    <p className="f-12 f-w-400 l-h-18 txt-secondary mt-6">
                      Buy Points with your Credit Card or Bank Account with Stripe.
                    </p>
                  </div>
                  <KeyboardArrowRightIcon className="txt-secondary" />
                </div>
              </ListItem>
              <ListItem onClick={handleCryptoModel} disabled={!state?.isWalletActive}>
                <div className="d-flex align-center justify-between w-100">
                  <div className="flex-1">
                    <ListItemText primary="Pay with Crypto" />
                    <p className="f-12 f-w-400 l-h-18 txt-secondary mt-6">
                      Top off your balance with Crypto using your MetaMask Wallet.
                    </p>
                  </div>
                  <KeyboardArrowRightIcon className="txt-secondary" />
                </div>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </div>
      <AppLoader loading={isLoading} />
    </>
  );
};

export default React.memo(ViewBalance);
