import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Dialog, List, Paragraph, Text, Portal, Surface} from 'react-native-paper';
import {Homework} from "../models/Homework";
import {Course} from "../models/Course";
import {Teacher} from "../models/Teacher";

import {
  getFirebaseStorageUrlFromObjects,
  getUploadedFilesOfStudent,
  selectFile,
  uploadFile
} from "../utils/FirebaseStorageUtils";

import moment from "moment";
import {dateFormat} from "../constants/Date";
import {convertStatusToEnum} from "../utils/HomeworkStatusUtils";
import {StatusEnum} from "../constants/StatusToColor";
import {DocumentResultFixed} from "../types";


interface CourseListCourseItemDialogProps {
    homework: Homework,
    closeDialog: React.Dispatch<React.SetStateAction<boolean>>,
    course: Course,
    teacher: Teacher
}


const CourseListCourseItemDialog: React.FC<CourseListCourseItemDialogProps> = ({ homework, course, teacher, closeDialog }): JSX.Element => {
	
    const [currentAttempts, setCurrentAttempts] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState<{ name: string, date: string }[]>([]);
    const [selectedFile, setSelectedFile] = useState<DocumentResultFixed>();

    const hideDialog = () => closeDialog(false);

    const selectFileWrapper = async () => {
        const file = await selectFile()

        setSelectedFile(file)
    }

    const uploadFileWrapper = async () => {
        let url = getFirebaseStorageUrlFromObjects(course, teacher, homework, "Student")
        url = `${url}/${moment().format(dateFormat)}/${selectedFile?.name}`;
        console.log("upload file wrapper ", url)
        uploadFile(selectedFile, url)
          .then((_) => {
              setTimeout(() => {
                getUploadedFilesOfStudent(course, teacher, homework)
                    .then((uploadFiles) => {
                        setUploadedFiles(uploadFiles);
                        setCurrentAttempts(uploadFiles.length)
                        setSelectedFile(undefined)
                    })
              }, 1000)
          })
    }

    const isOutOfAttempts = () => {
        return currentAttempts >= homework.totalAttempts
    }

    useEffect(() => {
    }, [homework, uploadedFiles])

    useEffect(() => {
        getUploadedFilesOfStudent(course, teacher, homework)
          .then((files) => {
              setUploadedFiles(files)
              setCurrentAttempts(files.length)
          })
    }, []);

    const isHomeworkDone = () => {
      return convertStatusToEnum(homework.status) === StatusEnum.DONE;
  }

  return (
        <Surface>
            <Portal>
                <Dialog visible={true} onDismiss={hideDialog}>
                    <Dialog.Title>Upload File</Dialog.Title>

                    <Dialog.Content>
                        <Paragraph style={{ marginBottom: 20 }}>Please select your homework to upload.</Paragraph>

                        {isOutOfAttempts() ?
                            <Paragraph style={styles.selectParagraph}>No attempts left! (Total {homework.totalAttempts})</Paragraph> :
                            <Paragraph style={styles.selectParagraph}>Attempt {currentAttempts} of {homework.totalAttempts}</Paragraph>
                        }

                        {
                            <Surface>
                                <Paragraph>You've uploaded file(s): </Paragraph>
                                {uploadedFiles.map((file) => {
                                    return (
                                        <Text key={file.date} >{file.name} - {moment(file.date, dateFormat).fromNow()}</Text>
                                    )
                                })}
                            </Surface>
                        }

                      <Paragraph style={styles.selectParagraph}> </Paragraph>

                        {selectedFile &&
                            <List.Accordion
                                title="Selected File"
                                expanded={true}
                                left={props => <List.Icon {...props} icon="file" />}>

                                <List.Item key={selectedFile.uri} title={selectedFile?.name} />
                            </List.Accordion>
                        }

                    </Dialog.Content>

                    <Dialog.Actions>
                            <Button onPress={selectFileWrapper} disabled={isOutOfAttempts() || isHomeworkDone()} style={ {paddingTop: 30, paddingBottom: 10} }>SELECT FILE</Button>
                            <Button onPress={uploadFileWrapper} disabled={isOutOfAttempts() || !selectedFile || isHomeworkDone()} style={ {paddingTop: 30, paddingBottom: 10, paddingLeft: 20} }>UPLOAD</Button>
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



export default CourseListCourseItemDialog;