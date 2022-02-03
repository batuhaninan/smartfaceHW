import {List, Surface} from 'react-native-paper';
import React from "react";
import CourseListByStudentItem from "./CourseListByStudentItem";
import {TeacherCourseData} from "../types";


interface CourseListByStudentProps {
	course: TeacherCourseData,
}

const CourseList: React.FC<CourseListByStudentProps> = ({ course }): JSX.Element => {

	return (
			<List.Accordion key={course.course.name} title={course.course.name}>
				{course.homeworksAndFiles.map((homework) => {
					return (
						<Surface>
							<CourseListByStudentItem key={homework.homeworkTitle} homeworkAndFiles={homework} />
						</Surface>
					)
				})}
			</List.Accordion>
	);
}

export default CourseList;