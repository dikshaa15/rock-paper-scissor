
/*handy functions*/

//to make the selection faster

function $(selector='body',all=false){
  if(all){
    return document.querySelectorAll(selector)
  }
  return document.querySelector(selector)
}


function listen(selector='body',callback=()=>{},event='click'){
 var elements=$(selector,true)
 elements.forEach((element,index)=>{
  element.addEventListener(event,(e)=>{
    callback(e,index)
    })
})

}
/*end*/

//start of popup
var steps=$('.step',true)
var popup=$('.showpopup',true)

function showpopup(hide=false){
  if (hide) {
    popup.forEach(ele=>{
      ele.style.display='none'
    })
  }else{
        popup.forEach(ele=>{
      ele.style.display='flex'
    })

  }

}

listen('.rules',()=>{
showpopup()
})
listen('.close',()=>{
  showpopup(true)
})



/* end of popup logic */

/*start of game logic*/
var userpick
var comp

var rock=2
var paper=0
var scissors =1

var trick=[
  {
    type:'paper',
    index:0,
    img: `<img src='images/icon-paper.svg' alt='paper'/>`


  },
    {
    type:'scissors',
    index:1,
    img: `<img src='images/icon-scissors.svg' alt='scissors'/>`


  },
  {
    type:'rock',
    index:2,
    img: `<img src='images/icon-rock.svg' alt='rock'/>`


  }

  ]
  var score=0


listen('.restart',()=>{
  comp=''
  userpick=''
  changeStep(0)
   $(innerWidth>600?'.desktop .win' :'.mobile .win').style.display='none'
    $(innerWidth>600?'.desktop .lose' :'.mobile .lose').style.display='none'
    $(innerWidth>600?'.desktop' :'.mobile').style.display='none'
    $('.you .circle').classList.remove('paper')
    $('.you .circle').classList.remove('rock')
    $('.you .circle').classList.remove('scissors')
clearInterval(dope)
$('.you .circle').style.boxShadow='none'
$('.house .circle').style.boxShadow='none'

})

function boost(you=true){
  var opacities=[
    'hsla(0,100%,100%,0.2)',
    'hsla(237, 49%, 15%,0.4)',
     'hsla(237, 49%, 15%,0.2)',

    ]
  if (you) {
   dope= setInterval(()=>{
     opacities.unshift(opacities.pop())
 $('.you .circle').style.boxShadow=`0px 0px 3px 2rem ${opacities[0]}, 0px 0px 3px 4rem ${opacities[1]},0px 0px 3px 6rem ${opacities[2]}`

    },300)

  } else {
   dope= setInterval(()=>{
     opacities.unshift(opacities.pop())
 $('.house .circle').style.boxShadow=`0px 0px 3px 2rem ${opacities[0]}, 0px 0px 3px 4rem ${opacities[1]},0px 0px 3px 6rem ${opacities[2]}`

    },300)

  }
}

  function updateScore(increased=true){
    if (increased) {
      boost()

     $(innerWidth>600?'.desktop .win' :'.mobile .win').style.display='flex'

    score+=1
    $('.score').innerText=score
    }else{
      boost(false)
    $(innerWidth>600?'.desktop .lose' :'.mobile .lose').style.display='flex'

       score-=1
 $('.score').innerText=score

    }
    $(innerWidth>600?'.desktop' :'.mobile').style.display='flex'

   //i don't want to save the score after refresh
//* localStorage.setItem('score',score)
  }

var changeStep=(index=1)=>{

  steps.forEach(step=>{

   step.style.display='none'
 })


steps[index].style.display='flex'
 }

 function process(){
   switch (comp.index) {
     case 0:
       if (userpick===2) {
                updateScore(false)
       }
       if (userpick==1) {
                updateScore()

       }
       break;
     case 1:
       if (userpick==0) {
                updateScore(false)

       }
       if(userpick==2) updateScore()

       break;
     case 2:
     if (userpick==1) {
              updateScore(false)

     }
     if(userpick==0) updateScore()

       break;
     default:
     break;
   }

 }
function trickuser(){
  var count=0
  setTimeout(async ()=>{

  var  getcomp= async ()=>{
   comp= trick[Math.round(
Math.random()*2
 )]
     if (comp.index==userpick) {
       await getcomp()
 }else{
return new Promise(resolve=>resolve(comp))
  }}
getcomp().then(()=>{
       $('.house .circle').className='circle'
    $('.house .circle').classList.add(comp.type)
    $('.house .circle').innerHTML=comp.img
process()
})
  },1200)

  trickint=setInterval(()=>{
    var now=count
    $('.house .circle').className='circle'
    $('.house .circle').classList.add(trick[now].type)
    $('.house .circle').innerHTML=trick[now].img
      if (count >= 2) {
        count = 0
      } else {
        count += 1
      }

     clearer= setTimeout(()=>{
        clearInterval(trickint)
      },1000)
  },100)

}

function step2(element=HTMLImageElement){
    $('.you .circle').innerHTML=`<img src=${element.src} alt='${element.alt}' />`

  let coin=element.alt
  switch (coin) {
    case 'scissors':
      userpick=scissors
    $('.you .circle').classList.add('scissors')

      break;
      case 'rock':
        userpick=rock
     $('.you .circle').classList.add('rock')
     break;
      case 'paper':
        userpick=paper
    $('.you .circle').classList.add('paper')
        break;
      default:
      changeStep(0)
      break;

  }

  changeStep()
  trickuser()
}

listen('.choose',(e,index)=>{
    setTimeout(()=>{

  step2(e.target.classList.contains('choose')? e.target.querySelector('img')  : e.target)
},1000)

  spin(index)
})

function spin(index=1){

 steps[0].classList.add(`rotate${index===0?3:index}`)
setTimeout(()=>{
  steps[0].classList.remove(`rotate${index===0 ? 3 : index}`)
},2000)

}
