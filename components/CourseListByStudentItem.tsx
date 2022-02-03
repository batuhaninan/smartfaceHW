import {List, Surface} from "react-native-paper";
import React, {useState} from "react";
import StudentUploadedFileDialog from "./StudentUploadedFileDialog";
import {HomeworkAndUploadedFiles, UploadedFileByStudent} from "../types";


interface CourseListByStudentItemProps {
	homeworkAndFiles: HomeworkAndUploadedFiles,
}

const CourseListByStudentItem: React.FC<CourseListByStudentItemProps> = ({ homeworkAndFiles }) => {

	const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
	const [selectedStudentFile, setSelectedStudentFile] = useState<UploadedFileByStudent>();

	const selectStudentFile = (file: UploadedFileByStudent) => {
		setSelectedStudentFile(file)
		setShouldOpenDialog(true)
	}

	return (
		<Surface>
			{shouldOpenDialog &&
          <StudentUploadedFileDialog file={selectedStudentFile!} closeDialog={setShouldOpenDialog} />}

			<List.Accordion title={homeworkAndFiles.homeworkTitle} style={{ backgroundColor: "#eee6e6" }}>
				{homeworkAndFiles.files.map((homework) => {
					return (
							<List.Item key={homework.filePath} onPress={() => selectStudentFile(homework)} title={homework.student} />
					)
				})}
			</List.Accordion>

		</Surface>
	)
}


export default CourseListByStudentItem;