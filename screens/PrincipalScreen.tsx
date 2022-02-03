import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import {CourseData, RootTabScreenProps} from '../types';
import CourseList from "../components/CourseList";
import {useEffect, useState} from "react";
import {getData} from "../utils/FirebaseStorageUtils";
import {styles} from "../Styles";




export default function PrincipalScreen({ navigation }: RootTabScreenProps<'PrincipalScreen'>) {


  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    getData().then(r => { setCourses(r) })
  }, [])


  return (
    <View style={styles.container}>

      <CourseList
        courses={courses}
      />

    </View>
  );
}