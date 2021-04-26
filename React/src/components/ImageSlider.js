import React,{useState} from 'react'
import { withRouter } from 'react-router-dom';
import '../cssFile/ImageSlider.css'


 function ImageSlider(props) {
    const [imagePlace,setImagePlace] = useState(0); 

    const AllImages =[
        "https://www.geekysaur.com/wp-content/uploads/Razer-Sale.png",
        "https://www.geeky-gadgets.com/wp-content/uploads/2015/01/Razer-Sale.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7XvSCwA90UhR6qw7_nJRpOB2sLrTg1b-SAw&usqp=CAU",
        "https://press.razer.com/wp-content/uploads/2019/04/Blade-15-1024x540.png"
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
            <img id="imageThatSlider" src={AllImages[imagePlace]} />
            <img onClick={changePlaceNext} alt="NextArrow" id="NextArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
            <img onClick={changePlacePrev} alt="PrevArrow" id="PrevArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
        </div>
    )
}
export default withRouter(ImageSlider) 