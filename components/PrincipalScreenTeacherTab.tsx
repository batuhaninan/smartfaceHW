import React, {useEffect, useState} from "react";
import {getAllTeachersAndTheirStudents} from "../utils/FirebaseStorageUtils";
import {View} from "./Themed";
import {styles} from "../Styles";
import {ActivityIndicator, List} from "react-native-paper";
import {AllTeachersAndStudents} from "../types";

const PrincipalScreenTeacherTab = () => {

	const [teachersData, setTeachersData] = useState<AllTeachersAndStudents[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllTeachersAndTheirStudents(setTeachersData)
			.then((_) => {
				setIsLoading(false);
			})
	}, [])

	return (
		<View style={styles.tabItemContainer}>
			<List.Section title={"Teachers"}>
				{teachersData.map((teacherData) => {
					return (
						<List.Accordion key={teacherData.teacher.name} title={teacherData.teacher.name}>
							{teacherData.coursesAndStudents.map((courseAndStudents) => {
								return (
									<List.Accordion title={courseAndStudents.course} style={{ backgroundColor: "#eee6e6" }}>
										{courseAndStudents.students.map((student, iStudent) => {
											return (
												<List.Item key={iStudent + student.name + courseAndStudents.course + teacherData.teacher.name} title={student.name} />
											)
										})}
									</List.Accordion>
								)
							})}
						</List.Accordion>
					)
				})}
			</List.Section>
			{isLoading &&
          <ActivityIndicator animating={true} color="purple" size="large" />}
		</View>
	)
};

export default PrincipalScreenTeacherTab;