import {Dimensions, StyleSheet} from 'react-native';
import {SyntheticEvent, useEffect, useState} from 'react';
import { View } from '../components/Themed';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import Constants from "expo-constants";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignupScreen from "./SignupScreen";
import {app} from "../firebase";
import DropDown from "react-native-paper-dropdown";
import {LinearGradient} from "expo-linear-gradient";
import {validateUserTypeByEmail} from "../utils/FirebaseStorageUtils";


const roleList = [
	{
		label: "Principal",
		value: "Principal",
	},
	{
		label: "Teacher",
		value: "Teacher",
	},
	{
		label: "Student",
		value: "Student",
	},
];

// @ts-ignore
export default function LandingScreen({ navigation }) {

	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const [loginSuccessful, setLoginSuccessful] = useState(false);
	const [failedLoginText, setFailedLoginText] = useState("");

	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const onDismissSnackbar = () => setSnackbarVisible(false);

	const [showDropDown, setShowDropDown] = useState(false);
	const [role, setRole] = useState("");

	const loginWrapper = async (_: SyntheticEvent) => {
		// signInWithEmailAndPassword(getAuth(app), "student_2@gmail.com", "123456")
		// 	.then(() => {
		// 		navigation.navigate("StudentScreen");
		// 	})
		// signInWithEmailAndPassword(getAuth(app), "teacher_2@gmail.com", "123456")
		// 	.then(() => {
		// 		navigation.navigate("TeacherScreen");
		// 	})
		// signInWithEmailAndPassword(getAuth(app), "principal@gmail.com", "123456")
		// 	.then(() => {
		// 		navigation.navigate("PrincipalScreen");
		// 	})
		// return;
		const isCorrectUserType = await validateUserTypeByEmail(emailText, role);
		if (!isCorrectUserType) {
			setFailedLoginText(`You are not a ${role}!`);
			setLoginSuccessful(false);
			setSnackbarVisible(true);
			return;
		}
		signInWithEmailAndPassword(getAuth(app), emailText, passwordText)
			.then(async (_) => {
				setLoginSuccessful(true);
				navigation.navigate(`${role}Screen`);
			})
			.catch((e) => {
				setFailedLoginText("Please check your information!");
				setLoginSuccessful(false);
				setSnackbarVisible(true);
			});
	}

	const signupWrapper = (_: SyntheticEvent) => {
		navigation.navigate("SignupScreen")
	}

	useEffect(() => {
	}, [shouldShowPassword]);


	return (
		<View style={styles.container}>

			<TextInput
				label="Email"
				mode="outlined"
				keyboardType="email-address"
				style={styles.emailField}
				value={emailText}
				onChangeText={text => {setEmailText(text)}}
			/>

			{
				shouldShowPassword ?
					<TextInput
						label="Password"
						mode="outlined"
						keyboardType={"visible-password"}
						style={styles.passwordField}
						value={passwordText}
						right={<TextInput.Icon onPress={() => { setShouldShowPassword(!shouldShowPassword) }} name="eye" />}
						onChangeText={text => {setPasswordText(text)}}
					/> :
					<TextInput
						label="Password"
						mode="outlined"
						secureTextEntry
						style={styles.passwordField}
						value={passwordText}
						right={<TextInput.Icon onPress={() => { setShouldShowPassword(!shouldShowPassword) }} name="eye" />}
						onChangeText={text => {setPasswordText(text)}}
					/>

			}

			<DropDown
				label={"Role"}
				mode={"outlined"}
				visible={showDropDown}
				showDropDown={() => setShowDropDown(true)}
				onDismiss={() => setShowDropDown(false)}
				value={role}
				setValue={setRole}
				list={roleList}

			/>

			<Button style={styles.loginButton} mode="contained" onPress={loginWrapper}>
				Log in
			</Button>

			<Button style={styles.signupButton} mode="contained" onPress={signupWrapper}>
				Sign up
			</Button>

			<Snackbar
				visible={snackbarVisible}
				onDismiss={onDismissSnackbar}
				style={{ marginTop: 20 }}
				action={{
					label: 'Dismiss',
					onPress: () => {
						onDismissSnackbar();
					},
				}}>
				{loginSuccessful ? "Log in Successful" : failedLoginText}
			</Snackbar>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		width: "80%",
		marginLeft: Dimensions.get("window").width / 10,
		marginBottom: Dimensions.get("window").width / 10,
		borderRadius: 90,
		backgroundColor: "transparent",
	},
	emailField: {
		marginTop: 30,
	},
	passwordField: {
		marginVertical: 30,
	},
	loginButton: {
		marginTop: Dimensions.get("screen").height - 550,
	},
	signupButton: {
		marginTop: 20,
	},
});
