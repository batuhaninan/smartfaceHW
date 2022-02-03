import { View } from '../components/Themed';
import {CourseData} from '../types';
import CourseList from "../components/CourseList";
import {useEffect, useState} from "react";
import {getAllCoursesAndAllHomeworks, } from "../utils/FirebaseStorageUtils";
import {styles} from "../Styles";
import {ActivityIndicator} from "react-native-paper";


// @ts-ignore
export default function PrincipalScreen({ navigation }) {

  const [courses, setCourses] = useState<CourseData[]>([]);
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
      <CourseList
        courses={courses}
      />
      {isLoading &&
        <ActivityIndicator animating={true} color="purple" size="large" />}
    </View>
  );
}