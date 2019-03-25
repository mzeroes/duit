import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from 'theme';
import { Subheading, Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { callNumber } from 'utils/libraryFunctions';

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
  state={
    isSelected: false
  }

  render() {
    const { data } = this.props;
    // const dateTime = `${data.Date} ${data.Time} `;

    // let avatar;
    // if(data.patientImage !== undefined && data.patientImage.length>10){
    //   avatar = <Avatar.Image {...props} source={require(data.patientImage)} />
    // }
    // else{
    //   avatar = <Avatar.Text {...props} label={data.initials} />
    // }
     
    return (
      <View style={styles.container}>
        <Card
          elevation={1}
        //   onLongPress={
        //   () => {
        //     const { isSelected } = this.state;
        //     this.setState({ isSelected: !isSelected });
        //   }

        // }
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: Theme.background
          }}
        >
          {/* <Card.Title
            title={data.Name}
            subtitle={dateTime}
            // left={
            //   props => <Avatar.Icon {...props} icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }} />
            // }
          /> */}
          <Card.Title title={data.patientName} subtitle={data.ago} left={props => <Avatar.Text {...props} label={data.initials} />} />
          <Card.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading style={{ color: Theme.darkText, fontSize: 12 }}>
              {data.age !== undefined ? `${data.age} yrs • ` : ''} 
              {data.gender !== undefined ? `${data.gender} • ` : ''} 
              {data.weight !== undefined ? `${data.weight} Kgs • ` : ''} 
              {data.bodyTemperature !== undefined ? `${data.bodyTemperature} F • ` : ''} 
              {data.bloodPressure !== undefined ? `BP ${data.bloodPressure} • ` : ''} 
              {data.normalOrEmergency !== undefined ? `${data.normalOrEmergency}` : ''} 
              </Subheading>
              <Subheading style={{ fontSize: 12 }}>
                {data.fees !== undefined ? `Rs ${data.fees}` : ''} 
              </Subheading>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                // ellipsizeMode="tail"
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
                
                {data.email !== undefined ? `${data.email} • ` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ fontSize: 12 }}
              >
                <Text onPress={()=> callNumber(`tel:${data.mobile}`)}
                  style = {[styles.value,{marginLeft : 5,textDecorationLine :'underline'}]}>{`${data.mobile}`}
                </Text>
                {/* {data.mobile !== undefined ? `${data.mobile} ` : ''} */}
              </Subheading>
              {/* <Subheading style={{ fontSize: 12 }}>
              </Subheading> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
                {data.address !== undefined ? `Address: ${data.address}` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
              
              </Subheading>
              {/* <Subheading style={{ fontSize: 12 }}>
              </Subheading> */}
            </View>
            
            <Paragraph
              numberOfLines={this.state.isSelected ? 6 : 3}
              ellipsizeMode="tail"
              style={{ color: Theme.text, fontSize: 14, paddingRight: 60 }}
            >
              {data.patientDiagnosis !== undefined ? `Diagnosis: ${data.patientDiagnosis}` : ''}
            </Paragraph>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {/* <Subheading style={{ fontSize: 10 }}>
              </Subheading> */}
              <Subheading style={{ fontSize: 10 }}>
                {data.time} {data.date}
              </Subheading>
            </View>
          </Card.Content>
      
          {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
        </Card>
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
    // borderBottomWidth: 2,
    // borderRadius: 12,
    // borderColor: Theme.grey,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // padding: 12,
    margin: 6,
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
