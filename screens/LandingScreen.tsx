import {Dimensions, StyleSheet} from 'react-native';

import {SyntheticEvent, useEffect, useState} from 'react';


import { Text, View } from '../components/Themed';

import {Button, Snackbar, TextInput} from 'react-native-paper';
import Constants from "expo-constants";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignupScreen from "./SignupScreen";
import {determineUserScreenByType} from "../utils/FirebaseStorageUtils";
import {app} from "../firebase";



interface LandingScreenProps {
	navigation: any
}

export default function LandingScreen({ navigation }) {

	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const [loginSuccessful, setLoginSuccessful] = useState(false);

	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const onToggleSnackbar = () => setSnackbarVisible(!snackbarVisible);
	const onDismissSnackbar = () => setSnackbarVisible(false);

	const loginWrapper = (e: SyntheticEvent) => {
		const auth = getAuth(app);
		signInWithEmailAndPassword(auth, emailText, passwordText)
			.then(async (r) => {
				setLoginSuccessful(true);

				const screen = await determineUserScreenByType();
				navigation.navigate(screen);
				setSnackbarVisible(true);
			})
			.catch((e) => {
				console.log(e)
				setLoginSuccessful(false);
				setSnackbarVisible(true);
			});
	}

	const signupWrapper = (e: SyntheticEvent) => {
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
				{loginSuccessful ? "Log in Successful" : "Please check your information!"}
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
		marginTop: 60,
	},
	loginButton: {
		marginTop: Dimensions.get("screen").height - 450,
	},
	signupButton: {
		marginTop: 20,
	},
});
