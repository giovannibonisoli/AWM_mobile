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

export const validateSchema = (schema) => {
  for(let [i, field] of schema.entries()) {
    if (field.name === ""){
      alertError("Errore", `Il campo variabile ${i + 1} risulta senza nome`);
      return false;
    }
  }

  return true;
}
