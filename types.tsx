import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {Course} from "./models/Course";
import {Teacher} from "./models/Teacher";
import {Homework} from "./models/Homework";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type DocumentResultFixed = {
  name: string;
  size?: number;
  uri: string;
  mimeType?: string;
  lastModified?: number;
  file?: File;
  output?: FileList | null;
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

export interface CourseData {
  "courseSnapshot": QueryDocumentSnapshot
  "course": Course
  "teacher": Teacher
  "homeworks": Homework[]
}