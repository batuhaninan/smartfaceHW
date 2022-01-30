import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps, CourseData } from '../types';

import { useState, useEffect } from 'react';

import { query, collection, getFirestore, where, getDocs, getDoc, CollectionReference  } from 'firebase/firestore';

import { Teacher, TeacherConverter } from '../models/Teacher';
import { Homework, HomeworkConverter } from '../models/Homework';
import { Course, CourseConverter } from '../models/Course';

import CourseList from "../components/CourseList";

/*var courses: Course[] = [{
  "courseName": "Python",
  "teacher": {
    "id": 1,
    "name": "Batuhan Inan",
    "age": 23,
  }, 
  "homeworks": [
    {
      "id": 1,
      "name": "Ödev 1",
      "studentCount": 159,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]
},
{
  "courseName":"C++",
  "teacher": {
    "id": 1,
    "name": "Atilla Başaran",
    "age": 24,
  },
  "homeworks": [
    {
      "id": 2,
      "name": "Ödev 1",
      "studentCount": 120,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    },
    {
      "id": 3,
      "name": "Ödev 2",
      "studentCount": 30,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]
},
{
  "courseName":"C",
  "teacher": {
    "id": 1,
    "name": "Emre Şallı",
    "age": 25,
  },
  "homeworks": [
    {
      "id": 4,
      "name": "Ödev 1",
      "studentCount": 40,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    },
    {
      "id": 5,
      "name": "Ödev 2",
      "studentCount": 50,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]},
]*/

export default function StudentScreen({ navigation }: RootTabScreenProps<'StudentScreen'>) {

	const [courses, setCourses] = useState<CourseData[]>([]);

	const getTeacherByCourseID = async (collection: CollectionReference, id: string) => {
		const teacher = await getDocs(query(collection, where("courses", "array-contains", `/Course/${id}`)).withConverter(TeacherConverter));

		if (!teacher.empty) {
			return teacher.docs[0].data();
		}
	}

	const getHomeworksByCourseID = async (collection: CollectionReference, id: string) => {
		const temp: Homework[] = [];

		const homeworks = await getDocs(query(collection, where("course", "==", `/Course/${id}`)).withConverter(HomeworkConverter));

		if (!homeworks.empty) {
			homeworks.forEach((hw) => {
				temp.push(hw.data())
			})
		}

		return temp;
	}

	const getData = async () => {
		const data: CourseData[] = [];

		const db = getFirestore();

		const courseColl = collection(db, "Course").withConverter(CourseConverter);
		const teacherColl = collection(db, "Teacher").withConverter(TeacherConverter);
		const homeworkColl = collection(db, "Homework").withConverter(HomeworkConverter);

		const courses = await getDocs(query(courseColl));

		await Promise.all(courses.docs.map(async (course) => {
			if (course.exists()) {
				let current_course = course.data();

				let current_teacher = await getTeacherByCourseID(teacherColl, course.id);
				let current_homeworks = await getHomeworksByCourseID(homeworkColl, course.id);

				// @ts-ignore
				data.push({
					"courseSnapshot": course,
					"course": current_course,
					"teacher": current_teacher,
					"homeworks": current_homeworks,
				});
			}
		}))

		console.log("\n\nDone getting data!")
		return data;
	}

	useEffect(() => {
		getData().then(r => { setCourses(r) })
	}, [])

	return (
		<View style={styles.container}>

			<CourseList
        courses={courses}
      />

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
