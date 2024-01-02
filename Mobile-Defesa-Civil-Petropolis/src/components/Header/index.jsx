import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import logoMenor from "../../../assets/defesaCivilElipse.png"



export default function Header(){
    return(
        <>
        <View style={styles.viewheader}>
            <Image source={logoMenor} style={styles.imgHeader}/>
            <Text style={styles.textHeader}> Defesa Civil de Petrópolis </Text>
        </View>
        </>
    )
        
    
}