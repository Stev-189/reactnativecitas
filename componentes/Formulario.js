import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import shortid from 'shortid';
import {format} from "date-fns";

const Formulario = ({citas, setCitas, setMostrarform}) => {
  const [paciente, guardarPaciente]=useState('');
  const [propietario, guardarPropietario]=useState('');
  const [telefono, guardarTelefono]=useState('');
  const [fecha, guardarFecha]=useState('');
  const [hora, guardarHora]=useState('');
  const [sintomas, guardarSintomas]=useState('');


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };
  
  const confirmarFecha = (date) => {
    // let opciones ={year: "numeric", month:"long", day:"2-digit"};
    // guardarFecha(date.toLocaleDateString("es-ES", opciones));
    guardarFecha(format(date, "dd/MM/yyyy"));
    hideDatePicker();
  };
  
  //muestra oculada Timwe Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  
  const confirmarHora = (hora) => {
    // let opciones ={hour:'numeric', minute: '2-digit', hour12:false};
    // guardarHora(hora.toLocaleDateString("es-ES", opciones));
    guardarHora(format(hora, "HH:mm"));
    hideTimePicker();
  };

  //muetsra la alerta si falla la validacion
  const mostrarAlerta=()=>{
    Alert.alert(
      'Error',//Titulo
      'Todos los campos son obligatorios',// Mensaje
      [{
        text: 'OK' //Arreglo de botones
      }]
    )
  }

  const crearNuevaCita = ()=>{
    if(paciente.trim()===''||
        propietario.trim()===''||
        telefono.trim()===''||
        fecha.trim()===''||
        hora.trim()===''||
        sintomas.trim()==='')
        {
          mostrarAlerta();
          return;
        }
    const cita ={paciente, propietario, telefono,fecha, hora, sintomas};
    cita.id= shortid.generate();
    //agregar al state
    const citasNuevo=[...citas, cita ];
    setCitas(citasNuevo);
    
    //Ocultar el formulario
    setMostrarform(false);

    //Resetear el formulario
  }


  return (
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto=>guardarPaciente(texto)}
            />
        </View>
        <View>
          <Text style={styles.label}>Propietario:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto=>guardarPropietario(texto)}
            />
        </View>
        <View>
          <Text style={styles.label}>Telefono contacto:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto=>guardarTelefono(texto)}
            keyboardType='phone-pad'
            />
        </View>

        <View>
          <Text style={styles.label}>Fecha: </Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmarFecha}
              onCancel={hideDatePicker}
              locale='es_ES'
              headerTextIOS='Eliga una Fecha'//solo para ios
              cancelTextIOS='Cancelar'//solo para ios
              confirmTextIOS='confirmar'
              />
          <Text style={styles.label}>{fecha}</Text>
        </View>
        
        <View>
          <Text style={styles.label}>Hora: </Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={confirmarHora}
              onCancel={hideTimePicker}
              locale='es_ES'
              headerTextIOS='Eliga una Hora'//solo para ios
              cancelTextIOS='Cancelar'//solo para ios
              confirmTextIOS='confirmar'
              is24Hour//solo para android
              />
          <Text style={styles.label}>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sìntomas:</Text>
          <TextInput 
            multiline
            style={styles.input}
            onChangeText={texto=>guardarSintomas(texto)}
            />
        </View>
        <View>
          <TouchableHighlight 
            style={styles.btnSubmit}
            onPress={()=>crearNuevaCita()}
          >
            <Text style={styles.textoSubmit}> Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  formulario:{
    backgroundColor: '#fff',
    paddingVertical:10,
    paddingHorizontal:10,
    paddingBottom:10,
  },
  label:{
    fontWeight: 'bold',
    fontSize:18,
    marginTop:10
  },
  input:{
    marginTop:10,
    height:50,
    borderColor:'#e1e1e1',
    borderWidth:1,
    borderStyle: 'solid'
  },
  btnSubmit: {
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10,
    marginBottom:10
  },
  textoSubmit:{
    color:'#FFF',
    fontWeight:'bold',
    textAlign:'center'
  }
})

 export default Formulario;