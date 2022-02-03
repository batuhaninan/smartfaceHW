import {Checkbox, List, Surface} from "react-native-paper";
import React, {useEffect, useState} from "react";
import StudentUploadedFileDialog from "./StudentUploadedFileDialog";


interface CourseListByStudentItem {
	file: any,
	course: any,
	homework: any,
	teacher: any
}

const CourseListByStudentItem: CourseListByStudentItem = ({ file, course, homework ,teacher }) => {

	const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

	return (
		<Surface>
			{shouldOpenDialog &&
          <StudentUploadedFileDialog file={file} closeDialog={setShouldOpenDialog} homework={homework} teacher={teacher} course={course.course} />}

			<List.Item key={file.student} onPress={() => setShouldOpenDialog(true)} title={file.student} />
		</Surface>
	)
}


export default CourseListByStudentItem;