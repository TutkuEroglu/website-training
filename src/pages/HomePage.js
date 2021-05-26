import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";

export default function LoginPage() {

  const user = useSelector(selectUser);

  return (
    <div className="Appx">
      
      {user ? (<h1 style={{color:"white"}}>Hoşgeldin {user.username}<span className="badge bg-secondary">{user.role}</span></h1>) : ""}
      <br/>
      <br/>
      <br/>

    <div style={{position:"absolute",width:"700px",right:"31%",backgroundColor:"#242526",color:"white"}}className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button style={{backgroundColor:"#242526",fontFamily:"revert",fontSize:"25px",border: "2px solid #242526",color:"white",width:"690px"}} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Vizyonum
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div  className="accordion-body">
       Sadece kendimi <strong> geliştirmek </strong> amacıyla yapmaya çalıştığım bi site 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button style={{backgroundColor:"#242526",fontFamily:"revert",fontSize:"25px",border: "2px solid #242526",color:"white",width:"690px"}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Gelir Kaynaklarım
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Kyk </strong> bile kesildi. <strong>Kesinlikle 0</strong> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button style={{backgroundColor:"#242526",fontFamily:"revert",fontSize:"25px",border: "2px solid #242526",color:"white",width:"690px"}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Hakkımda
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Boş </strong> biriyim. <strong>23 </strong> yaşındayım. İnş yazılım öğrencem. İlk sitemi <strong>gay chat</strong> olarak açmayı düşünüyorum.
      </div>
    </div>
  </div>
</div>
<h2 style={{position:"absolute",top:"52%",right:"40%",color:"white"}}className="yy">Sitenin bitmesine kalan</h2>
<div style={{position:"absolute",width:"750px",right:"28.5%",top:"60%"}}className="progress">
<div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "31%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>
  );
}
