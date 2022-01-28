import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps, Course } from '../types';

import { useState } from 'react';

import HomeworkList from "../components/HomeworkList";


var courses: Course[] = [{
  "courseName": "Python",
  "teacher": {
    "id": 1,
    "name": "Batuhan Inan",
    "age": 23,
  }, 
  "homeworks": [
    {
      "id": 1,
      "name": "Ödev 1",
      "studentCount": 159,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]
},
{
  "courseName":"C++",
  "teacher": {
    "id": 1,
    "name": "Atilla Başaran",
    "age": 24,
  },
  "homeworks": [
    {
      "id": 2,
      "name": "Ödev 1",
      "studentCount": 120,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    },
    {
      "id": 3,
      "name": "Ödev 2",
      "studentCount": 30,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]
},
{
  "courseName":"C",
  "teacher": {
    "id": 1,
    "name": "Emre Şallı",
    "age": 25,
  },
  "homeworks": [
    {
      "id": 4,
      "name": "Ödev 1",
      "studentCount": 40,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    },
    {
      "id": 5,
      "name": "Ödev 2",
      "studentCount": 50,
      "totalAttempts": 5,
      "currentAttempts": 1,
      "isUploaded": false,
      "uploadedFileNames": [],
    }
  ]},
]

export default function StudentScreen({ navigation }: RootTabScreenProps<'StudentScreen'>) {



  return (
    <View style={styles.container}>

      <HomeworkList 
        courses={courses}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
