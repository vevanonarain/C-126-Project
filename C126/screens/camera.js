import {React} from 'react'
import {Button,View,Image,Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default class PickImage extends React.Component{
state={image:null}
getPermissionAsync=async()=>{
    if(Platform.os!=='web'){
        const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status!=='granted'){
            alert('Sorry we need camera permissions to make this work')
        }
    }
}

_pickImage=async()=>{
    try{
        let result=await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!result.cancelled){
            this.setState({image:result.data()})
            console.log(result.uri)
            this.uploadImage(result.uri)
    }    
    }
    catch(E){
        console.log(E)
    
    }
}

uploadImage=async(uri)=>{
    const data=new FormData()
    let filename=uri.split('/')[uri.split('/').length-1]
    let type = `image/${uri.split('.')[uri.split('.').length - 1]}` 
    const fileToUpload = { uri: uri, name: filename, type: type, }; 
    data.append("digit", fileToUpload); 
    fetch("", { 
    method: "POST", 
    body: data, 
    headers: { "content-type": "multipart/form-data", 
}, 
}) 
    .then((response) => response.json()) 
    .then((result) => { console.log("Success:", result);
 }) 
    .catch((error) => { console.error("Error:", error);
 }); 
};



componentDidMount(){
    this.getPermissionAsync()
}

render(){
    let{image}=this.state
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Button title='Pick an image from gallery' 
            onpress={this._pickImage}/>
        </View>
    )
}
}