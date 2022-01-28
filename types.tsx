/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  StudentScreen: undefined;
  TeacherScreen: undefined;
  PrincipalScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;


export interface Homework  {
  id: number, 
  name: string,
  studentCount: number,
  totalAttempts: number,
  isUploaded: boolean,
  uploadedFileNames: string[],
  currentAttempts: number,
}

export interface Teacher  {
  id: number, 
  name: string,
  age: number,
}

export interface Course  {
  courseName: string,
  teacher: Teacher,
  homeworks:  Homework[],
}
