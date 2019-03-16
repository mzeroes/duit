import React from 'react';
import { View, FlatList } from 'react-native';
import DataCard from './DataCard';

const DataList = props => (
  <View
    style={{
      flex: 1
    }}
  >
    <FlatList
      {...props}
      renderItem={({ item }) => <DataCard data={item} />}
      // eslint-disable-next-line no-unused-vars
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default DataList;
