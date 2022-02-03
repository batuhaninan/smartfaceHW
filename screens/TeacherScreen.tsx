import {useEffect, useState} from 'react';
import { View } from '../components/Themed';
import { List } from 'react-native-paper';
import {styles} from "../Styles";
import {getAllCoursesAndHomeworksOfTeacher} from "../utils/FirebaseStorageUtils";
import CourseListByStudent from "../components/CourseListByStudent";



export default function TeacherScreen() {

  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    getAllCoursesAndHomeworksOfTeacher().then(r => {
      setCourses(r)
    })

  }, [])

  return (
    <View style={styles.container}>
        <List.Section title={"Courses"}>
          {courses.map((course: any) => {
            return <CourseListByStudent key={course.course.name} course={course}/>
          })}
        </List.Section>
    </View>
  );
}
