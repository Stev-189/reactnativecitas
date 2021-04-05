import React, {useState} from 'react';
import {
  Text, 
  StyleSheet, 
  View, 
  FlatList,
  TouchableHighlight, 
  Platform, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Cita from './componentes/Cita'
import Formulario from './componentes/Formulario'

const App = () => {

  const [mostrarform, setMostrarform] = useState(false);
  //definir el satten
  const [citas, setCitas] = useState([
    {id:'1', paciente:'Hook', propietario:'Juan', sintomas:'No come'},
    {id:'2', paciente:'Redux', propietario:'Moncho', sintomas:'No come'},
    {id:'3', paciente:'Native', propietario:'Android', sintomas:'No come'},
    {id:'4', paciente:'else', propietario:'Josue', sintomas:'No come'}
  ]);

  const eliminarPaciente=id=>setCitas((citasActuales)=>citasActuales.filter(cita=>cita.id!==id))

  //Muestra u oculta el formulario
  const mostrarFormulario=()=>setMostrarform(!mostrarform);
  //ocultar teclado 
  const cerrarTeclado=()=>Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback
      onPress={()=>cerrarTeclado()}
    >
      <View style={styles.contenedor}>
        <Text style={styles.title}>Administrador de Citas</Text>

        <View>
            <TouchableHighlight 
              style={styles.btnMostrarForm}
              onPress={()=>mostrarFormulario()}
            >
              <Text style={styles.textoMostrarForm}>{mostrarform? 'Cancelar nueva cita':'Crear Nueva Cita'} </Text>
            </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {
            mostrarform ? (
              <>
                <Text style={styles.title}>Crear nueva Cita</Text>
                <Formulario 
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarform={setMostrarform}
                />
              </>
            ):(
              <>
                <Text style={styles.title}>{citas.length>0 ? 'Administrador de citas':'No hay citas'}</Text>
                {
                  //F1
                  // citas.map(cita=>(
                  //   <View>
                  //     <Text>{cita.paciente}</Text>
                  //   </View>
                  // ))
                  // F"orma correcta
                  // <FlatList
                  // data={citas}
                  // renderItem={({item})=>(
                    // <View>
                      // {/* <Text>{item.paciente}</Text> */}
                    // {/* </View> */}
                  // )}
                  // keyExtractor={cita=>cita.id}
                  // /> 
                }
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({item})=> <Cita item={item} eliminarPaciente={eliminarPaciente}/>}
                  keyExtractor={cita=>cita.id}
                />
              </>
            )
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
//crea estilos
const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#AA076B',
    flex:1
  },
  title:{
    color: '#FFF',
    marginTop:Platform.OS==='ios'? 20:10 ,
    marginBottom:10,
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center'
  },
  contenido:{
    flex:1,
    marginHorizontal:'2.5%'
  },
  listado:{
    flex:1
  },
  btnMostrarForm: {
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10,
  },
  textoMostrarForm:{
    color:'#FFF',
    fontWeight:'bold',
    textAlign:'center'
  }
})

export default App;
