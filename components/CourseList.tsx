import { List } from 'react-native-paper';

import CourseListCourseItem from "./CourseListCourseItem";

import React from "react";
import {Course} from "../models/Course";

import {CourseData} from "../types";


interface CourseListProps {
	courses: CourseData[],
}


const CourseList: React.FC<CourseListProps> = ({ courses }): JSX.Element => {
	
	
	console.log("Re-render at ", new Date())

	return (
		<List.Section title="Courses" >
			{courses.map((courseCollection: CourseData, index: number) => {
				return (
					<CourseListCourseItem key={courseCollection.course.name} course={courseCollection.course} teacher={courseCollection.teacher} homeworks={courseCollection.homeworks}/>
				)
			})}
		</List.Section>
	);
}

export default CourseList;