import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ModalStyles } from "../../styles/modal.styles";

import { useTranslation } from "react-i18next";

const HelpModalComponent = ({ modalHelpVisible, setModalHelpVisible }) => {
  const { t } = useTranslation();

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
