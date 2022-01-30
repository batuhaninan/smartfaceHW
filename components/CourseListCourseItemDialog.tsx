import { StyleSheet } from 'react-native';

import React, { useEffect, useState } from 'react';


import { Dialog, List, Surface, Paragraph, Portal, Button } from 'react-native-paper';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from "expo-file-system";
import {Homework} from "../models/Homework";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {Course} from "../models/Course";
import {Teacher} from "../models/Teacher";

import AsyncStorage from '@react-native-async-storage/async-storage';


import auth from "../firebase"



interface CourseListCourseItemDialogProps {
    homework: Homework,
    closeDialog: React.Dispatch<React.SetStateAction<boolean>>,
    course: Course,
    teacher: Teacher
}


const CourseListCourseItemDialog: React.FC<CourseListCourseItemDialogProps> = ({ homework, course, teacher, closeDialog }): JSX.Element => {
	
    const [didSelect, setDidSelect] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentResult[]>([]);

    const hideDialog = () => closeDialog(false);

    const getUploadedFiles = async () => {
        const storage = getStorage();

        // gs://smartfacehomeworkapp.appspot.com/Python/Batuhan Inan/Ödev 1/homeworks/

        const files: string[] = [];

        const gsRef = ref(storage, `gs://smartfacehomeworkapp.appspot.com/${course.name}/${teacher.name}/${homework.title}/homeworks/${auth.auth.currentUser?.email}`);

        console.log("Trying to download file")

        const bucketList = await listAll(gsRef)

        await Promise.all(bucketList.prefixes.map(async (folderRef) => {
            const bucketFolder = await listAll(folderRef)
            await Promise.all(bucketFolder.items.map((item) => {
                files.push(item.name)
                console.log(folderRef.fullPath + "/" + item.name)
            }))
        }))

        // setUploadedFiles(files)
        homework.currentAttempts = files.length;
    }
    
    const uploadFile = () => {
        selectedFile.map(async (file) => {
            if (file.type !== "cancel") {
                const storage = getStorage();

                const uri = FileSystem.documentDirectory + file.name;

                await FileSystem.copyAsync({
                    from: file.uri,
                    to: uri
                })

                const fetchResponse = await fetch(uri);
                const blob = await fetchResponse.blob();

                let storageRef = ref(storage, `${course.name}/${teacher.name}/${homework.title}/homeworks/${auth.auth.currentUser?.email}/${new Date().toLocaleString("tr-TR")}/${file.name}`);


                uploadBytes(storageRef, blob).then((snapshot) => {
                    console.log(`Upload ${file.name} to ${storageRef.toString()}`)
                })
                // homework.uploadedFileNames.push(file.name);
            }
        })
        
        // homework.isUploaded = true;
        // homework.currentAttempts += 1;

        // setSelectedFiles([]);
        // setDidSelect(false);
    }

    const selectFile = () => {
        DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            multiple: true
        })
        .then((file) => {
            if (file.type === "success") {
                setSelectedFile([file]);
                setDidSelect(true);
                return;
            }
        })
    }

    const isOutOfAttempts = () => {
        return homework.currentAttempts >= homework.totalAttempts
    }

    useEffect(() => {
    }, [homework, homework.currentAttempts])

    getUploadedFiles()

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
                                {homework.uploadedFiles.map((fileName) => {
                                    return (
                                        <Paragraph key={fileName} >{fileName}</Paragraph>
                                    )
                                })}
                            </Surface>
                        }

                        <Paragraph style={styles.selectParagraph} />

                        {didSelect && 
                            <List.Accordion
                                title="Selected File"
                                expanded={true}
                                left={props => <List.Icon {...props} icon="file" />}
                                style={styles.selectedFileDiv}>
                                
                                {selectedFile.map((file) => {
                                    return (
                                        <List.Item key={file.uri} title={file.name} />
                                    )
                                })}
                            </List.Accordion>
                        }

                    </Dialog.Content>

                    <Dialog.Actions>
                            <Button onPress={selectFile} disabled={isOutOfAttempts()} style={ {paddingTop: 30, paddingBottom: 10} }>SELECT FILE</Button>
                            <Button onPress={uploadFile} disabled={isOutOfAttempts()} style={ {paddingTop: 30, paddingBottom: 10, paddingLeft: 20} }>UPLOAD</Button>
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



export default CourseListCourseItemDialog;