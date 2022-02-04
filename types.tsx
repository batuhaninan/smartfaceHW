import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {Course} from "./models/Course";
import {Teacher} from "./models/Teacher";
import {Homework} from "./models/Homework";
import {Student} from "./models/Student";


export type DocumentResultFixed = {
  name: string;
  size?: number;
  uri: string;
  mimeType?: string;
  lastModified?: number;
  file?: File;
  output?: FileList | null;
}

export interface CourseData {
  "courseSnapshot": QueryDocumentSnapshot
  "course": Course
  "teacher": Teacher
  "homeworks": Homework[]
}

export interface UploadedFileByStudent {
  student: string,
  filePath: string
}

export interface HomeworkAndUploadedFiles {
  files: UploadedFileByStudent[],
  homeworkTitle: string
}

export interface TeacherCourseData {
  "courseSnapshot": QueryDocumentSnapshot
  "course": Course
  "teacher": Teacher
  "homeworksAndFiles": HomeworkAndUploadedFiles[]
}

export interface StudentOfTeacher {
  course: string,
  student: Student
}

export interface CoursesAndStudents {
  course: string,
  students: Student[]
}

export interface AllTeachersAndStudents {
  teacher: Teacher,
  coursesAndStudents: CoursesAndStudents[]
}

