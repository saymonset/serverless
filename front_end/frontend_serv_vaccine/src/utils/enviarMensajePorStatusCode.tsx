import { useNavigation } from '@react-navigation/native';
export const enviarMensajePorStatusCode = (statusCode: string): string => {
    let mensaje: string;
  
    switch (statusCode) {
      case "badCiExist":
        mensaje = "Error de cliente: Exista la cedula.";
        break;
      case "badMissingBirth":
        mensaje = "Error de cliente: Falta fecha de nacimiento.";
        break;
      case "badMissingName":
        mensaje = "Error de cliente: Falta nombre.";
        break;
      case "badMissingName":
        mensaje = "Error de cliente: Falta nombre.";
        break;
      case "badExistEmailInBD":
        mensaje = "Error de cliente: Existe un mismo email registrado.";
        break;
      case "badMissingToken":
        mensaje = "Tiempo de espera agotado";
        const navigation = useNavigation();
        navigation.navigate( 'WelcomeScreen' as never)
        break;
      case "badMissingLastName":
        mensaje = "Error de cliente: Falta apellido.";
        break;
      case "badMissingCi":
        mensaje = "Error de cliente: Falta la cedula.";
        break;
      case "badMissingGender_id":
        mensaje = "Error de cliente: Falta seleccionar el sexo.";
        break;
      case "badRelationShipid":
        mensaje = "Error de cliente: Falta seleccionar el parentesco.";
        break;
      case "badNotValidEmail":
        mensaje = "Error de cliente: La dirección de correo es invalida.";
        break;
      case "passworddoesnotmatch":
        mensaje = "Error de cliente: La contraseña no coincide con la confirmación.";
        break;
      case "successPassword":
        mensaje = "Éxito del cliente: La contraseña se ha restablecido satisfactoriamente.";
        break;
      case "200":
            mensaje = "Éxito: la solicitud se ha completado correctamente.";
      case  "201":
            mensaje = "Éxito: la solicitud se ha completado correctamente.";
        break;
      case "400":
          mensaje = "Error de cliente: la solicitud es incorrecta.";
          break;
      case "401":
          mensaje = "Error: el usuario no se encontró.";
          break;
      case "404":
          mensaje = "Error: el recurso solicitado no se encontró.";
          break;
      case "500":
          mensaje = "Error del servidor: ha ocurrido un error interno en el servidor.";
      default:
          mensaje = "Código de estado desconocido.";
          break;
    }
  
    return mensaje;
  }