import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Platform } from 'react-native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { HeaderTitleFigma } from './HeaderTitleFigmaComponent';

interface Props {
  getValor: () => void;
  message: string;
}

export const ModalMessageComponent = ({ getValor, message = '' }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const cerrarModal = () => {
    setIsVisible(false);
    getValor();
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <HeaderTitleFigma
            title="Información"
            marginTop={Platform.OS === 'ios' ? 0 : 0}
            stylesFigma={stylesFigma}
            type="big"
            marginBottom={100}
          />
          <HeaderTitleFigma
            title={message}
            marginTop={Platform.OS === 'ios' ? 0 : 0}
            stylesFigma={stylesFigma}
            type="big"
            marginBottom={20}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={cerrarModal}
          >
            <Text style={styles.buttonText}>Ok, entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 350,
    height: 450,
    backgroundColor: 'while',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 5,
  },
  button: {
    ...stylesFigma.button,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
