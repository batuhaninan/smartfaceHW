import { StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';


import { Homework } from "../types";
import { Dialog, Snackbar, List, Surface, Paragraph, Portal, Button } from 'react-native-paper';

import * as DocumentPicker from 'expo-document-picker';



interface HomeworkListCourseItemDialogProps {
    homework: Homework,
    closeDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const HomeworkListCourseItemDialog: React.FC<HomeworkListCourseItemDialogProps> = ({ homework, closeDialog }): JSX.Element => {
	
    const [didSelect, setDidSelect] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<DocumentPicker.DocumentResult[]>([]);

    const hideDialog = () => closeDialog(false);
    
    const uploadFiles = () => {
        selectedFiles.map((file) => {
            console.log(`Uploading ${file.name}`);
            homework.uploadedFileNames.push(file.name);
        })
        
        homework.isUploaded = true;
        homework.currentAttempts += 1;

        setSelectedFiles([]);
        setDidSelect(false);
    }

    const selectFile = () => {
        DocumentPicker.getDocumentAsync({
            multiple: true
        })
        .then((file) => {
            if (file.type === "success") {
                setSelectedFiles([...selectedFiles, file]);
                setDidSelect(true);
                return;
            }
        })
    }

    const isOutOfAttempts = () => {
        return homework.currentAttempts >= homework.totalAttempts
    }

    useEffect(() => {

    }, [homework])

    return (
        <Surface>
            <Portal>
                <Dialog visible={true} onDismiss={hideDialog}>
                    <Dialog.Title>Upload File</Dialog.Title>

                    <Dialog.Content>
                        <Paragraph style={{ marginBottom: 20 }}>Please select your homework to upload.</Paragraph>

                        {isOutOfAttempts() ?
                            <Paragraph style={styles.selectParagraph}>No attempts left! (Total {homework.totalAttempts})</Paragraph> :
                            <Paragraph style={styles.selectParagraph}>Attempt {homework.currentAttempts} of {homework.totalAttempts}</Paragraph>
                        }

                        {(homework.isUploaded) && 
                            <Surface>
                                <Paragraph>You've uploaded file(s): </Paragraph>
                                {homework.uploadedFileNames.map((fileName) => {
                                    return (
                                        <Paragraph key={fileName} >{fileName}</Paragraph>
                                    )
                                })}
                            </Surface>
                        }

                        <Paragraph style={styles.selectParagraph}></Paragraph>

                        {didSelect && 
                            <List.Accordion
                                title="Selected File"
                                expanded={true}
                                left={props => <List.Icon {...props} icon="file" />}
                                style={styles.selectedFilesDiv}>
                                
                                {selectedFiles.map((file) => {
                                    return (
                                        <List.Item key={file.uri} title={file.name} />
                                    )
                                })}
                            </List.Accordion>
                        }

                    </Dialog.Content>

                    <Dialog.Actions>
                            <Button onPress={selectFile} disabled={isOutOfAttempts()} style={ {paddingTop: 30, paddingBottom: 10} }>SELECT FILE</Button>
                            <Button onPress={uploadFiles} disabled={isOutOfAttempts()} style={ {paddingTop: 30, paddingBottom: 10, paddingLeft: 20} }>UPLOAD</Button>
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
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    selectParagraph: {
        marginBottom: 40
    },
    warningParagraph: {
        padding: 20,
    }
});



export default HomeworkListCourseItemDialog;