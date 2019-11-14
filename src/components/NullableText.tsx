import * as React from "react";
import { TouchableHighlight, Text } from "react-native";

interface INullableTextProps {
  text: string | null;
}

export default class NullableText extends React.PureComponent<INullableTextProps> {
  render() {
    return (
      !!this.props.text && (
        <TouchableHighlight>
          <Text>{this.props.text}</Text>
        </TouchableHighlight>
      )
    );
  }
}
