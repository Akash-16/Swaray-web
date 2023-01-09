export const apiRoutes = {
  signIn: 'auth/login',
  userDetails: 'users',
  verifyUser: 'users/verify/',
  signOut: 'auth/logout',
  trustDevice: 'users/deviceTrust',
  forgotPassword: 'users/password/request',
  resetPassword: 'users/password/set',
  pointsPackageList: 'points/list',
  stripeCheckout: 'stripe/create/checkOut',
  cryptoWallets: 'wallets',
  removeWallets: 'wallets/disconnect',
  cryptoTotalCost: 'crypto/totalcost',
  cryptoTransfer: 'crypto/transfer',
  TransactionList: 'account/history',
  cardList: 'stripe/card',
  deleteCard: 'stripe/card/'
};
