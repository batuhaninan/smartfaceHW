import {StyleSheet} from "react-native";
import Constants from "expo-constants";


export const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		borderRadius: 90,
		backgroundColor: "transparent",
	},
	tabItemContainer: {
		flex: 1,
		marginTop: 0,
		borderRadius: 90,
		backgroundColor: "transparent",
	},
});