import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Feather} from "@expo/vector-icons";
import PrincipalScreenTeacherTab from "../components/PrincipalScreenTeacherTab";
import PrincipalScreenHomeworkTab from "../components/PrincipalScreenHomeworkTab";


const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) => {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();

// @ts-ignore
export default function PrincipalScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PrincipalScreenHomeworkTab" component={PrincipalScreenHomeworkTab} options={{ title: "Homeworks", tabBarIcon:  ({ color }) => <TabBarIcon name="bar-chart-2" color={color} /> }} />
      <Tab.Screen name="PrincipalScreenTeacherTab" component={PrincipalScreenTeacherTab}   options={{ title: "Teachers", tabBarIcon:  ({ color }) => <TabBarIcon name="bar-chart-2" color={color} /> }}/>
    </Tab.Navigator>
  );
}