import { useState, useEffect } from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps, CourseData } from '../types';

import CourseList from "../components/CourseList";
import { getData } from "../utils/FirebaseStorageUtils";
import Constants from "expo-constants";


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
		marginTop: Constants.statusBarHeight,
		width: "80%",
		marginLeft: Dimensions.get("window").width / 10,
		marginBottom: Dimensions.get("window").width / 10,
		borderRadius: 90,
		backgroundColor: "transparent",
	},
});
