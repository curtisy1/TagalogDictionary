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
    console.log("Calling Creating connection");

    // const words = await DbHelper.loadAllFromCatalog();
    const allWords = await DbHelper.createConnection();
    console.log("Accessing connection");

    const words = await allWords.manager.find(Dictionary);
    this.setState({
      allWords: words,
      words: words.slice(0, 15),
      isLoaded: true
    });
  }

  componentWillUnmount() {
    // DbHelper.closeConnection();
  }

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

  async handleSubmit() {
    // const words = await DbHelper.wordSearch(this.state.currentQuery);
    // this.setState({
    //   words: words
    // });
  }

  async fetchNext(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { currentY, words } = this.state;
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    
    // if(isAtBottom) {
    //   let newWords = await DbHelper.loadAmountFromCatalog(
    //     currentY - 5,
    //     20
    //   );

    //   this.setState({
    //     currentY: currentY + 15,
    //     words: newWords
    //   });
    // } else if(contentOffset.y < 10){
    //   let newWords = await DbHelper.loadAmountFromCatalog(
    //     currentY - 20,
    //     20
    //   );

    //   this.setState({
    //     currentY: currentY - 20,
    //     words: newWords
    //   });
    // }
  }

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
