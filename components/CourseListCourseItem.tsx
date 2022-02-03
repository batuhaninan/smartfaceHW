import { List, Surface } from 'react-native-paper';
import React, { useState } from 'react';

import CourseListCourseItemDialog from "./CourseListCourseItemDialog";
import {Course} from "../models/Course";
import {Homework} from "../models/Homework";
import {Teacher} from "../models/Teacher";

import {convertStatusToEnum, statusToIcon, statusToColor} from "../utils/HomeworkStatusUtils";

interface CourseListCourseItemProps {
    course: Course
		teacher: Teacher
		homeworks: Homework[]

}

const CourseListCourseItem: React.FC<CourseListCourseItemProps> = ({ course, teacher, homeworks }): JSX.Element => {
	
	
	const [expanded, setExpanded] = useState(false);
	const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
	const [selectedHomework, setSelectedHomework] = useState<Homework>();

	const handlePress = () => setExpanded(!expanded);

	const extendRowInfo = (index: number) => {
        if (homeworks !== undefined) {
            setSelectedHomework(homeworks[index]);
            setShouldOpenDialog(true);
        }
	}


  return (
      <Surface>
          {shouldOpenDialog &&
              <CourseListCourseItemDialog homework={selectedHomework!} closeDialog={setShouldOpenDialog} course={course} teacher={teacher} />}

          <List.Accordion
              title={course.name}
              description={"Teacher: " + teacher.name}
              left={_props => <List.Icon {..._props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}>

              {homeworks.map((homework: Homework, index: number) => {
								return (
                      <List.Item key={homework.title} style={{ backgroundColor: statusToColor(convertStatusToEnum(homework.status)!) }} right={_props => <List.Icon {..._props} icon={ statusToIcon(convertStatusToEnum(homework.status)!) } />} descriptionNumberOfLines={2} title={homework.title} onPress={() => {extendRowInfo(index)}} />
                  )
              })}
          </List.Accordion>
      </Surface>
    );
}

export default CourseListCourseItem;