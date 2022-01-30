import { StyleSheet } from 'react-native';

import { useState } from 'react';


import { Text, View } from '../components/Themed';

import HomeworkList from "../components/HomeworkList"

import { Surface, List } from 'react-native-paper';


import { Course, UploadedHomeworksByCourse } from '../types';


var data: Course[] = [
  {
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
      },
      {
        "id": 1,
        "name": "Ödev 2",
        "studentCount": 159,
        "totalAttempts": 5,
        "currentAttempts": 1,
        "isUploaded": false,
        "uploadedFileNames": [],
      }
    ]
  },
  {
    "courseName": "C++",
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
      },
      {
        "id": 1,
        "name": "Ödev 2",
        "studentCount": 159,
        "totalAttempts": 5,
        "currentAttempts": 1,
        "isUploaded": false,
        "uploadedFileNames": [],
      }
    ]
  },
]

const hws: UploadedHomeworksByCourse[] = [
  {
    "courseName": "Python",
    "students": [
      {
        "studentName": "Batuhan Inan",
        "uploadedHomeworks": [
          {
            "homeworkTitle": "Ödev 1",
            "file": "dummy.png"
          },
          {
            "homeworkTitle": "Ödev 2",
            "file": "dummy.png"
          },
        ]
      },
      {
        "studentName": "Atilla Başaran",
        "uploadedHomeworks": [
          {
            "homeworkTitle": "Ödev 1",
            "file": "dummy.png"
          },
          {
            "homeworkTitle": "Ödev 2",
            "file": "dummy.png"
          },
        ]
      }
    ]
  },
  {
    "courseName": "C++",
    "students": [
      {
        "studentName": "Batuhan Inan",
        "uploadedHomeworks": [
          {
            "homeworkTitle": "Ödev 1",
            "file": "dummy.png"
          },
          {
            "homeworkTitle": "Ödev 2",
            "file": "dummy.png"
          },
        ]
      },
      {
        "studentName": "Atilla Başaran",
        "uploadedHomeworks": [
          {
            "homeworkTitle": "Ödev 1",
            "file": "dummy.png"
          },
          {
            "homeworkTitle": "Ödev 2",
            "file": "dummy.png"
          },
        ]
      }
    ]
  }
]

export default function TeacherScreen() {


  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Show teacher's courses</Text>
      <Text>Then show all homeworks</Text>
      <Text>Add status to each homework of each student</Text>
      <Text>Then expand on the homework and see all students uploaded files</Text>
      

        <HomeworkList 
          courses={hws}
        />
        {/* {hws.map((course) => {
          return (
            <List.Accordion title={course.courseName}>
              {
                course.homeworks.map((hw) => {
                  return (
                    <List.Item title={hw.studentName}>
                      
                    </List.Item>
                  )
                })
              }
            </List.Accordion>
          )
        })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
