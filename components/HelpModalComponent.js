import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ModalStyles } from "../styles/modal.styles";

import { useTranslation } from "react-i18next";

const HelpModalComponent = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={ModalStyles.modalView}>
        <Text style={ModalStyles.modalText}>{t("HELP_MODAL_CONTENT1")}</Text>
        <Text style={ModalStyles.modalText}>{t("HELP_MODAL_CONTENT2")}</Text>
        <Text style={ModalStyles.modalText}>{t("HELP_MODAL_CONTENT3")}</Text>
        <Pressable
          style={[ModalStyles.button, ModalStyles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
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
