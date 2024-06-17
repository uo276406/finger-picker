import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { ButtonStyles } from "../styles/button.styles";
import { StartButtonStyles } from "../styles/startbutton.styles";

const StartButtonComponent = ({ setRouletteStarted }) => {
  const handlePress = () => {
    setRouletteStarted(true);
  };

  return (
    <TouchableOpacity
      style={[ButtonStyles.button, StartButtonStyles.button]}
      onPress={handlePress}
    >
      <Image
        source={require("../assets/start.png")} // Reemplaza con la URL de tu imagen
        style={{ width: 50, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default StartButtonComponent;
