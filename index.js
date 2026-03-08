const all = document.getElementById('all');
const open = document.getElementById('open');
const close = document.getElementById('close');
const cardSection=document.getElementById("cardSection")
const status=document.getElementById("status")

function login() {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const issuePage = document.getElementById("issuePage");
  const error = document.getElementById("error");

  if (userName === "admin" && password === "admin123") {
    issuePage.classList.remove("hidden");
    logPage.classList.add("hidden")
    error.innerText = "";
  } else {
    error.innerText = alert("Wrong Information");
    
  }
}
let sum = document.getElementById('sum');

function calcCount(){
    sum.innerText=cardSection.children.length;
}
calcCount()

function toggleStyle(id) {
    
    all.classList.add('bg-white', 'text-black')
    open.classList.add('bg-white', 'text-black')
    close.classList.add('bg-white', 'text-black')

    all.classList.remove('bg-blue-500', 'text-white')
    open.classList.remove('bg-blue-500', 'text-white')
    close.classList.remove('bg-blue-500', 'text-white')
    const selected = document.getElementById(id);
    currentStatus=id;
    console.log(currentStatus)
    selected.classList.remove('bg-white', 'text-black')
    selected.classList.add('bg-blue-500', 'text-white')
       
const cards = document.querySelectorAll(".issue-card");

cards.forEach(card => {
    const status = card.dataset.status.toLowerCase();

    if (id === "all") {
        card.style.display = "block";
    } 
    else if (status === id || (id === "close" && status === "closed")) {
        card.style.display = "block";
        
    } 
    else {
        card.style.display = "none";
    }
});


}
const loadCardDetail=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res=await fetch(url)
    const details=await res.json()
    displayDetails(details.data)
}
const displayDetails=(cards)=>{
    console.log(cards)
    const detailsContainer=document.getElementById("detailsContainer")
    detailsContainer.innerHTML=`
        <div class="w-[500px] h-[314px] bg-white p-[32px] space-y-3 rounded-[10px]">
        <h2 class="text-3xl font-bold">${cards.title}</h2>
        <div class="flex gap-2 justify">
            <button class="btn btn-error bg-[#00A96E] text-[#FFFFFF] w-[62px] h-[24px] rounded-full">Opened</button>
            <p class="text-gray-500">Opened by ${cards.assignee}</p>
            <p class="text-gray-500">22/02/2026</p>
        </div>
        <button class="btn btn-error bg-[#FECACA] text-[#EF4444] w-[56px] h-[24px] rounded-full">BUG</button>
        <button class="btn btn-warning w-[120px] h-[24px] rounded-full bg-[#FFF6D1] text-[#F59E0B] p-[10px]">Help Wanted</button>
        <p class="text-gray-500">${cards.description}</p>
        <div class="w-[436px] h-[81px] bg-gray-200 flex justify-between items-center rounded-[10px] p-[16px]">
            <div>
                <p class="text-gray-500">Assignee:</p>
                <p >${cards.assignee}</p>

            </div>
            <div>
                <p class="text-gray-500">Priority:</p>
                <button class="btn btn-error bg-[#e70606] text-[#FFFFFF] w-[56px] h-[24px] rounded-full">${cards.priority}</button>
               

            </div>
        </div>

    </div>
    `
    document.getElementById("my_modal_5").showModal()

}

async function loadCard() {
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await res.json()
    displayCard(data.data)
    calcCount(data.data)

}
function displayCard(cards){
    cardSection.innerHTML=""

    cards.forEach(card => {

        let borderClass="";

        if(card.priority.toLowerCase()==="high" || card.priority.toLowerCase()==="medium"){
            borderClass="border-green";
        }
        else if(card.priority.toLowerCase()==="low"){
            borderClass="border-red";
        }

        const allCard=document.createElement("div")

        allCard.innerHTML=`
        <div onclick="loadCardDetail(${card.id})"
        class="issue-card ${borderClass} w-[256.5px] h-[300px] bg-white mt-[16px] p-[10px] rounded-[5px]"
        data-status="${card.status}">
        
            <div class="flex justify-between pb-2">
                <img src="./assets/Open-Status.png" alt="">
                <button class="btn btn-warning w-[80px] h-[24px] rounded-full bg-[#FFF6D1] text-[#F59E0B] p-[10px]">
                ${card.priority}
                </button>
            </div>

            <h4 class="font-bold">${card.title}</h4><br>
            <p class="line-clamp-2">${card.description}</p><br>

            <button class="btn btn-error bg-[#FECACA] text-[#EF4444] w-[56px] h-[24px] rounded-full">BUG</button>
            <button class="btn btn-warning w-[120px] h-[24px] rounded-full bg-[#FFF6D1] text-[#F59E0B] p-[10px]">Help Wanted</button>

            <div class="cool mt-2">
                <div class="line"></div>
                <p>${card.author}</p>
                <p>${card.createdAt}</p>
            </div>

        </div>
        `

        cardSection.appendChild(allCard)
    });
}
loadCard()

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const allCards = data.data;
      console.log(allCards);
      const filterCards = allCards.filter((title) =>
        title.title.toLowerCase().includes(searchValue)
      );

      displayCard(filterCards);
    });
});
