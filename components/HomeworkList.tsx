import { StyleSheet } from 'react-native';

import { List } from 'react-native-paper';

import HomeworkListCourseItem from "./HomeworkListCourseItem";

import { Course } from "../types";


interface HomeworkListProps {
	courses: Course[],
}


const HomeworkList: React.FC<HomeworkListProps> = ({ courses }): JSX.Element => {
	
	
	console.log("Re-render at ", new Date())

	return (
		<List.Section title="Courses" >
			
			{courses.map((course: any, index: any) => {
				return (
					<HomeworkListCourseItem key={course.courseName} course={course} />
				)
			})}
		</List.Section>
	);
}

export default HomeworkList;