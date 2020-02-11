import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Constants, Updates } from 'expo';
import { Block, Button } from 'esai-framework';
export default class App extends React.Component {
  state = { v: 'Checking for updates...', time: 'Never' };
  componentDidMount() {
    this.check();
  }
  setValue = v => {
    this.setState({ v, time: new Date().toISOString() });
  };
  check = async () => {
    this.setValue('Güncelleştirme kontrol ediliyor...');
    console.log("ismail")

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        console.log(update)
        this.setValue('Güncelleştirme Yükleniyor');
        await Updates.fetchUpdateAsync();
        Alert.alert(
          'GUNCELLEME',
          'YENİ GÜNCELLEŞTİRME GELMİŞTİR',
          [{ text: 'OK', onPress: () => Updates.reloadFromCache() }],
          { cancelable: false }
        )
        // ... notify user of update ...
        //Updates.reloadFromCache();
      } else this.setValue('Güncelleştirme Yok');
    } catch (e) {
      // handle or log error
      this.setValue('Güncelleştirme Hatası');
    }


  };



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.state.v}
          {'\n\nLast check: '}
          {this.state.time}
        </Text> 
        <Button round uppercase color="error" onPress={this.check}>Güncelle</Button>
        <TouchableOpacity onPress={this.check}>
          <Text style={styles.paragraph}>Check Again</Text>
        </TouchableOpacity>
        <Text>
          ismail çetin nasılsın abi :)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
