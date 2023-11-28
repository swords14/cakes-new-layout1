import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, Modal, TouchableHighlight } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { DancingScript_400Regular } from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '@react-native-firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDHlAUl99tH5WKAUKJhWpkhdydA0FqY5X4",
  authDomain: "bolo-360ed.firebaseapp.com",
  projectId: "bolo-360ed",
  storageBucket: "bolo-360ed.appspot.com",
  messagingSenderId: "274995989333",
  appId: "1:274995989333:web:f98a7e573c79c2badc3ddc",
  measurementId: "G-26S2NW3YS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Login");
  const [selectedCake, setSelectedCake] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryTitleFontSize, setGalleryTitleFontSize] = useState(36);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    DancingScript_400Regular,
  });

  useEffect(() => {
  // Track screen view event with Firebase Analytics
  analytics.logEvent("screen_view", {
    screen_name: currentScreen
  });
}, [currentScreen]);

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login bem-sucedido!");
    setCurrentScreen("Home");
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
  }
};

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado com sucesso!");
    setCurrentScreen("Home");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
  }
};

const handleForgotPassword = () => {
  setCurrentScreen("ForgotPassword");
};

const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};
const CakesGallery = () => {
  const cakes = [
    {
      nome: "Bolo de Chocolate",
      imagem: "https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2021/03/bolo-de-chocolate-facil.jpg?fit=1200%2C675&ssl=1",
      informacoes: "Delicioso bolo de chocolate coberto com ganache.\n\n" +
        "Ingredientes:\n" +
        "- 2 ovos\n" +
        "- 1 xícara (chá) de açúcar\n" +
        "- 1 xícara (chá) de achocolatado ou chocolate em pó\n" +
        "- 2 xícaras (chá) de farinha de trigo\n" +
        "- 1 xícara (chá) de água (240 ml) fervida com 1 xícara (chá) de óleo\n" +
        "- 1 colher (sopa) cheia de fermento em pó\n" +
        "\nCobertura de Brigadeiro:\n" +
        "- 1 caixa ou lata de leite condensado\n" +
        "- 3 colheres (sopa) de chocolate em pó ou achocolatado\n" +
        "- 1 colher (sopa) bem cheia de margarina\n" +
        "Chocolate granulado para decorar.",
    },
    {
      nome: "Bolo de Morango",
      imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/24d767ce6c156eb07b1fc26c266211f5_L.jpg",
      informacoes: "Bolo refrescante de morango com cobertura de chantilly.\n\n" +
        "Ingredientes:\n" +
        "3 ovos\n" +
        "1/2 xícara (chá) de óleo\n"+
        "1 xícara (chá) de leite\n" +
        "2 xícaras (chá) de farinha de trigo\n" +
        "1 colher (sopa) de fermento em pó\n" +
        "1 xícara (chá) de morangos picados\n" +
        "\nModo de preparo:\n" +
        "1. Preaqueça o forno a 180 °C e unte uma forma de bolo com manteiga e farinha de trigo.\n" +
        "2. Em uma tigela, misture os ovos, o açúcar e o óleo até obter uma mistura homogênea.\n" +
        "3. Adicione o leite e a farinha de trigo, misturando até obter uma massa lisa e homogênea.\n" +
        "4. Adicione o fermento em pó e misture novamente.\n" +
        "5. Acrescente os morangos picados e misture delicadamente.\n" +
        "6. Despeje a massa na forma e leve ao forno por cerca de 30-40 minutos, ou até que o bolo esteja dourado e assado por completo.\n" +
        "7. Retire do forno e deixe esfriar antes de servir.\n" +
        "8. Sirva com chantilly e morangos frescos para decorar.\n",
    },
    {
      nome: "Bolo de Cenoura",
      imagem: "https://assets.unileversolutions.com/recipes-v2/67405.jpg",
       informacoes: "Delicioso bolo de cenoura com trufa de brigadeiro e cobertura de chocolate.\n\n" +
    "Massa:\n" +
    "- 3 ovos\n" +
    "- 1 copo de leite\n" +
    "- 2 copos de açúcar\n" +
    "- 2 cenouras picadas\n" +
    "- 2 copos de trigo\n" +
    "- 1 colher de fermento\n\n" +
    "Trufa de Brigadeiro:\n" +
    "- Leite condensado, cacau em pó, manteiga\n\n" +
    "Cobertura:\n" +
    "- Chocolate, leite condensado\n\n" +
    "Modo de Preparo:\n" +
    "1. Mexa cacau, leite condensado e manteiga até ponto de brigadeiro.\n" +
    "2. Bata ovos, óleo, cenoura e açúcar no liquidificador.\n" +
    "3. Adicione trigo e fermento, misture.\n" +
    "4. Leve ao forno por 40 minutos a 180 °C.\n" +
    "5. Derreta chocolate em banho-maria e coloque sobre o bolo assado."
    },
    {
  nome: "Bolo de Fubá com Goiabada",
  imagem: "https://anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-2681-d10297c24d2cfa6d97930e5e8ddefe74.jpg",
  informacoes: "Delicioso bolo de fubá com goiabada.\n\n" +
    "Ingredientes:\n" +
    "- 2 xícaras de açúcar\n" +
    "- 2 xícaras de fubá\n" +
    "- 1 xícara de óleo\n" +
    "- 1 xícara de leite\n" +
    "- 3 ovos\n" +
    "- 1 xícara de farinha de trigo\n" +
    "- Manteiga\n" +
    "- 1 colher de sopa de fermento em pó para bolo\n\n" +
    "Ingredientes para a Calda:\n" +
    "- 2 xícaras de goiabada\n" +
    "- 1 xícara de água\n\n" +
    "Modo de Preparo da Calda:\n" +
    "1. Coloque a água e uma xícara de goiabada em uma panela e deixe em fogo baixo até derreter.\n" +
    "2. Deixe a outra xícara de goiabada para o final.\n\n" +
    "Modo de Preparo do Bolo:\n" +
    "1. Misture todos os ingredientes do bolo em uma tigela.\n" +
    "2. Unte uma forma com manteiga e despeje a massa.\n" +
    "3. Leve ao forno pré-aquecido a 180 °C por aproximadamente 40 minutos ou até que esteja assado.\n" +
    "4. Despeje a calda sobre o bolo ainda quente e finalize com a outra xícara de goiabada."
}

    // ... outros bolos ...
  ];

      const renderCakeItem = ({ item, index }) => {
      const isLastInRow = (index + 1) % 2 === 0;
      const isFirstInRow = index % 3 === 0;

      return (
        <View style={styles.cakeItemContainer}>
          <TouchableOpacity onPress={() => {
            setSelectedCake(item);
            setModalVisible(true);
          }}>
            <ImageBackground
              source={{ uri: item.imagem }}
              style={styles.cakeImage}
            >
              <Text style={styles.cakeName}>{item.nome}</Text>
            </ImageBackground>
          </TouchableOpacity>

          {!isLastInRow && <View style={styles.rowSeparator} />}
          {isFirstInRow && <View style={styles.rowTopSeparator} />}
        </View>
      );
    };



    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleTitleClick}>
          <Text style={{ ...styles.galleryTitleStyle, fontSize: galleryTitleFontSize }}>
            Galeria de Bolos
          </Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
          <FlatList
            data={cakes}
            keyExtractor={(item) => item.nome}
            renderItem={renderCakeItem}
            numColumns={2}
          />
        </ScrollView>

      {/* Modal para exibir informações do bolo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCake?.nome}</Text>
            <Text style={styles.modalText}>{selectedCake?.informacoes}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

  if (!fontsLoaded) {
    return null;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "Login":
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Best Cakes</Text>
            <View style={styles.authContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Senha"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
                  <Ionicons name={showPassword ? "ios-eye-off" : "ios-eye"} size={24} color="#888" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={[styles.buttonText, { color: "#fff" }]}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={[styles.buttonText, { color: "#fff" }]}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                <Text style={[styles.buttonText, { color: "#fff" }]}>Esqueci a Senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Home":
        return (
          <View style={styles.container}>
            <Text style={styles.smallerTitle}>Bem-vindo à Best Cakes</Text>
            <View style={styles.translucentBackground}>
              <Text style={styles.welcomeMessage}>
                Explore nossa seleção de deliciosos bolos!
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.largeButton} onPress={() => setCurrentScreen("CakesGallery")}>
                <Text style={[styles.buttonText, { color: "#fff" }]}>Seguir para Bolos</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "CakesGallery":
        return <CakesGallery />;
      default:
        return null;
    }
  };
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/birthday-cake-with-flower-top-vector-illustration-simple-flat-style-pastel-background_938798-3.jpg?w=2000"
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </ImageBackground>
  );
  
  const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontFamily: "DancingScript_400Regular",
    fontSize: 75,
    color: "#ffg",
    marginBottom: 20,
    fontStyle: "italic",
    marginTop: 50,
  },
  authContainer: {
    width: 320,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "rgba(10,23,55,0.2)",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontFamily: "Montserrat_400Regular",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontFamily: "Montserrat_400Regular",
  },
  eyeIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(10,23,55,0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  registerButton: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(10,23,55,0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  smallerTitle: {
    fontFamily: "DancingScript_400Regular",
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
    fontStyle: "italic",
    marginTop: 50,
  },
  largeButton: {
    width: "80%",
    height: 60,
    backgroundColor: "rgba(10,23,55,0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  translucentBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 32,
    color: "#ffg",
    textAlign: "center",
  },
  cakeItemContainer: {
    marginBottom: 20,
  },
  cakeImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  cakeName: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 25,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  galleryTitleStyle: {
    fontSize: 100,
    fontFamily: "Montserrat_400Regular",
  },
});
}
export default App;
