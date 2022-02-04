import { View } from '../components/Themed';
import {TeacherCourseData} from '../types';
import {useEffect, useState} from "react";
import {getAllCoursesAndAllHomeworks} from "../utils/FirebaseStorageUtils";
import {styles} from "../Styles";
import {ActivityIndicator, BottomNavigation, List, Text} from "react-native-paper";
import CourseListByStudent from "../components/CourseListByStudent";




// @ts-ignore
export default function PrincipalScreen({ navigation }) {

  const [courses, setCourses] = useState<TeacherCourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllCoursesAndAllHomeworks(setCourses)
      .then((_) => {
        setIsLoading(false);
      })
  }, [])




  return (
    <View style={styles.container}>
      <List.Section title={"Courses"}>
        {courses.map((course) => {
          return <CourseListByStudent key={course.course.name} course={course}/>
        })}
      </List.Section>
      {isLoading &&
        <ActivityIndicator animating={true} color="purple" size="large" />}
    </View>
  );
}