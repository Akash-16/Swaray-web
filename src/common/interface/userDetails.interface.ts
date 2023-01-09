export interface UserDetails {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: number;
  isVerified: boolean;
  checkpoint: number;
  enableNotifications: boolean;
  displayFullNameInProfile: boolean;
  categories: [string];
  isEventLiveInCalendar: boolean;
  myFanPagesCount: number;
  profilePhoto: string;
  background: string;
  profilePhotoThumbnail: string;
  backgroundThumbnail: string;
  customerId: string;
  wallet: {
    pts: number;
    purchased: number;
    earned: number;
    gift: number;
    redeem: number;
    value: number;
    currency: 'usd';
  };
  cryptoWallets: [CryptoWallets];
}

export interface CryptoWallets {
  address: string;
  isDeeplinked: boolean;
  isDeleted: boolean;
  type: string;
}
