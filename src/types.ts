export enum GameMode {
  'Mini' = 'mini',
  'Classic' = 'classic',
}

export enum RouteName {
  'Home' = 'landingpage',
  'Wallet' = 'wallet',
  'ClassicGame' = 'classic',
  'MiniGame' = 'mini',
  'PurchaseCards' = 'purchase',
  'Tutorial' = 'tutorial',
}

export interface UserDetails {
  firstname: string
  lastname: string
  email: string
  username: string
  dateOfBirth: Date
  password: string
}

export interface User extends UserDetails {
  wallet: string
}

export enum TransactionOperation {
  'Deposit' = 'deposit',
  'Withdraw' = 'withdraw',
  'Wage' = 'wage',
  'Payout' = 'payout',
}

export enum RouletteItems {
  'OneTwenty' = '120%',
  'OneHundred' = '100%',
  'Fifty' = '50%',
  'TwentyFive' = '25%',
}
