import {useEffect, useState} from "react";
import {TeacherCourseData} from "../types";
import {getAllCoursesAndAllHomeworks} from "../utils/FirebaseStorageUtils";
import {View} from "./Themed";
import {styles} from "../Styles";
import {ActivityIndicator, List} from "react-native-paper";
import CourseListByStudent from "./CourseListByStudent";

const PrincipalScreenHomeworkTab = () => {
	const [courses, setCourses] = useState<TeacherCourseData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllCoursesAndAllHomeworks(setCourses)
			.then((_) => {
				setIsLoading(false);
			})
	}, [])

	return (
		<View style={styles.tabItemContainer}>
			<List.Section title={"Courses"}>
				{courses.map((course) => {
					return <CourseListByStudent key={course.course.name + course.teacher.name} course={course}/>
				})}
			</List.Section>
			{isLoading &&
          <ActivityIndicator animating={true} color="purple" size="large" />}
		</View>
	)
};

export default PrincipalScreenHomeworkTab;