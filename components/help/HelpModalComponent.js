import React, { useRef, useEffect } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ModalStyles } from "../../styles/modal.styles";

import { useTranslation } from "react-i18next";
import { Video, ResizeMode } from "expo-av";
import TutorialVideo from "../../assets/tutorial.mp4";

const videoSource = "../../assets/tutorial.mp4";

const HelpModalComponent = ({ modalHelpVisible, setModalHelpVisible }) => {
  const { t } = useTranslation();
  const video = useRef(null);

  useEffect(() => {
    video.current.playAsync();
  }, [video]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalHelpVisible}
      onRequestClose={() => {
        setModalHelpVisible(!modalHelpVisible);
      }}
    >
      <View style={ModalStyles.modalView}>
        <Text style={ModalStyles.modalHelpText}>
          {t("HELP_MODAL_CONTENT1")}
        </Text>
        <Text style={ModalStyles.modalHelpText}>
          {t("HELP_MODAL_CONTENT2")}
        </Text>
        <Text style={ModalStyles.modalHelpText}>
          {t("HELP_MODAL_CONTENT3")}
        </Text>
        <View style={ModalStyles.videoContainer}>
          <Video
            source={TutorialVideo}
            ref={video}
            style={ModalStyles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            isLooping
            autoPlay
          />
        </View>
        <Pressable
          style={[ModalStyles.button, ModalStyles.buttonClose]}
          onPress={() => setModalHelpVisible(!modalHelpVisible)}
        >
          <Text style={ModalStyles.textStyle}>
            {t("HELP_MODAL_CLOSE_BUTTON")}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default HelpModalComponent;
