let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let msgContainer=document.querySelector(".msg-panel");
let msg=document.querySelector("#msg");
let newbin= document.querySelector("#new");

let turnO=true;
let count=0;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=> {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes=()=>{
    for (let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congrats,winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner=()=>{
    for(let pattern of winPatterns){
           let post1val= boxes[pattern[0]].innerText;
           let post2val =boxes[pattern[1]].innerText;
           let post3val=boxes[pattern[2]].innerText;
        if(post1val!=""&&post2val!=""&&post3val!=""){
            if(post1val===post2val&&post2val===post3val){
                showWinner(post1val);
                return true;
            }
        }
    }
    return false;
};
newbin.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);