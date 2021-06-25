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
    Linking
  } from 'react-native';
import HTML from 'react-native-render-html';

function JobDetail({ route, navigation }) {

    const [fullTime,setFullTime] = useState("");
    const [Company,setCompany] = useState("");
    const [CompanyLogo,setCompanyLogo] = useState("");
    const [CompanyURL,setCompanyURL] = useState("");
    const [Location,setLocation] = useState("");
    const [Title,setTitle] = useState("");
    const [Description,setDescription] = useState("");

    const { company_logo,
        company,
        company_url,
        location,
        title,
        type,
        description } = route.params;

    useEffect(()=>{
        if(JSON.parse(JSON.stringify(type)) === "Full Time"){
            setFullTime('Yes')
        }
        else {
            setFullTime('No')
        }

        setCompany(JSON.parse(JSON.stringify(company)))
        setCompanyLogo(JSON.parse(JSON.stringify(company_logo)))
        setCompanyURL(JSON.parse(JSON.stringify(company_url)))
        setLocation(JSON.parse(JSON.stringify(location)))
        setTitle(JSON.parse(JSON.stringify(title)))
        setDescription(JSON.parse(JSON.stringify(description)))

        

        console.log(JSON.stringify(company_logo))
    });

    return (
      <SafeAreaView>
          <ScrollView>
          <Text style={styles.Text}>Company</Text>
          <View style={[styles.boxSimple,styles.wrapper]}>
              <Image source={{uri:CompanyLogo}} style={styles.img} />
              <View style={styles.anotherText}>
              <Text style={styles.company_name}>{Company}</Text>
              <Text>{Location}</Text>
              <Text style={{color:'blue',textDecorationLine:'underline'}} onPress={()=>{Linking.openURL(CompanyURL)}}>Go to Website</Text>
              </View> 
              
          </View>

          <Text style={styles.Text}>Job Specification</Text>
          <View style={styles.boxSimple}>
              <Text style={styles.Header}>Title</Text>
              <Text>{Title}</Text>
              <Text></Text>
              <Text style={styles.Header}>Full time</Text>
              <Text>{fullTime}</Text>
              <Text></Text>
              <Text style={styles.Header}>Description</Text>
              <HTML source={{ html: Description }}  />
          </View>
          </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    Header:{
        color:'gray'
    },
    anotherText:{
        marginLeft:10
    },
    Text:{
        marginLeft: 20,
        marginTop:20,
        marginBottom:-12,
    },
    boxSimple: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
        
    },
    img : {
        width:60,
        height:60
    },
    wrapper:{
        flex:1,
        flexDirection: 'row',
    },
    company_name:{
        fontWeight:'bold'
    }
  });


export default JobDetail;