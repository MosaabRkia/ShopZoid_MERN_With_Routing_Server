import React,{useState} from 'react'
import { withRouter } from 'react-router-dom';
import '../cssFile/ImageSlider.css'


 function ImageSlider(props) {
    const [imagePlace,setImagePlace] = useState(0); 

    const AllImages =[
        "https://fdn.gsmarena.com/imgroot/news/20/09/rtx-3000/-1220x526/gsmarena_000.jpg",
        "https://logamy.com/wp-content/uploads/2020/09/NVIDIA-GeForce-RTX.jpg",
        "https://arabhardware.net/wp-content/uploads/2020/07/NVIDIA-RTX-3080-3D-Feature-2-1.jpg",
        "https://www.servethehome.com/wp-content/uploads/2020/11/NVIDIA-GeForce-RTX-3090-Heatsink-Side-4.jpg"
    ];
    
    //  --->
    function changePlaceNext(){// al atoool - 1 mshan al length b7sbha 5 b3dsh al 0
       if(imagePlace < AllImages.length-1){//atha al m7l al swr (state imageplace) ho az8r mn 6ol al array tb3 al swr az ymshi 3l next image
           setImagePlace(imagePlace + 1);//76 ali b3do
       }
       else{
        setImagePlace(0);//atha l3 az blsh bl awl 
       }
    }
    function changePlacePrev(){//  <---
        if(imagePlace <= 0){
            setImagePlace(AllImages.length-1);
        }
        else{
         setImagePlace(imagePlace-1);
        }
     }

    return (
        <div id="slider">
            <img alt="imgSrcNull1" id="imageThatSlider" src={AllImages[imagePlace]} />
            <img  onClick={changePlaceNext} alt="NextArrow1" id="NextArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
            <img  onClick={changePlacePrev} alt="PrevArrow2" id="PrevArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
        </div>
    )
}
export default withRouter(ImageSlider) 