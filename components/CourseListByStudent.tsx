import {Checkbox, List, Surface} from 'react-native-paper';
import React from "react";
import CourseListByStudentItem from "./CourseListByStudentItem";


interface CourseListByStudentProps {
	course: any,
}


const CourseList: React.FC<CourseListByStudentProps> = ({ course }): JSX.Element => {

	return (
			<List.Accordion key={course.course.name} title={course.course.name}>
				{course.homeworksAndFiles.map((homework) => {
					return (
						<Surface>
							{homework.map((file) => {
								return (
									<CourseListByStudentItem key={file.filePath} file={file} course={course} homework={homework} teacher={course.teacher} />
								)
							})}
						</Surface>
					)
				})}
			</List.Accordion>
	);
}

export default CourseList;

/*

<Surface>
							 {homework.map((file) => {
							 	return (
							 		<Surface>
							 			{shouldOpenDialog &&
                         <StudentUploadedFileDialog file={file} closeDialog={setShouldOpenDialog} course={course.course} />}

							 			<List.Item key={file.student} onPress={() => setShouldOpenDialog(true)} title={file.student}/>
							 		</Surface>
							 	)
							})}
						</Surface>
 */