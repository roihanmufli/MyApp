
import React, {useState,useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Switch
  } from 'react-native';
  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetail from './JobDetail';
import Axios from 'axios';



function JobList(props,{ navigation}) {

    const [data, setData]= useState([]);
    const [Masterdata, setMasterData]= useState([]);
    const [toggle,setToggle] = useState(true);
    const [searchLocation,setSearchLocation] = useState("");
    const [search,setSearch] = useState("");
    const [SearchFilter,setSearchFilter] = useState("");
    const [show,setShow] = useState(false);
    const [filter,setFilter] = useState([]);



    async function getData(){

        let list = await Axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json');

        setData(list.data)
        setMasterData(list.data)

    }

    useEffect(()=>{
        getData()
    },[]);

    console.log(data);

    const toggleSwitch = (value) => {
        setToggle(value)
    }

    const searchingLocation = (text) => {
        if(text) {
            let txt = text.toLowerCase()
            const newData = data.filter((item)=>{
                return item.location.toLowerCase().match(txt)
            });
            // console.log(newData)
            setFilter(newData);
            setSearchLocation(text);
        }
        else{
            setFilter(Masterdata)
            setSearchLocation(text);
        }
    }

    

    const searchFilter = (text) => {
        if(text) {
            let txt = text.toLowerCase()
            const newData = data.filter((item) => {
                return item.title.toLowerCase().match(txt)
            });

            console.log(newData)
            // console.log(text)
            setData(newData);
            setSearch(text);
        }
        else{
            setData(Masterdata)
            setSearch(text);
        }
    }

    if(show) {
        return (
            <SafeAreaView>
                <ScrollView>
                <View>
                  <View style={{flex:1,flexDirection: 'row'}}>
                      <TextInput 
                      style={styles.TextInputStyle}
                      placeholder="Search"
                      value={search}
                      onChangeText={(text) => searchFilter(text)}
                      />
                      <TouchableOpacity style={{marginTop:20}} onPress={()=>{setShow(false)}}>
                          <View >
                              <Image source={require('../assets/dropup.png')} style={{width:20,height:20}} />
                          </View>
      
                      </TouchableOpacity>
                      
                  </View>
                  
                  <View style={styles.boxSimple}>
                      <View style={{flex:1,flexDirection: 'row'}}>
                      <Text>Fulltime</Text>
                      <Switch 
                          style={{marginTop:-5,marginLeft:220}}
                          onValueChange={toggleSwitch} 
                          value={toggle}
                      
                      />
                      </View>
                      <Text></Text>
                      <View style={{flex:1,flexDirection: 'row'}}>
                      <Text>Location</Text>
                      <TextInput 
                          placeholder="search"
                          style={{marginTop:-15,marginLeft:20,height:40,
                          borderWidth:1,
                          borderColor:'#009688',
                          backgroundColor: 'white',
                          width:240}}
                          value={searchLocation}
                          onChangeText={(text) => searchingLocation(text)}
                      />
                      
                      </View>
                      <View style={styles.btn}>
                      <Button
                          title="Apply Filter"
                          onPress={() => {setData(filter)}}
                          color="gray"
                      />
                      </View>
                      
      
                  </View>
                  <FlatList 
                  data = {data}
                  renderItem = {({item})=>{
                      if(toggle === true) {
                          if(item.type === "Full Time"){
                                  return(
                                      <TouchableOpacity onPress={()=>{
                                          props.navigation.navigate('JobDetail',{
                                              company_logo: item.company_logo,
                                              company: item.company,
                                              company_url: item.company_url,
                                              location: item.location,
                                              title: item.title,
                                              type: "Full Time",
                                              description: item.description
                                          })
                                      }}>
                                          <View style={[styles.item,styles.title]}>
                                              <View style={{flex:1,flexDirection:'row'}}>
                                              <Image source={{uri:item.company_logo}} style={styles.img} />
                                              <View>
                                                  <Text style={styles.position}>
                                                  {item.title}
                                                  </Text>
                                                  <Text style={styles.company_font}>
                                                  {item.company}
                                                  </Text>
                                                  <Text></Text> 
                                                  <Text style={styles.location}>
                                                      {item.location}
                                                  </Text>
                                              </View>
                                              </View>
                                              <Image source={require('../assets/arrow.png')} style={{width:20,height:20,marginLeft:280}} />
                                              
                                          </View>
                                          
                                      </TouchableOpacity>
                                  );
                              
                              
                          }
                      }
                      
                  }}
                  />
                </View>
                </ScrollView>
            </SafeAreaView>
          );
    } else {
        return (
        
            <SafeAreaView>
                <ScrollView>
                <View>
                  <View style={{flex:1,flexDirection: 'row'}}>
                      <TextInput 
                      style={styles.TextInputStyle}
                      placeholder="Search"
                      value={search}
                      onChangeText={(text) => searchFilter(text)}
                      />
                      <TouchableOpacity style={{marginTop:20}} onPress={()=>{setShow(true)}}>
                          <View >
                              <Image source={require('../assets/dropdown.png')} style={{width:20,height:20}} />
                          </View>
      
                      </TouchableOpacity>
                      
                  </View>
                  
                  <FlatList 
                  data = {data}
                  renderItem = {({item})=>{
                      if(toggle === true) {
                          if(item.type === "Full Time"){
                                  return(
                                      <TouchableOpacity onPress={()=>{
                                          props.navigation.navigate('JobDetail',{
                                              company_logo: item.company_logo,
                                              company: item.company,
                                              company_url: item.company_url,
                                              location: item.location,
                                              title: item.title,
                                              type: "Full Time",
                                              description: item.description
                                          })
                                      }}>
                                          <View style={[styles.item,styles.title]}>
                                          <View style={{flex:1,flexDirection:'row'}}>
                                              <Image source={{uri:item.company_logo}} style={styles.img} />
                                              <View>
                                                  <Text style={styles.position}>
                                                  {item.title}
                                                  </Text>
                                                  <Text style={styles.company_font}>
                                                  {item.company}
                                                  </Text>
                                                  <Text></Text> 
                                                  <Text style={styles.location}>
                                                      {item.location}
                                                  </Text>
                                              </View>
                                              </View>
                                              <Image source={require('../assets/arrow.png')} style={{width:20,height:20,marginLeft:280}} />
                                          </View>
                                          
                                      </TouchableOpacity>
                                  );
                              
                              
                          }
                      }
                      
                  }}
                  />
                </View>
                </ScrollView>
            </SafeAreaView>
          );
    }


    
  }

  const styles = StyleSheet.create({
    btn:{
        width:120,
        marginLeft:195,
        marginTop:5
    },
    boxSimple: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
        marginTop:-3,
        marginLeft:5
    },
    container: {
      flex: 1,
      justifyContent:'space-around',
      flexDirection: 'row'
    },
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 5.0,
    },
    img : {
        width:60,
        height:60
    },
    position:{
        fontSize:15,
        marginLeft:30,
        fontWeight:'bold'
    },
    company_font:{
        fontSize:12,
        marginLeft:30,
        color:'gray'
    },
    location:{
        fontSize:12,
        marginLeft:30,
        color:'gray'
    },
    TextInputStyle:{
        height:50,
        borderWidth:1,
        paddingLeft:20,
        margin:5,
        borderColor:'#009688',
        backgroundColor: 'white',
        width:320,
        borderRadius: 50 
    },
    arrow:{
        height:13,
        width:13,
        justifyContent:'center',
        alignItems:'center',
        top:50,
    }


  });


export default JobList;