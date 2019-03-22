import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import DataCard from './DataCard';

const DataList = props => (
  <View
    style={{
      flex: 1
    }}
  >
    {/* {!props.data && (
      <View style={{flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>No patients records yet.</Text>
      </View>
    )} */}
    <FlatList
      {...props}
      renderItem={({ item }) => <DataCard data={item} />}
      // eslint-disable-next-line no-unused-vars
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (!props.data || props.data.length==0? 
        <Text style={styles.emptyMessageStyle}>No patients records yet.</Text>
        : null)
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  emptyMessageStyle: {
    textAlign: 'center',
    //My current hack to center it vertically
    //Which does not work as expected
    marginTop: '50%', 
  }
});

export default DataList;
