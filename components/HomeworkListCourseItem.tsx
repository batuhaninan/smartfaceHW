import { StyleSheet } from 'react-native';

import { List, Surface } from 'react-native-paper';
import { useState } from 'react';

import { Course, Homework } from "../types"

import HomeworkListCourseItemDialog from "./HomeworkListCourseItemDialog";


interface HomeworkListCourseItemProps {
    course: Course
}

const HomeworkListCourseItem: React.FC<HomeworkListCourseItemProps> = ({ course }): JSX.Element => {
	
	
	const [expanded, setExpanded] = useState(false);
	const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
	const [selectedHomework, setSelectedHomework] = useState<Homework>();

	const handlePress = () => setExpanded(!expanded);

	const extendRowInfo = (index: number) => {
        if (course.homeworks !== undefined) {
            setSelectedHomework(course.homeworks[index]);
            setShouldOpenDialog(true);    
        }
	}

    return (
        <Surface>
            {shouldOpenDialog === true &&
                <HomeworkListCourseItemDialog homework={selectedHomework} closeDialog={setShouldOpenDialog} />}

            <List.Accordion
                title={course.courseName}
                description={"Teacher: " + course.teacher.name}
                left={_props => <List.Icon {..._props} icon="folder" />}
                expanded={expanded}
                onPress={handlePress}>

                {course.homeworks.map((homework: any, index: any) => {
                    return (
                        <List.Item descriptionNumberOfLines={2} key={homework.name} title={homework.name + `\n\n${homework.currentAttempts}/${homework.totalAttempts}`} onPress={() => {extendRowInfo(index)}} />
                    )
                })}
            </List.Accordion>
        </Surface>
    );
}

const styles = StyleSheet.create({
});

export default HomeworkListCourseItem;