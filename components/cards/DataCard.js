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
          >
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
          </Card.Title>
          <Card.Content style={{
          }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading style={{ color: Theme.infoText, fontSize: 14 }}>
                {data.age !== undefined ? `${data.age} yrs \u2022 ` : ''}
                {data.gender !== undefined ? `${data.gender}` : ''}
              </Subheading>
              <Subheading style={{ fontSize: 12 }}>
                {data.date}
                {data.time}
              </Subheading>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: Theme.infoText, fontSize: 12 }}
              >
                {data.mobile && data.mobile}
                {'  |  '}
                {data.email && data.email}
              </Subheading>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}
            >

              <Paragraph
                ellipsizeMode="tail"
                style={{ color: Theme.textDark, fontSize: 14, paddingRight: 60 }}
              >
                {data.patientDiagnosis !== undefined ? `Diagnosis: ${data.patientDiagnosis}` : ''}
              </Paragraph>

            </View>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'space-between', marginBottom: 0 }}>
            <Button onPress={() => {
              updateDataInFirebase({ ...data, attended: true });
            }}
            >
              Attented
            </Button>
            <Button onPress={() => {
              this.props.navigation.navigate('New Appointment', { data });
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
