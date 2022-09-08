import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [studentList, setStudentList] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [modelData, setModelData] = useState<any>('');

  const getStudents = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let result: any[] = [];
    for (const key of keys) {
      const val = (await AsyncStorage.getItem(key)) || '';
      result.push(JSON.parse(val));
    }
    return result;
  };

  useFocusEffect(
    useCallback(() => {
      getStudents().then((e: any) => {
        setStudentList(e);
      });
    }, []),
  );

  useEffect(() => {
    getStudents().then((e: any) => {
      setStudentList(e);
    });
  }, []);

  const ModelView = () => {
    let eduList: any[] = [];
    if (modelData?.educationDetails) {
      for (let i in modelData?.educationDetails) {
        eduList.push(modelData?.educationDetails[i]);
      }
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModel}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleView}>
              <Text style={{color: '#333', fontWeight: '600', fontSize: 20}}>
                Personal Details
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowModel(false);
                }}>
                <Feather name={'x'} color={'#ccc'} size={20} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.labelStyles}>First Name</Text>
              <Text style={styles.valueStyles}>{modelData.firstName}</Text>
              <Text style={styles.labelStyles}>Last Name</Text>
              <Text style={styles.valueStyles}>{modelData.lastName}</Text>
              <Text style={styles.labelStyles}>Contact</Text>
              <Text style={styles.valueStyles}>{modelData.contact}</Text>
              <Text style={styles.labelStyles}>Email</Text>
              <Text style={styles.valueStyles}>{modelData.email}</Text>
              <Text style={styles.labelStyles}>Parent Name</Text>
              <Text style={styles.valueStyles}>{modelData.parentName}</Text>
              <Text style={styles.labelStyles}>Parent Contact</Text>
              <Text style={styles.valueStyles}>{modelData.parentContact}</Text>
              <Text style={styles.labelStyles}>Parent Email</Text>
              <Text style={styles.valueStyles}>
                {modelData.parentEmail ? modelData.parentEmail : '-'}
              </Text>
            </View>
            <View style={styles.secTitleView}>
              <Text style={styles.secTextStyle}>Educational Details</Text>
            </View>

            <FlatList
              data={modelData?.educationDetails}
              renderItem={({item}) => (
                <View>
                  <Text style={{color: '#555'}}>{item.qualification}</Text>
                  <Text style={{color: '#555'}}>{item.instituteName}</Text>
                  <Text style={{color: '#555'}}>
                    {item.startDate} - {item.endDate}
                  </Text>
                  <Text style={{color: '#555'}}>{item.grade}</Text>
                  <View style={{paddingVertical: 5}} />
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          setModelData(item);

          setShowModel(true);
        }}>
        <View>
          <Text style={styles.nameStyle}>{item.firstName}</Text>
        </View>
        <View style={styles.cardFirstRow}>
          <View>
            <Text style={styles.emailStyle}>{item.email}</Text>
          </View>
          <View>
            <Text style={styles.contactStyle}>{item.contact}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        extraData={studentList}
        data={studentList}
        style={{
          width: '100%',
        }}
        renderItem={renderItem}
      />
      <ModelView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  secTextStyle: {
    color: '#333',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10,
  },
  secTitleView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  valueStyles: {color: '#888', fontWeight: '600', fontSize: 15},
  labelStyles: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emailStyle: {
    color: '#777',
    fontSize: 13,
  },
  contactStyle: {
    color: '#777',
    fontSize: 13,
  },
  nameStyle: {
    color: '#777',
    fontSize: 17,
    fontWeight: '500',
  },
  cardFirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    height: 70,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 40,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    paddingHorizontal: 13,
    shadowColor: '#777',
    elevation: 7,
    marginBottom: 15,
  },
});

export default Home;
