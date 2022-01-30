import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

import {List, Paragraph, Surface} from 'react-native-paper';

import HomeworkListItem from "./HomeworkListItem";

import HomeworkListItemDialog from "./HomeworkListItemDialog";

import {UploadedHomeworksByCourse, UploadedHomework, UploadedHomeworkStudent, CourseData, Course} from "../types";


interface HomeworkListProps {
	courses: CourseData,
}


const HomeworkList: React.FC<HomeworkListProps> = ({ courses }): JSX.Element => {
	
	
	const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
	const [selectedHomework, setSelectedHomework] = useState<any>();

	const extendRowInfo = (courseIndex: number, studentIndex: number) => {
        // setSelectedHomework(courses[courseIndex].students[studentIndex]);
        setShouldOpenDialog(true);
	}

	return (
		
        <Surface>
            {shouldOpenDialog === true &&
                <HomeworkListItemDialog homeworkItem={selectedHomework} courseName={selectedHomework.courseName} closeDialog={setShouldOpenDialog}/>
            }
            <List.Section title="Homeworks" >
                
                {courses.map((course: CourseData, courseIndex: number) => {
                    return (
                        <List.Accordion title={course.courseName} >
	                        <Paragraph>{course.courseName}</Paragraph>
                            {course.students.map((student: UploadedHomeworkStudent, studentIndex: number) => {
                                return (
                                    <List.Accordion title={student.studentName}>
                                        {student.uploadedHomeworks.map((homework: UploadedHomework) => {
                                            return (
                                                <HomeworkListItem
                                                    extendRowInfo={() => extendRowInfo(courseIndex, studentIndex)}
                                                    homework={homework}
                                                    index={courseIndex}
                                                    courseName={course.courseName}
                                                />
                                            )
                                        })}
                                    </List.Accordion>
                                )
                            })}
                        </List.Accordion>
                    )
                })}
            </List.Section>
        </Surface>
        
	);
}

export default HomeworkList;