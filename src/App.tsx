import React, { Fragment } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import { Searchbar, List } from "react-native-paper";

import { DbHelper } from "./DbHelper";
import { Dictionary } from "./models/Word";

interface AppProps {}

interface AppState {
  currentQuery: string;
  words: Dictionary[];
  isLoaded: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      currentQuery: "",
      words: [],
      isLoaded: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const connection = await DbHelper.initDatabase();
    const words = await connection.manager.find(Dictionary);
    this.setState({
      words: words,
      isLoaded: true
    });
  }

  async componentWillUnmount() {
    await DbHelper.closeDatabase();
  }

  renderWordList({ item }: { item: Dictionary }) {
    return (
      <List.Accordion title={item.word}>
        {!!item.englishDefinition && (
          <Text>{`English Definition: ${item.englishDefinition}`}</Text>
        )}
        {!!item.l2Definition && (
          <Text>{`L2 Definition: ${item.l2Definition}`}</Text>
        )}
        {!!item.notes && <Text>{`Notes: ${item.notes}`}</Text>}
        {!!item.examples && <Text>{`Examples: ${item.examples}`}</Text>}
        {!!item.activeVerb && <Text>{`Active Verb: ${item.activeVerb}`}</Text>}
        {!!item.passiveVerb && (
          <Text>{`Passive Verb: ${item.passiveVerb}`}</Text>
        )}
      </List.Accordion>
    );
  }

  handleSearchChange(query: string) {
    this.setState({
      currentQuery: query
    });
  }

  async handleSubmit() {}

  render() {
    return (
      this.state.isLoaded && (
        <Fragment>
          <SafeAreaView>
            <Searchbar
              placeholder="Search"
              onChangeText={this.handleSearchChange}
              onSubmitEditing={this.handleSubmit}
              value={this.state.currentQuery}
            />
            <FlatList
              data={this.state.words}
              renderItem={this.renderWordList}
              keyExtractor={item => item.Id.toString()}
            />
          </SafeAreaView>
        </Fragment>
      )
    );
  }
}

export default App;
