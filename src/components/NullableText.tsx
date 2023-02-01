import React from "react";
import { TouchableHighlight, Text } from "react-native";

interface INullableTextProps {
  text: string | null;
}

export default function NullableText({ text }: INullableTextProps) {
  return (
    !!text && (
      <TouchableHighlight>
        <Text>{text}</Text>
      </TouchableHighlight>
    )
  );
}
