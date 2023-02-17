var count = 0;
var selectedObj;
var gripPressed;


AFRAME.registerComponent('ball-detect', {
  init: function () {
    var ent = this.el;      
    this.el.addEventListener('collide', function(e){
      if(e.detail.body.el.id.includes('bowling-pin')){
       // console.log('Colisión producida con: ' + e.detail.body.el.id);
        //console.log(e)
        try{
          ent.parentNode.removeChild(document.getElementById(e.detail.body.el.id));
          ent.parentNode.removeChild(ent);
          count++;
          const regPuntos = /Puntos:(\d|\s)+/
         // let nuevoTexto = document.getElementById("pointsDisplay").setAttribute("value", "Puntos:"+ count)
          //(document.getElementById("pointsDisplay")).value=nuevoTexto;
         
        } catch (err){console.log(err)}
        console.log('Número de puntos:' + count);
      }
    });
  },
});

AFRAME.registerComponent('thumbstick-movement',{
  init: function () {
    
    this.el.addEventListener('thumbstickmoved', this.thumbstickMovement);
  },
  thumbstickMovement: function (evt) {
    var cameraRig = document.getElementById('camrig');
    
    if (evt.detail.y > 0.95) { 
      cameraRig.object3D.translateZ(0.05);
    }
    if (evt.detail.y < -0.95) { 
      cameraRig.object3D.translateZ(-0.05);
    }
    if (evt.detail.x < -0.95) { 
      cameraRig.object3D.translateX(-0.05);
    }
    if (evt.detail.x > 0.95) { 
      cameraRig.object3D.translateX(0.05);
    }
  }
});
AFRAME.registerComponent('thumbstick-camera',{
  init: function () {
    
    this.el.addEventListener('thumbstickmoved', this.thumbstickCamera);
  },
  thumbstickCamera: function (evt) {
    var cameraRig = document.getElementById('camrig');
    
    if (evt.detail.x < -0.95) { 
      cameraRig.object3D.rotateY(THREE.Math.degToRad(5));
    }
    if (evt.detail.x > 0.95) { 
      cameraRig.object3D.rotateY(THREE.Math.degToRad(-5));
    }
  }
});
AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],

  init: function () {
    var debugtxt = document.getElementById("debugTxt");

    this.el.addEventListener('raycaster-intersection', function () {
      debugtxt.setAttribute('value','Intersección detectada!');
    });
  }
});

// AFRAME.registerComponent('collider-check', {
//   dependencies: ['raycaster'],
//   init: function () {
   
//     this.el.addEventListener('raycaster-intersection', function (e) {
//       debugtxt.setAttribute('value', 'interseccion');
//       this.selectedObj = e.detail.els[0];
//     });
//     this.el.addEventListener('raycaster-intersection-cleared', function (e) {
//       debugtxt.setAttribute('value', 'fuera interseccion');
//       this.selectedObj = false;
//     });
//     this.el.addEventListener('gripdown', function(e){
//       debugtxt.setAttribute('value', 'agarre');
//       this.gripPressed = true;
//     });
//     this.el.addEventListener('gripup', function(e){
//       debugtxt.setAttribute('value', 'soltar');
//       this.gripPressed = false;
//     });
//   },
//   tick: function(){
//     try{
//     var debugtxt = document.getElementById("debugTxt");
//     debugtxt.setAttribute('value', '1');
//     if(!this.selectedObj || !this.gripPressed) return;
//     debugtxt.setAttribute('value', '2');
//     //Direccion raycast
//     var raycast = this.el.getAttribute("raycaster").direction;
//     debugtxt.setAttribute('value', '3');
//     // Posicion del impacto entiendo
//     var position = new THREE.Vector3(raycast.x,raycast.y, raycast.z);
//     debugtxt.setAttribute('value', '4');
//     //NOrmalizar
//     position.normalize();
//     debugtxt.setAttribute('value', '5');
//     //Separar de la mano
//     position.multiplyScalar(2);
//     debugtxt.setAttribute('value', '6');
//     //Obtener lugar real
//     this.el.object3D.localToWorld(position);
//     debugtxt.setAttribute('value', '7');
//     //Ponerle la pos al objeto
//     this.el.selectedObj.object3D.position.set(position.x, position.y, position.z);
//     //Sincronizar físicas
//     if(this.el.selectedObj.components["dynamic-body"]){
//       this.el.selectedObj.components["dynamic-body"].syncToPhysics();
//     }
//     } catch(err){
//       debugtxt.setAttribute('value', err);
//     }
//   }
// });

