export enum GameType {
  'Mini' = 'mini',
  'Classic' = 'classic'
}

export enum RouteName {
  'Home' = 'landingpage',
  'Wallet' = 'wallet',
  'ClassicGame' = 'classic',
  'MiniGame' = 'mini',
  'PurchaseCards' = 'purchase',
  'Tutorial' = 'tutorial'
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
  balance: number
}
