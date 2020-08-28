import { Alert } from 'react-native';

export const alertError = (title, message) => {
  return Alert.alert(
         title,
         message
       );
   };

export const validate = (fields, values) => {
  for(let field of fields) {
    if (values[field.field] === "" || values[field.field] === undefined){
      alertError("Errore", `Inserire "${field.name}"`);
      return false;
    }
  }

  return true;
}
