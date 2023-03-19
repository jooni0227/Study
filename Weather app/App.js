import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const {width:SCREEN_WIDTH} = Dimensions.get('window'); //휴대폰 화면 확인하는 API

const API_KEY = "33ed60c372b64f1fa11eafa16df0fb46"; //원래라면 서버에 API key를 두고 불러와서 사용해야 함.

const icons = {
  Clouds:"cloudy",
  Clear:"day-sunny",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
}

export default function App() {
  const [city,setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok,setOk]= useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
      if (weather.dt_txt.includes("00:00:00")) {
      return weather;
    }
    })
    );

  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style= {styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView  pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}> 
      {days.length === 0 ? (
        <View style={styles.day}>
          <ActivityIndicator  color="white" style={{marginTop:10}} size="large"/>
      </View>
      ) : (
        days.map((day,index) =>
        <View key={index} style={styles.day}>
          <View style={{flexDirection:"row",alignItems:"center", width:"90%",justifyContent:"space-between"}}>
          <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
          <Fontisto name={icons[day.weather[0].main]} size={60} color="white" />
          </View>
          

          <Text style={styles.description}>{day.weather[0].main}</Text>
        </View>
        )
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"#00ffff",
  }, 
  city:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    
  },
  cityName:{
    fontSize:88,
    fontWeight:"500",
    color:"white",
  },
  weather:{
    
  },
  day:{
    width:SCREEN_WIDTH,
    alignContent:"center",
    alignItems:"left",
    
  },
  temp:{
    marginTop:50,
    fontSize:130,
    marginLeft:30,
    color:"white",

  },
  description:{
    marginTop:-10,
    fontSize:60,
    marginLeft:110,
    color:"white",
  }
})

