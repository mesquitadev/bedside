import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

const Modal: React.FC = ({show, title, message, onConfirmPressed}) => {
  return (
    <AwesomeAlert
      show={show}
      actionContainerStyle={{
        borderRadius: 10,
      }}
      closeOnTouchOutside={false}
      showProgress={false}
      title={title}
      titleStyle={{
        fontFamily: 'Poppins-Bold',
      }}
      message={message}
      messageStyle={{
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#000',
      }}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Ok"
      confirmButtonStyle={{
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 46,
        backgroundColor: '#04C7AD',
      }}
      confirmButtonTextStyle={{
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
      }}
      onConfirmPressed={onConfirmPressed}
    />
  );
};

export default Modal;
