import React, { Fragment } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { SearchBar } from "react-native-elements";
import { List } from "react-native-paper";

import { DbHelper } from "./DbHelper";
import { Dictionary } from "./models/Word";
import NullableText from "./components/NullableText";

interface AppProps {}

interface AppState {
  currentQuery: string;
  allWords: Dictionary[];
  words: Dictionary[];
  isLoaded: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      currentQuery: "",
      allWords: [],
      words: [],
      isLoaded: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetSearch = this.handleResetSearch.bind(this);
  }

  async componentDidMount() {
    const connection = await DbHelper.initDatabase();
    const words = await connection.manager.find(Dictionary);
    this.setState({
      words: words,
      allWords: words,
      isLoaded: true
    });
  }

  async componentWillUnmount() {
    await DbHelper.closeDatabase();
  }

  renderWordList({ item }: { item: Dictionary }) {
    return (
      <List.Accordion title={item.word}>
        <NullableText text={item.englishDefinition} />
        <NullableText text={item.l2Definition} />
        <NullableText text={item.notes} />
        <NullableText text={item.examples} />
        <NullableText text={item.activeVerb} />
        <NullableText text={item.passiveVerb} />
      </List.Accordion>
    );
  }

  handleToggleSubtitle() {}

  handleSearchChange(query: string) {
    this.setState({
      currentQuery: query
    });
  }

  handleSubmit(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    const query = event.nativeEvent.text;
    const newWords = this.state.words.filter(
      word => word.word !== null && word.word.includes(query)
    );
    this.setState({
      words: newWords
    });
  }

  handleResetSearch() {
    const { allWords } = this.state;
    this.setState({
      words: allWords
    });
  }

  render() {
    return (
      this.state.isLoaded && (
        <Fragment>
          <SafeAreaView>
            <SearchBar
              placeholder="Search"
              onChangeText={this.handleSearchChange}
              onSubmitEditing={this.handleSubmit}
              onClear={this.handleResetSearch}
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
