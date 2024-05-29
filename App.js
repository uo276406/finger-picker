import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  View,
  StatusBar,
  Vibration,
} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import History from './screens/History';
import Row from './components/Row';
import Button from './components/Button';
import calculate, {
  initialState,
  showNumber,
  showOperation,
} from './utils/calculator';

const App = () => {
  useKeepAwake();
  const [historyWindow, setHistoryWindow] = useState(false);
  const [progMode, setProgMode] = useState(false);
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([]);

  const addHistoryElement = (element) => {
    setHistory([...history, element]);
  };

  const buttonPressed = (operation, value) => {
    setState(calculate(operation, value, state, onError, addHistoryElement));
  };

  const onError = () => {
    Vibration.vibrate([400]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!historyWindow ? (
        <>
          <View style={styles.blockMenu}>
            <Row>
              <Button
                text="History"
                theme="menu"
                onPress={() => setHistoryWindow(true)}
              />
              <Button
                text="Prog"
                theme="menu"
                onPress={() => setProgMode(!progMode)}
              />
            </Row>
          </View>
          <View style={styles.blockOperation}>
            <Text style={styles.blockOperationText}>
              {showOperation(state)}
            </Text>
          </View>
          <View style={styles.blockValue}>
            <Text style={styles.blockValueText}>
              {showNumber(state.currentValue)}
            </Text>
          </View>
          <View style={styles.blockButtons}>
            <Row>
              <Button
                text="percent"
                theme="secondary"
                onPress={() => buttonPressed('percentage')}
              />
              <Button
                text="CE"
                theme="removal"
                onPress={() => buttonPressed('clearLast')}
              />
              <Button
                text="C"
                theme="removal"
                onPress={() => buttonPressed('clear')}
              />
              <Button
                text="delete"
                theme="removal"
                onPress={() => buttonPressed('delete')}
              />
            </Row>
            {progMode ? (
              <Row>
                <Button
                  text="bin"
                  theme="secondary"
                  onPress={() => buttonPressed('bin')}
                />
                <Button
                  text="dec"
                  theme="secondary"
                  onPress={() => buttonPressed('dec')}
                />
                <Button
                  text="oct"
                  theme="secondary"
                  onPress={() => buttonPressed('oct')}
                />
                <Button
                  text="hex"
                  theme="secondary"
                  onPress={() => buttonPressed('hex')}
                />
              </Row>
            ) : (
              <> </>
            )}
            <Row>
              <Button
                text="math-log"
                theme="secondary"
                onPress={() => buttonPressed('log')}
              />
              <Button
                text="math-sin"
                theme="secondary"
                onPress={() => buttonPressed('sin')}
              />
              <Button
                text="square-root"
                theme="secondary"
                onPress={() => buttonPressed('square-root')}
              />
              <Button
                text="division"
                theme="operation"
                onPress={() => buttonPressed('operator', '/')}
              />
            </Row>
            <Row>
              <Button text="7" onPress={() => buttonPressed('number', 7)} />
              <Button text="8" onPress={() => buttonPressed('number', 8)} />
              <Button text="9" onPress={() => buttonPressed('number', 9)} />
              <Button
                text="X"
                theme="operation"
                onPress={() => buttonPressed('operator', '*')}
              />
            </Row>
            <Row>
              <Button text="4" onPress={() => buttonPressed('number', 4)} />
              <Button text="5" onPress={() => buttonPressed('number', 5)} />
              <Button text="6" onPress={() => buttonPressed('number', 6)} />
              <Button
                text="-"
                theme="operation"
                onPress={() => buttonPressed('operator', '-')}
              />
            </Row>
            <Row>
              <Button text="1" onPress={() => buttonPressed('number', 1)} />
              <Button text="2" onPress={() => buttonPressed('number', 2)} />
              <Button text="3" onPress={() => buttonPressed('number', 3)} />
              <Button
                text="+"
                theme="operation"
                onPress={() => buttonPressed('operator', '+')}
              />
            </Row>
            <Row>
              <Button text="+/-" onPress={() => buttonPressed('posneg')} />
              <Button text="0" onPress={() => buttonPressed('number', 0)} />
              <Button text="." onPress={() => buttonPressed('number', '.')} />
              <Button
                text="="
                theme="calculation"
                onPress={() => buttonPressed('equal')}
              />
            </Row>
          </View>
        </>
      ) : (
        <History
          history={history}
          cancelHistoryWindow={() => setHistoryWindow(false)}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: StatusBar.currentHeight,
  },
  blockMenu: {
    flex: 0.75,
  },
  blockOperation: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  blockOperationText: {
    color: '#fff',
    fontSize: 30,
  },
  blockValue: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#001000',
    borderRadius: 20,
    marginBottom: 5,
  },
  blockValueText: {
    color: '#fff',
    fontSize: 55,
  },
  blockButtons: {
    flex: 5.75,
  },
});
export default App;
