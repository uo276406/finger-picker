import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ModalStyles } from "../../styles/modal.styles";

import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

const HistoryModalComponent = ({
  modalHistoryVisible,
  setModalHistoryVisible,
  history,
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
      <View style={ModalStyles.historyModalView}>
        <Text style={ModalStyles.modalHistoryText}>
          {t("HISTORY_MODAL_TITLE")}
        </Text>
        <ScrollView
          style={ModalStyles.scrollHistory}
          showsVerticalScrollIndicator={true}
        >
          {history.length !== 0 ? (
            history
              .slice()
              .reverse()
              .map((item, index) => (
                <Text key={index} style={ModalStyles.historyItem}>
                  {item}
                </Text>
              ))
          ) : (
            <Text style={ModalStyles.emptyHistoryText}>
              {t("HISTORY_MODAL_EMPTY")}
            </Text>
          )}
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
