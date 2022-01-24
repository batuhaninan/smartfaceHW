
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          StudentScreen: {
            screens: {
              StudentScreen: 'Student',
            },
          },
          TeacherScreen: {
            screens: {
              TeacherScreen: 'Teacher',
            },
          },
          PrincipalScreen: {
            screens: {
              PrincipalScreen: 'Principal',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
