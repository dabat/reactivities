import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { Size } from "../enums/size";

const LoadingComponent: React.FC<{
  inverted?: boolean;
  content?: string;
  size?: Size;
}> = ({ inverted, content, size }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} size={size ? size : Size.big} />
    </Dimmer>
  );
};

export default LoadingComponent;
