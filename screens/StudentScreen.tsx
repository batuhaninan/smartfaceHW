import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { useState } from 'react';

import DataTableWithPagination from "../components/DataTableWithPagination";


export default function StudentScreen({ navigation }: RootTabScreenProps<'StudentScreen'>) {
  
  const [teachers, setTeachers] = useState<{ id: number, name: string, studentCount: number }[]>(
    [{
      "id": 1,
      "name": "Batuhan Inan",
      "studentCount": 159
    },
    {
      "id": 2,
      "name": "Atilla Başaran",
      "studentCount": 120
    },
    {
      "id": 3,
      "name": "Emre Şallı",
      "studentCount": 30
    },
    {
      "id": 4,
      "name": "4 numaralı teacher",
      "studentCount": 40
    },
    {
      "id": 5,
      "name": "5 numaralı teacher",
      "studentCount": 50
    }
    ]
  )

  const extendTeacherInfos = (teacherID: number) => {
    const teacherName = teachers.find((teacher) => teacher.id == teacherID)?.name;
    console.log("Show info of teacher of id ", teacherID, ", which is ", teacherName)
  }

  const dataTableHeaders: string[] = ["Teacher ID", "Teacher Name", "Student Count"]; 

  return (
    <View style={styles.container}>

      <DataTableWithPagination 
        data={teachers}
        dataTableHeaders={dataTableHeaders}
        optionsPerPage={3}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
