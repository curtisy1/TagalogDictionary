import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { List } from "react-native-paper";

import { DbHelper } from "./DbHelper";
import { Dictionary } from "./models/Word";
import NullableText from "./components/NullableText";

export default function App() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [allWords, setAllWords] = useState<Dictionary[]>([]);
  const [words, setWords] = useState<Dictionary[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const init = async () => {
    const connection = await DbHelper.initDatabase();
    const words = await connection.manager.find(Dictionary);
    setWords(words);
    setAllWords(words);
    setIsLoaded(true);
  };

  const cleanup = async () => {
    await DbHelper.closeDatabase();
  };

  useEffect(() => {
    init();

    return () => {
      cleanup();
    }
  }, []);

  const renderWordList = ({ item }: { item: Dictionary }) => {
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
  };

  const handleSearchChange = (query: string) => {
    setCurrentQuery(query);
  };

  const handleSubmit = useCallback(({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    setWords(words.filter(
      word => word.word !== null && word.word.includes(text)
    ))
  }, [words]);

  const handleResetSearch = useCallback(() => {
    setWords(allWords);
  }, [words, allWords]);

  return (
    isLoaded && (
      <>
        <SafeAreaView>
          <SearchBar
            platform="default"
            placeholder="Search"
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSubmit}
            onClear={handleResetSearch}
            value={currentQuery}
          />
          <FlatList
            data={words}
            renderItem={renderWordList}
            keyExtractor={item => item.Id.toString()}
          />
        </SafeAreaView>
      </>
    )
  );
}