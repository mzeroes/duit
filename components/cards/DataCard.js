import React from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import { Theme } from 'theme';
import { Subheading, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default class DataCard extends React.Component {
  render() {
    const { data, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Card
          elevation={2}
          onPress={() => {
            navigation.navigate('Details', { data });
          }
        }
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#AAA',
            backgroundColor: Theme.background
          }}
        >
          <Card.Title
            title={data.patientName}
            subtitle={data.ago}
            left={props => <Avatar.Text {...props} label={data.initials} />}
          />
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
              <Text style={{ flex: 1, flexWrap: 'wrap', paddingRight: 40 }}>
                {
                    JSON.stringify(data)
                }
              </Text>
              <Card.Actions style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Icon name="md-call" type="ionicon" iconStyle={{ padding: 10 }} />
                <Icon name="md-text" type="ionicon" iconStyle={{ padding: 10 }} />
                <Icon name="add-to-list" type="entypo" iconStyle={{ padding: 10 }} />
                {/* <Button>Message</Button> */}
              </Card.Actions>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <Subheading style={{ fontSize: 10 }}>
                {data.ago}
              </Subheading>
            </View>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'space-between', marginBottom: 0 }}>
            <Button>Visits</Button>
            <Button>Payments</Button>
            <Button>Documents</Button>
            <Icon name="md-more" type="ionicon" iconStyle={{ padding: 10 }} />
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
