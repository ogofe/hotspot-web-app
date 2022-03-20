import {StyleSheet} from 'react-native';


const styling = StyleSheet.create({
    card:{
        backgroundColor: "white",
        padding: 15,
        height: '100%',
    },
    icon:{
        fontSize: 25,
        color: 'grey',
    },
    w100:{
        width: '100vw',
    },
    flexBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bold:{
        fontWeight: "600",
    },
    h1:{
        fontSize: 32,
    },
    h2:{
        fontSize: 28,
    },
    h3:{
        fontSize: 22,
    },
    h4:{
        fontSize: 19,
    },
    h5:{
        fontSize: 15,
    },
    h6:{
        fontSize: 12,
    },
    scrollView:{
        flex: 1,
        width: '100vw',
        overflow: "scroll",
    },
    mt_1:{
        marginTop: 5,
    },
    mt_2:{
        marginTop: 12.5,
    },
    p0:{
        padding: '0',
    },
    p1:{
        padding: '.725rem',
    },
    p2:{
        padding: '1rem',
    },
    shadow:{
        shadowOpacity: 0.7,
        shadowColor: "gainsboro",
        shadowOffset: {
            width: 10,
            height: 10,
        },
    },
    py_1: {
        paddingVertical: '1rem',
    },
    float_btn:{
       position: 'absolute',
       right: 20,
       bottom: "-40%",
       fontSize: 32,
    },
    list:{
        
    },
    listItem:{
        backgroundColor: 'white',
        padding: 15,
    },
    py_2:{
        paddingVertical: '1.725rem',
    },
    px_1:{
        paddingHorizontal: '1rem',
    },
    px_2:{
        paddingHorizontal: '1.725rem',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    textWhite:{
        color: 'white',
    },
    bgLight:{
        backgroundColor: 'lightgrey',
    },
    textLight:{
        color: '#eeeef4',
    },
    textDark:{
        color: '#607d8b',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    textBlue:{
        color: '#2196f3',
    },
    rounded:{
        borderRadius: 200,
    },
    round:{
        borderRadius: 5,
    },
    alignCenter:{
        justifyContent: "center",
        alignItems: "center",
    },
    bgWhite:{
        backgroundColor: "white"
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderBottomColor: "lavender",
    },
})
export default styling;