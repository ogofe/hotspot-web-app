import * as Linking from 'expo-linking';

export const BaseLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: {
        screens: {
          HomePage: '/menu',
          ItemDetail: '/menu/:itemId',
          Notifications: '/alerts',
          Profile: {
            screens: {
              Account: '/me',
              EditProfile: '/me/change',
              ChangePassword: '/me/change-password',
              MyOrders: '/me/orders',
              Settings: {
                screens: {
                  SettingsPage: 'me/settings',
                  ChangeDetailsPage: 'me/settings/info',
                  ChangeAddressPage: 'me/settings/addr',
                }
              },
            }
          },
        }
      },
      Order:{
        screens: {
          Cart: '/cart',
          Checkout: '/checkout',
          MakePayment: '/pay'
        }
      },
      Search: '/find'
    },
  },
}

export const AuthLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: '/login',
      Register: '/register',
      Welcome:'',
    },
  },
}

export default {AuthLinking, BaseLinking};
