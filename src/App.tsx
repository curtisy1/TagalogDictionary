import React, { Fragment } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { Searchbar, List } from "react-native-paper";

import { DbHelper } from "./DbHelper";
import { dictionary as Dictionary } from "./models/Word";

interface AppProps {}

interface AppState {
  currentQuery: string;
  words: Dictionary[];
  allWords: Dictionary[];
  isLoaded: boolean;
  currentY: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      currentQuery: "",
      words: [],
      allWords: [],
      isLoaded: false,
      currentY: 15
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchNext = this.fetchNext.bind(this);
  }

  async componentDidMount() {
    const allWords = await DbHelper.initDatabase();
    allWords.manager.find(Dictionary).then(words => {
      this.setState({
        allWords: words,
        words: words.slice(0, 15),
        isLoaded: true
      });
    });
  }

  componentWillUnmount() {}

  get wordList() {
    const { words } = this.state;
    const renderedList = words.map((word: any, index) => {
      return (
        <List.Accordion title={word.word} key={`entry-${index}`}>
          {!!word.english_definition && (
            <Text>{`English Definition: ${word.english_definition}`}</Text>
          )}
          {!!word.l2_definition && (
            <Text>{`L2 Definition: ${word.l2_definition}`}</Text>
          )}
          {!!word.notes && <Text>{`Notes: ${word.notes}`}</Text>}
          {!!word.examples && <Text>{`Examples: ${word.examples}`}</Text>}
          {!!word.active_verb && (
            <Text>{`Active Verb: ${word.active_verb}`}</Text>
          )}
          {!!word.passive_verb && (
            <Text>{`Passive Verb: ${word.passive_verb}`}</Text>
          )}
        </List.Accordion>
      );
    });

    return renderedList;
  }

  handleSearchChange(query: string) {
    this.setState({
      currentQuery: query
    });
  }

  async handleSubmit() {}

  async fetchNext(event: NativeSyntheticEvent<NativeScrollEvent>) {}

  render() {
    return (
      this.state.isLoaded && (
        <Fragment>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              onScroll={this.fetchNext}
            >
              <Searchbar
                placeholder="Search"
                onChangeText={this.handleSearchChange}
                onSubmitEditing={this.handleSubmit}
                value={this.state.currentQuery}
              />
              <List.Section>{this.wordList}</List.Section>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
      )
    );
  }
}

export default App;
