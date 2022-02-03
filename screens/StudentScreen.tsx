import { useState, useEffect } from 'react';
import { View } from '../components/Themed';
import { CourseData } from '../types';
import CourseList from "../components/CourseList";
import {getAllCoursesAndHomeworksOfStudent} from "../utils/FirebaseStorageUtils";
import {styles} from "../Styles";
import { ActivityIndicator } from "react-native-paper";


const StudentScreen = () => {

	const [courses, setCourses] = useState<CourseData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllCoursesAndHomeworksOfStudent(setCourses)
			.then((_) => {
				setIsLoading(false);
			})
	}, [])

	return (
		<View style={styles.container}>
			<CourseList
        courses={courses}
      />
			{isLoading &&
          <ActivityIndicator animating={true} color="purple" size="large" />}
		</View>
	);
}

export default StudentScreen;