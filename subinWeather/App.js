import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

export default function App() {

  // Dimensions : 현재 보고있는 화면의 너비와 길이를 알려준다
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  console.log(SCREEN_WIDTH)

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      {/* StatusBar : 위에 시간, 와이파이, 배터리 등이 있는 폰 상단 툴 */}
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      {/* StatusBar : 운영체제(ios,안드로이드..)에서 제공됨.
      그리고 ScrollView는 기존 style이 아닌 contentContainerStyle을 써야함
      그리고 화면 비율보다 커야 작동해서 flex를 넣으면 scroll 인식되지 않음*/}
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9668bd',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    color: '#eedbff',
    fontSize: 68,
    fontWeight: '500'
  },
  weather: {
    // flex: 3,
  },
  day: {
    width: 384,
    alignItems:'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    color: '#ffe74d',
  },
  description: {
    marginTop: -42,
    fontSize: 60,
    color: '#ffe74d',
  },

});
