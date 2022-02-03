import {useEffect, useState} from 'react';
import { View } from '../components/Themed';
import {ActivityIndicator, List} from 'react-native-paper';
import {styles} from "../Styles";
import {getAllCoursesAndHomeworksOfTeacher} from "../utils/FirebaseStorageUtils";
import CourseListByStudent from "../components/CourseListByStudent";



export default function TeacherScreen() {

  const [courses, setCourses] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllCoursesAndHomeworksOfTeacher(setCourses)
      .then((_) => {
        setIsLoading(false);
      })
    }, []);

  return (
    <View style={styles.container}>
        <List.Section title={"Courses"}>
          {courses.map((course: any) => {
            return <CourseListByStudent key={course.course.name} course={course}/>
          })}
        </List.Section>
      {isLoading &&
        <ActivityIndicator animating={true} color="purple" size="large" />}
    </View>
  );
}
