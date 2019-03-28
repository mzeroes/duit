import React from 'react';
import { View, StyleSheet, Text, ListView, Linking } from 'react-native';
import { Theme } from 'theme/index';
import { Subheading, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { updateDataInFirebase } from 'api/user';

export default class DataCard extends React.Component {
  render() {
    const { data, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Card
          elevation={2}
          // onPress={() => {
          //   navigation.navigate('Details', { data });
          // }
          // }
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#AAA',
            backgroundColor: Theme.background
          }}
        >
          <Card.Title
            title={data.patientName}
            subtitle={data.ago}
            left={(props) => {
              if (data.patientImage) {
                return <Avatar.Image {...props} source={{ uri: data.patientImage }} />;
              }
              return <Avatar.Text {...props} label={data.initials} />;
            }
          }
            right={() => (
              <Card.Actions style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Icon
                  onPress={() => {
                    Linking.openURL(`tel:${data.mobile}`);
                  }}
                  name="md-call"
                  type="ionicon"
                  iconStyle={{ padding: 10 }}
                />
              </Card.Actions>
            )
          }
          >

          </Card.Title>
          <Card.Content style={{
          }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading style={{ color: Theme.darkText, fontSize: 12 }}>
                {data.age ? ` • ${data.age} yrs` : ''}
                {data.gender ? ` • ${data.gender}` : ''}
                {data.weight ? ` • ${data.weight} Kgs` : ''}
                {data.bodyTemperature ? ` • ${data.bodyTemperature} F` : ''}
                {data.bloodPressure ? ` • BP ${data.bloodPressure}` : ''}
                {data.normalOrEmergency ? ` • ${data.normalOrEmergency}` : ''}
              </Subheading>
              <Subheading style={{ fontSize: 12 }}>
                {data.fees ? `Rs ${data.fees}` : ''}
              </Subheading>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                // ellipsizeMode="tail"
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
                {data.email ? ` • ${data.email}` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ fontSize: 12 }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
                {data.address ? `Address: ${data.address}` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              />
            </View>
            <Paragraph
              ellipsizeMode="tail"
              style={{ color: Theme.text, fontSize: 14, paddingRight: 60 }}
            >
              {data.patientDiagnosis ? `Diagnosis: ${data.patientDiagnosis}` : ''}
            </Paragraph>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <Subheading style={{ fontSize: 10 }}>
                {data.time}
                {'  '}
                {data.date}
              </Subheading>
            </View>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'space-between', marginBottom: 0 }}>
            <Button onPress={() => {
              const attended = !data.attended;
              updateDataInFirebase({ ...data, attended });
            }}
            >
              {data.attended ? 'Move to New' : 'Move to Attended'}
            </Button>
            <Button onPress={() => {
              this.props.navigation.navigate('Appointment', { data });
            }}
            >
              Edit
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
