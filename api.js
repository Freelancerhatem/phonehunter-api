const loadPhone = async (phoneText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayphones(phones,isShowAll)
}
const displayphones = (phones,isShowAll) => {
const phoneContainer = document.getElementById('phone-container');
phoneContainer.textContent='';
const showAllContainer =document.getElementById('show-all-btn');

if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
}
else{
    showAllContainer.classList.add('hidden');

}

    if(!isShowAll){
        phones =phones.slice(0,12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  w-96 bg-gray-400 shadow-xl`;
        phoneCard.innerHTML = `
 <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary" onclick=showAllDetails('${phone.slug}')>Buy Now</button>
    </div>
  </div>

        `;
        phoneContainer.appendChild(phoneCard)
    });
    loadingBar(false)
}

// handle search for search button
const handleClick =(isShowAll)=>{
    loadingBar(true)
    let searchField = document.getElementById('search-field').value;
    
    loadPhone(searchField,isShowAll);
    
}
const handleClick2=()=>{
    let searchField = document.getElementById('search-field').value;

    loadPhone(searchField);
}

const loadingBar =(isTrue)=>{
    const loading =document.getElementById('loading-bar');
    if(isTrue){
    loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden');
    }
}

const showAllBtn= () =>{
    handleClick(true)
}

const showAllDetails =async (id)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    // console.log('clicked',id);
    const data = await res.json();
    const phonesModal =data.data;
    console.log(data)
    showAllModal(phonesModal)
}

const showAllModal =(phonesModal)=>{
    
    const title =document.getElementById('modal-title');
    // console.log(title)
    title.innerText =phonesModal.name;
    const modalDetails = document.getElementById('modal-container');
    modalDetails.innerHTML=`
    <img src="${phonesModal.image}" alt="" class="mx-auto">
    <p>${phonesModal.mainFeatures.storage}</p>
    
    `
    my_modal_2.showModal();

    // modal innnerHTML
    
    






}

loadPhone()
