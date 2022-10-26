import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";

const Images = ({ images }) => {

    console.log(images);

    return (
        <View style={styles.images}>
            {images.map((item, index) => {
                return (
                    <Image
                        key={index}
                        style={styles.image}
                        source={{
                            uri: item,
                        }}
                    />
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    images: {
        marginTop:20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    image: {
        marginVertical: 13,
        width: "40%",
        height:110
    },
});

export default Images;