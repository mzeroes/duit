import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Theme } from 'theme';

// const SectionHeader = ({ title }) => (
//   <View style={styles.sectionHeaderContainer}>
//     <Text style={styles.sectionHeaderText}>{title}</Text>
//   </View>
// );

// const SectionContent = props => (
//   <View style={styles.sectionContentContainer}>{props.children}</View>
// );

export default class DataCard extends React.Component {
  // renderRow = ({ item }) => (
  //   <SectionContent>
  //     <Text style={styles.sectionContentText}>{item.value}</Text>
  //   </SectionContent>
  // );

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>

        <View styles={{ }}>
          <Text>
            {data.Name}
          </Text>
          <Text>
            {data.Age}
          </Text>
          <Text>
            {data.Email}
          </Text>
          <Text>
            {data.Phone}
          </Text>
          <Text>
            {data.Problem}
          </Text>
        </View>
        {/* <View /> */}
      </View>
    );
  }
}

// export const DataCard = (props) => {
//   const { data } = props;
//   if (!data) return <View />;
//   return (
//     <View style={styles.titleContainer}>
//       <View style={styles.titleIconContainer}>
//         <Text
//           style={[styles.monoText, { alignSelf: 'center' }]}
//           numberOfLines={1}
//         >
//           {data.Name && data.Name}
//         </Text>
//       </View>
//       <View style={styles.titleSubContainer}>
//         <Text style={styles.monoText}>{data.Email && data.Email}</Text>
//         {/* <Text style={styles.monoText}>{data.Age}</Text> */}
//       </View>
//       {/* <Text style={styles.monoText}>{data.Problem}</Text> */}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Theme.grey,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 12,
    margin: 8,
    marginTop: 12,
    marginBottom: 12
  },
  listcontainer: {
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  monoText: {
    fontSize: 14,
    color: Theme.infoText,
    fontFamily: 'space-mono'
  },
  sectionHeaderContainer: {
    flexDirection: 'row'
  },
  sectionHeaderText: {
    flexDirection: 'row',
    color: Theme.text
  },
  sectionContentContainer: {},
  sectionContentText: {
    color: Theme.secondary
  }
});
