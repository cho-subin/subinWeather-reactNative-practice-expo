import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  // Dimensions : 현재 보고있는 화면의 너비와 길이를 알려준다
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState('Loading...')
  const [days, setDays] = useState([])

  const API_KEY = 'dbe980c258cc24e96c657a27cb67d515';
 
  const ask = async () => {
    // 유저에게 위치사용 허가받기(허가받지 못하면 다른 페이지를 보여주고 허가받으면 해당 위치 뽑아내기)
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false}
    );
    console.log('city',location[0])
    setCity(location[0].street)
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={alerts}&appid=${API_KEY}&units=metric`)
    const json = await response.json();
    // console.log('json', json.daily)
    setDays(json.daily)
  }

  useEffect(()=>{
    ask();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      {/* StatusBar : 위에 시간, 와이파이, 배터리 등이 있는 폰 상단 툴 */}
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* StatusBar : 운영체제(ios,안드로이드..)에서 제공됨.
      그리고 ScrollView는 기존 style이 아닌 contentContainerStyle을 써야함
      그리고 화면 비율보다 커야 작동해서 flex를 넣으면 scroll 인식되지 않음*/}
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}>
        {days.length === 0?
          (
            <View style={styles.day}>
              <ActivityIndicator color='white' size='large'/>
            </View>
          ) 
        : (
          days.map((day, index) => 
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(0)}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={{color:'white'}}>{day.weather[0].description}</Text>
            </View>
          )
        )}
        
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
    marginTop: -22,
    fontSize: 60,
    color: '#ffe74d',
  },

});
