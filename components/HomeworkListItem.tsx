import { StyleSheet } from 'react-native';

import { List } from 'react-native-paper';

import { UploadedHomeworkStudent } from "../types";


interface HomeworkListItemProps {
	homework: UploadedHomeworkStudent,
    index: number,
    extendRowInfo: any
}


const HomeworkListItem: React.FC<HomeworkListItemProps> = ({ homework, index, extendRowInfo }): JSX.Element => {
	
	return (
        <List.Item descriptionNumberOfLines={2} key={homework.studentName} title={homework.studentName} onPress={() => {extendRowInfo(index)}} />
	);
}

export default HomeworkListItem;