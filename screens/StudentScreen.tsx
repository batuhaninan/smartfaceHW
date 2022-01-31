import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps, CourseData } from '../types';

import CourseList from "../components/CourseList";
import { getData } from "../utils/FirebaseStorageUtils";


export default function StudentScreen({ navigation }: RootTabScreenProps<'StudentScreen'>) {

	const [courses, setCourses] = useState<CourseData[]>([]);

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
