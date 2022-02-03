import React from 'react';
import {Button, Dialog, Text, Portal, Surface} from 'react-native-paper';
import {openDownloadedFile} from "../utils/FirebaseStorageUtils";
import {UploadedFileByStudent} from "../types";


interface StudentUploadedFileDialogProps {
	file: UploadedFileByStudent,
	closeDialog: React.Dispatch<React.SetStateAction<boolean>>,
}


const StudentUploadedFileDialog: React.FC<StudentUploadedFileDialogProps> = ({ file, closeDialog }): JSX.Element => {

	const hideDialog = () => closeDialog(false);

	const openDownloadedFileWrapper = () => {
		const filePath = file.filePath;
		openDownloadedFile(file.filePath.split("/")[6], filePath)
			.then((_) => {
			});
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
						<Button onPress={openDownloadedFileWrapper} style={ {paddingTop: 30, paddingBottom: 10, paddingLeft: 20} }>Download homework</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Surface>
	);
}

export default StudentUploadedFileDialog;