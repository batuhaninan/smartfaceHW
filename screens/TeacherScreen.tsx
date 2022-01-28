import { StyleSheet } from 'react-native';

import { useState } from 'react';


import { Text, View } from '../components/Themed';

import { Surface, List } from 'react-native-paper';


import { Course } from '../types';


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

const hws = [
  {
    "courseName": "Python",
    "homeworks": [
      {
        "studentName": "Batuhan Inan",
        "uploaded_homeworks": [
          {
            "Ödev 1": {
              "file": "dummy.png"
            }
          },
          {
            "Ödev 2": {
              "file": "ödev_2.png"
            }
          },
        ]
      },
      {
        "studentName": "Atilla Başaran",
        "uploaded_homeworks": [
          {
            "Ödev 1": {
              "file": "ödev_1.png"
            }
          },
          {
            "Ödev 2": {
              "file": "EMPTY"
            }
          },
        ]
      }
    ]
  },
  {
    "courseName": "C++",
    "homeworks": [
      {
        "studentName": "Batuhan Inan",
        "uploaded_homeworks": [
          {
            "Ödev 1": {
              "file": "dummy.png"
            }
          },
          {
            "Ödev 2": {
              "file": "ödev_2.png"
            }
          },
        ]
      },
      {
        "studentName": "Atilla Başaran",
        "uploaded_homeworks": [
          {
            "Ödev 1": {
              "file": "ödev_1.png"
            }
          },
          {
            "Ödev 2": {
              "file": "EMPTY"
            }
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
      

      <List.Section title="Courses" >
    
        {hws.map((course) => {
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
        })}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
