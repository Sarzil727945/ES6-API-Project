const loadUser = async(searchText) =>{
     const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
     const res = await fetch(url);
     const data = await res.json();
     displayUser(data.data);
}
const displayUser = usersArray =>{
     const mainSection = document.getElementById('cardMainSection');
     mainSection.textContent = ' ';
     usersArray = usersArray.slice(0,10);
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
                </div>
              </div>
            </div>
          `
          mainSection.appendChild(addDiv);
     });
     toggleLoader(false);
}

document.getElementById('btn-search').addEventListener('click', function(){
     toggleLoader(true);
     const inputField = document.getElementById('input-field');
     const inputString = inputField.value;
     loadUser(inputString);
})

const toggleLoader = isLoading =>{
     const loader =  document.getElementById('loader');
     if (isLoading) {
          loader.classList.remove('d-none');
     }
     else{
          loader.classList.add('d-none');
     }
}
