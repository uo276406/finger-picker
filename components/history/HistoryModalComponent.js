import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ModalStyles } from "../../styles/modal.styles";

import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

const HistoryModalComponent = ({
  modalHistoryVisible,
  setModalHistoryVisible,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalHistoryVisible}
      onRequestClose={() => {
        setModalHistoryVisible(!modalHistoryVisible);
      }}
    >
      <View style={ModalStyles.modalView}>
        <Text style={ModalStyles.modalHistoryText}>
          {t("HISTORY_MODAL_TITLE")}
        </Text>
        <ScrollView
          style={ModalStyles.scrollHistory}
          showsVerticalScrollIndicator={true}
        >
          <Text style={ModalStyles.historyItem}>1</Text>
          <Text style={ModalStyles.historyItem}>2</Text>
          <Text style={ModalStyles.historyItem}>3</Text>
          <Text style={ModalStyles.historyItem}>4</Text>
          <Text style={ModalStyles.historyItem}>5</Text>
          <Text style={ModalStyles.historyItem}>6</Text>
          <Text style={ModalStyles.historyItem}>7</Text>
          <Text style={ModalStyles.historyItem}>8</Text>
        </ScrollView>

        <Pressable
          style={[ModalStyles.button, ModalStyles.buttonClose]}
          onPress={() => setModalHistoryVisible(!modalHistoryVisible)}
        >
          <Text style={ModalStyles.textStyle}>
            {t("HISTORY_MODAL_CLOSE_BUTTON")}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default HistoryModalComponent;
