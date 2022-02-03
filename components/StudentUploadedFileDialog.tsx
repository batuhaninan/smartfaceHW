import {StyleSheet} from 'react-native';

import React from 'react';

import {Button, Dialog, Text, Portal, Surface, Checkbox,} from 'react-native-paper';

import {Course} from "../models/Course";

import {downloadFile} from "../utils/FirebaseStorageUtils";
import {Homework} from "../models/Homework";
import {Teacher} from "../models/Teacher";


interface StudentUploadedFileDialogProps {
	file: any,
	closeDialog: React.Dispatch<React.SetStateAction<boolean>>,
	course: Course,
	homework: Homework,
	teacher: Teacher,
}


const StudentUploadedFileDialog: React.FC<StudentUploadedFileDialogProps> = ({ file, course, homework ,teacher, closeDialog }): JSX.Element => {

	const hideDialog = () => closeDialog(false);

	const downloadFileWrapper = async () => {
		const filePath = file.filePath;
		downloadFile(file.filePath.split("/")[6], filePath);
	}

	return (
		<Surface>
			<Portal>
				<Dialog visible={true} onDismiss={hideDialog}>
					<Dialog.Title>Uploaded Files</Dialog.Title>

					<Dialog.Content>
						<Text>File Name: {file.filePath.split("/")[6]}</Text>
					</Dialog.Content>

					<Dialog.Actions>
						<Button onPress={downloadFileWrapper} style={ {paddingTop: 30, paddingBottom: 10, paddingLeft: 20} }>Download homework</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Surface>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: 'white',
		paddingTop: 40,
		paddingHorizontal: 0,
		marginHorizontal: 0,
	},
	selectParagraph: {
		marginBottom: 40
	},
});



export default StudentUploadedFileDialog;