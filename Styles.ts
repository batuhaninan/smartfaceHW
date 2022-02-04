import {StyleSheet} from "react-native";
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
	},
	tabItemContainer: {
		flex: 1,
		marginTop: 0,
		borderRadius: 90,
		backgroundColor: "transparent",
	},
});