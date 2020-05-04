import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Crumb } from './Crumb'

export default function CrumbSelector(props){
    const [selectedCrumb, setSelectedCrumb] = React.useState();
    const elements = [];
    
    React.Children.map(props.children, (child, index) => {
        elements.push(
            React.cloneElement(child, {
                ...child.props,
                 selected: index === selectedCrumb,
                 key: index,
                 style: style.crumb,
                 onSelect: () => {
                     setSelectedCrumb(index);
                     if(props.onSelect)
                        props.onSelect(index);
                 }
            })
        );
    });

    return (
        <View style={style.crumbContainer}>
            {elements}
        </View>
    );
}

const style = StyleSheet.create({
    crumbContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    crumb: {
        flex: 1
    },
});