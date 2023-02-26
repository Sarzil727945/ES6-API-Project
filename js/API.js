const loadUser = async(searchText, sameCode) =>{
     const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
     const res = await fetch(url);
     const data = await res.json();
     displayUser(data.data , sameCode);
}
const displayUser = (usersArray, sameCode) =>{
     const mainSection = document.getElementById('cardMainSection');
     mainSection.textContent = '';
     const showButton = document.getElementById("show-all");
     if(sameCode && usersArray.length > 10){
          usersArray = usersArray.slice(0,10);
          showButton.classList.remove('d-none'); 
     }
     else{
          showButton.classList.add('d-none');  
     }
     const noPhone = document.getElementById('no-phone');
     if (usersArray.length == 0) {
          noPhone.classList.remove('d-none');
     }
     else{
          noPhone.classList.add('d-none'); 
     }
     usersArray.forEach(element => {
          const addDiv = document.createElement('div')
          addDiv.innerHTML =`
            <div class="col">
              <div class="card">
                <img src="${element.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button href="#" class="btn btn-primary" onclick="phoneDetails('${element.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div>
              </div>
            </div>
          `
          mainSection.appendChild(addDiv);
     });

     toggleLoader(false);  
}

const sameCode = showData =>{
     toggleLoader(true);
     const inputField = document.getElementById('input-field');
     const inputString = inputField.value;
     loadUser(inputString , showData);
}

document.getElementById('btn-search').addEventListener('click', function(){
     sameCode(10);
})
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
     sameCode(10);
    }
});

const toggleLoader = isLoading =>{
     const loader =  document.getElementById('loader');
     if (isLoading) {
          loader.classList.remove('d-none');
     }
     else{
          loader.classList.add('d-none');
     }
}

document.getElementById('btn-showAll').addEventListener('click', function(){
     sameCode();
})

const phoneDetails = async(id) =>{
     const url = `https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(url);
     const data = await res.json();
     phone(data.data);
}
const phone = data =>{
     console.log(data);
     const titleField = document.getElementById('exampleModalLabel');
     titleField.innerText = data.name;

     const releaseDateField = document.getElementById('release-date');
     releaseDateField.innerText = data.releaseDate;
}
