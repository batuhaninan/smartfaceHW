import {getStorage, listAll, ref, uploadBytes} from "firebase/storage";
import {Course, CourseConverter} from "../models/Course";
import {Teacher, TeacherConverter} from "../models/Teacher";
import {Homework, HomeworkConverter} from "../models/Homework";
import {CourseData} from "../types";
import {collection, CollectionReference, getDocs, getFirestore, query, where, addDoc} from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import {dateFormat} from "../constants/Date";
import moment from "moment";
import TeacherScreen from "../screens/TeacherScreen";
import PrincipalScreen from "../screens/PrincipalScreen";
import StudentScreen from "../screens/StudentScreen";

import { app } from "../firebase"
import { getAuth } from "firebase/auth";

const UserTypeToScreen: any = {
	"Teacher": "TeacherScreen",
	"Principal": "PrincipalScreen",
	"Student": "StudentScreen",
}


export const addUser = async (userType: string) => {
	const auth = getAuth(app);
	const user = auth.currentUser;

	const db = getFirestore();

	const userRef = collection(db, "User");

	addDoc(userRef, {
		email: user?.email,
		type: userType
	})
		.then(() => {
			console.log("User added");
		})
		.catch(error => {
			console.log(error);
		});
}

export const determineUserScreenByType = async () => {
	const auth = getAuth(app);
	const user = auth.currentUser;

	const db = getFirestore();

	const userRef = collection(db, "User");

	const q = query(userRef, where("email", "==", user?.email))
	const userDoc = await getDocs(q);
	console.log(userDoc);
	if (userDoc.empty) {
		return undefined;
	}
	const userType = userDoc.docs[0].get("type")

	console.log("User type: ", userType);
	if (["Teacher", "Student", "Principal"].includes(userType)) {
		return UserTypeToScreen[userType];
	}
	return undefined;
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

export const getUploadedFiles = async (course: Course, teacher: Teacher, homework: Homework) => {
	const storage = getStorage();

	// gs://smartfacehomeworkapp.appspot.com/Python/Batuhan Inan/Ödev 1/homeworks/

	const files: { name: string, date: string }[] = [];

	const url = getFirebaseStorageUrlFromObjects(course, teacher, homework);

	const gsRef = ref(storage, url);

	console.log("Trying to download file")

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

export const selectFile = async () => {
	return await DocumentPicker.getDocumentAsync({
		copyToCacheDirectory: false,
		multiple: true
	})
		.then((file) => {
			if (file.type === "success") {
				return file;
				// setSelectedFile([file]);
				// setDidSelect(true);
				// return;
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

		uploadBytes(storageRef, blob).then((snapshot) => {
			console.log(`Upload ${file.name} to ${storageRef.toString()}`)
			})
		// homework.uploadedFileNames.push(file.name);
	}

	// homework.isUploaded = true;
	// homework.currentAttempts += 1;

	// setSelectedFiles([]);
	// setDidSelect(false);
}

export const getFirebaseStorageUrlFromObjects = (course: Course, teacher: Teacher, homework: Homework) => {
	const auth = getAuth(app);
	return `${course.name}/${teacher.name}/${homework.title}/homeworks/${auth.currentUser?.email}`
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
				// @ts-ignore
				const uploadedFiles = await getUploadedFiles(current_course, current_teacher, hw);
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

	console.log("\n\nDone getting data!")
	return data;
}