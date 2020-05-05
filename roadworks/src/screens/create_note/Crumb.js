import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';

export default function Crumb(props) {
    const [selected, setSelected] = React.useState(false);
    const onSelect = () => {
        if(props.onSelect)
            props.onSelect();
    };

    const outline = {
        borderColor: props.color ?? "#000",
        color: props.color ?? "#000"
    }

    const filled = {
        backgroundColor: props.color ?? "#000",
        borderColor: props.color ?? "#000",
        color: "#FFF"
    }

    const crumStyle = props.selected ? filled : outline;



    return (
        <TouchableWithoutFeedback onPress={onSelect} style={style.container}>
            <View style={[style.crumb, props.style, crumStyle]}>
                <Text style={crumStyle}>
                    {props.children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    crumb: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: "#000",
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});