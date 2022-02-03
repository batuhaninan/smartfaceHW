import {Dimensions, StyleSheet} from "react-native";
import Constants from "expo-constants";


export const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		// width: "95%",
		// marginLeft: Dimensions.get("window").width / 10,
		// marginBottom: Dimensions.get("window").width / 10,
		borderRadius: 90,
		backgroundColor: "transparent",
		// background: "rgb(85,19,226)",
		background: "linear-gradient(90deg, rgba(85,19,226,1) 9%, rgba(206,206,233,1) 64%, rgba(0,212,255,1) 95%)",
	},
});