import { useState, useEffect } from 'react';

import { View } from '../components/Themed';
import { CourseData } from '../types';

import CourseList from "../components/CourseList";
import {getAllCoursesAndHomeworksOfStudent} from "../utils/FirebaseStorageUtils";

import {styles} from "../Styles";


const StudentScreen = () => {

	const [courses, setCourses] = useState<CourseData[]>([]);

	useEffect(() => {
		getAllCoursesAndHomeworksOfStudent().then(r => { setCourses(r) })
	}, [])

	return (
		<View style={styles.container}>

			<CourseList
        courses={courses}
      />

		</View>
	);
}

export default StudentScreen;