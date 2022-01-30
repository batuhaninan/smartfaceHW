import { StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';


import { UploadedHomework } from "../types";
import { Dialog, Snackbar, List, Surface, Paragraph, Portal, Button } from 'react-native-paper';



interface HomeworkListItemDialogProps {
    homework: UploadedHomework,
    courseName: string,
    closeDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const HomeworkListItemDialog: React.FC<HomeworkListItemDialogProps> = ({ homework, courseName, closeDialog }): JSX.Element => {
	
    const hideDialog = () => closeDialog(false);
    
    useEffect(() => {

    }, [homework])
    

    return (
        <List.Item descriptionNumberOfLines={2} key={homework.homeworkTitle} title={homework.homeworkTitle} />

        // <Portal>
        //     <Dialog visible={true} onDismiss={hideDialog}>
        //         <Dialog.Title>Uploaded files for {courseName}</Dialog.Title>

        //         <Dialog.Content>
        //             <Paragraph>{homework.homeworkTitle}</Paragraph>
        //         </Dialog.Content>
        //     </Dialog>
        // </Portal>
    )
    
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



export default HomeworkListItemDialog;