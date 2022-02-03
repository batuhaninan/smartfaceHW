import {Dimensions, StyleSheet} from 'react-native';

import {SyntheticEvent, useState} from 'react';


import { View } from '../components/Themed';

import { Button, TextInput, Snackbar } from 'react-native-paper';
import Constants from "expo-constants";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DropDown from "react-native-paper-dropdown";
import {addUser} from "../utils/FirebaseStorageUtils";


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
export default function SignupScreen ({ navigation }) {

	const [emailText, setEmailText] = useState("");
	const [nameText, setNameText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [passwordAgainText, setPasswordAgainText] = useState("");

	const [showDropDown, setShowDropDown] = useState(false);
	const [role, setRole] = useState("");

	const [signupSuccessful, setSignupSuccessful] = useState(false);

	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const onDismissSnackbar = () => setSnackbarVisible(false);

	const signupWrapper = (_: SyntheticEvent) => {
		if (passwordText !== passwordAgainText) {
			setSignupSuccessful(false);
			setSnackbarVisible(true)
			return;
		}

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, emailText, passwordText)
			.then(async (_) => {

				await addUser(nameText, emailText, role);

				setSignupSuccessful(true);
				setSnackbarVisible(true)
			})
	}

	const signinWrapper = (_: SyntheticEvent) => {
		navigation.navigate("Root")
	}

	return (
		<View style={styles.container}>
				<TextInput
					label="Name"
					mode="outlined"
					keyboardType="email-address"
					style={styles.emailField}
					value={nameText}
					onChangeText={text => {setNameText(text)}}
				/>

				<TextInput
					label="Email"
					mode="outlined"
					keyboardType="email-address"
					style={styles.emailField}
					value={emailText}
					onChangeText={text => {setEmailText(text)}}
				/>

				<TextInput
					label="Password"
					mode="outlined"
					keyboardType={"visible-password"}
					style={styles.passwordField}
					value={passwordText}
					onChangeText={text => {setPasswordText(text)}}
				/>

				<TextInput
					label="Password Again"
					mode="outlined"
					keyboardType={"visible-password"}
					style={styles.passwordAgainField}
					value={passwordAgainText}
					onChangeText={text => {setPasswordAgainText(text)}}
				/>

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

				<Button style={styles.signupButton} mode="contained" onPress={signupWrapper}>
					Sign Up
				</Button>

				<Button style={styles.signinButton} mode="contained" onPress={signinWrapper}>
					Sign In
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
					{signupSuccessful ? "Signup Successful" : "Please check your information!"}
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
		marginTop: 30,
	},
	passwordAgainField: {
		marginTop: 30,
		marginBottom: 30,
	},
	signupButton: {
		marginTop: Dimensions.get("screen").height - 700,
	},
	signinButton: {
		marginTop: 20,
	},
});
