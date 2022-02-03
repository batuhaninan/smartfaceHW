import {getStorage, listAll, list, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {Course, CourseConverter} from "../models/Course";
import {Teacher, TeacherConverter} from "../models/Teacher";
import {Homework, HomeworkConverter} from "../models/Homework";
import {CourseData} from "../types";
import {collection, CollectionReference, getDocs, doc, getDoc, getFirestore, query, where, addDoc} from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import {dateFormat} from "../constants/Date";
import moment from "moment";

import { app } from "../firebase"
import { getAuth } from "firebase/auth";
import {StudentConverter} from "../models/Student";


export const addUser = async (name: string, email: string, userType: string) => {
	const db = getFirestore();

	const userRef = collection(db, userType);

	let userDataToAdd: { name: string; email: string };

	if (userType === "Principal") {
		userDataToAdd = {
			email,
			name
		}
	} else {
		userDataToAdd = {
			email,
			name,
			// @ts-ignore
			courses: [],
		}
	}

	addDoc(userRef, userDataToAdd)
		.then(() => {
		})
		.catch(_ => {
		});
}

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

export const getUploadedFilesOfStudent = async (course: Course, teacher: Teacher, homework: Homework) => {
	const storage = getStorage();

	const files: { name: string, date: string }[] = [];

	const url = getFirebaseStorageUrlFromObjects(course, teacher, homework, "Student");
	const gsRef = ref(storage, url);

	const bucketList = await listAll(gsRef)

	await Promise.all(bucketList.prefixes.map(async (folderRef) => {
		const bucketFolder = await listAll(folderRef)
		await Promise.all(bucketFolder.items.map((item) => {
			files.push({
				"name": item.name,
				"date": item.fullPath.split("/")[5]
			})
		}))
	}))

	files.sort((file, otherFile) => {
		if (moment(file.date, dateFormat).isAfter(moment(otherFile.date, dateFormat))) {
			return 1;
		}

		return -1;
	})

	return files;
}

export const getUploadedFilesOfHomework = async (course: Course, teacher: Teacher, homework: Homework) => {
	const storage = getStorage();

	const files: { student: string, filePath: string}[] = [];

	const url = getFirebaseStorageUrlFromObjects(course, teacher, homework, "Teacher");
	const gsRef = ref(storage, url);

	const bucketList = await listAll(gsRef)

	const db = getFirestore();

	await Promise.all(bucketList.prefixes.map(async (studentRef) => {
		const homeworkFolders = await listAll(studentRef)

		const latestHomework = homeworkFolders.prefixes.sort((a, b) => {
			if (moment(a.name, dateFormat).isAfter(moment(b.name, dateFormat))) {
				return -1
			}

			return 1;
		})[0]

		const homework = await list(latestHomework);
		const student = await getDocs(query(collection(db, "Student"), where("email", "==", studentRef.name)).withConverter(StudentConverter));
		const filePath = homework.items[0].fullPath

		files.push({
			student: student.docs[0].data().name,
			filePath
		})
	}))
	return files;
}

export const selectFile = async () => {
	return await DocumentPicker.getDocumentAsync({
		copyToCacheDirectory: false,
		multiple: true
	})
		.then((file) => {
			if (file.type === "success") {
				return file;
			}
		});
}

export const uploadFile = async (file: any, url: string) => {
	if (file.type !== "cancel") {
		const storage = getStorage();

		const uri = FileSystem.documentDirectory + file.name;

		await FileSystem.copyAsync({
			from: file.uri,
			to: uri
		})

		const fetchResponse = await fetch(uri);
		const blob = await fetchResponse.blob();

		let storageRef = ref(storage, url);

		uploadBytes(storageRef, blob).then((_) => {
			})
	}
}

export const downloadFile = async (file: string, url: string) => {
	const storage = getStorage();

	getDownloadURL(ref(storage, url))
		.then((downloadURL) => {
			FileSystem.downloadAsync(downloadURL, FileSystem.documentDirectory + file)
				.then((_) => {
				})
				.catch((_) => {
				})
		})
}

export const getFirebaseStorageUrlFromObjects = (course: Course, teacher: Teacher, homework: Homework, type: string) => {
	const auth = getAuth(app);
	if (type === "Student") {
		return `${course.name}/${teacher.name}/${homework.title}/homeworks/${auth.currentUser?.email}`
	}

	if (type === "Teacher") {
		return `${course.name}/${teacher.name}/${homework.title}/homeworks/`
	}
}

export const getData = async () => {
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

			await Promise.all(current_homeworks.map(async (hw: Homework) => {
				await getUploadedFilesOfStudent(current_course, current_teacher!, hw);
			}))

			data.push({
				// @ts-ignore
				"courseSnapshot": course,
				"course": current_course,
				// @ts-ignore
				"teacher": current_teacher,
				"homeworks": current_homeworks,
			});
		}
	}))

	return data;
}

export const getAllCoursesAndHomeworksOfStudent = async () => {
	const auth = getAuth(app);
	const user = auth?.currentUser;

	const data: CourseData[] = [];

	const db = getFirestore();

	const teacherColl = collection(db, "Teacher").withConverter(TeacherConverter);
	const homeworkColl = collection(db, "Homework").withConverter(HomeworkConverter);
	const studentsColl = collection(db, "Student").withConverter(StudentConverter);

	const student = await getDocs(query(studentsColl, where("email", "==", user?.email)));

	await Promise.all(student.docs.map(async (_student) => {
		const coursesOfStudent = _student.get("courses");

		await Promise.all(coursesOfStudent.map(async (courseID: string) => {
			const _courseID = courseID.split("/")[2];
			const course = await getDoc(doc(db, "Course", _courseID));

				const teacher = await getTeacherByCourseID(teacherColl, course.id);
				const homeworks = await getHomeworksByCourseID(homeworkColl, course.id);

				data.push({
					// @ts-ignore
					"courseSnapshot": course,
					// @ts-ignore
					"course": course.data(),
					// @ts-ignore
					"teacher": teacher,
					"homeworks": homeworks,
				});
		}))
	}))

	return data;
}

export const getAllCoursesAndHomeworksOfTeacher = async () => {
	const auth = getAuth(app);
	const user = auth?.currentUser;

	const data: CourseData[] = [];

	const db = getFirestore();

	const teacherColl = collection(db, "Teacher").withConverter(TeacherConverter);
	const homeworkColl = collection(db, "Homework").withConverter(HomeworkConverter);

	const teacher = await getDocs(query(teacherColl, where("email", "==", user?.email)).withConverter(TeacherConverter));

	await Promise.all(teacher.docs.map(async (_teacher) => {
		const coursesOfTeacher = _teacher.get("courses");

		await Promise.all(coursesOfTeacher.map(async (courseID: string) => {
			const _courseID = courseID.split("/")[2];
			const course = await getDoc(doc(db, "Course", _courseID).withConverter(CourseConverter));

			const homeworks = await getHomeworksByCourseID(homeworkColl, course.id);

			const homeworksAndFiles: any = [];

			await Promise.all(homeworks.map(async (homework) => {
				await getUploadedFilesOfHomework(course.data()!, _teacher.data(), homework)
					.then((files) => {
						homeworksAndFiles.push(
							files
						)
					})
			}))

			data.push({
				// @ts-ignore
				"course": course.data(),
				// @ts-ignore
				"teacher": _teacher.data(),
				"homeworksAndFiles": homeworksAndFiles,
			});
		}))
	}))

	return data;
}