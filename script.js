const displayPlants = (plants) => {
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = ""; 



   

        plants.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.innerHTML = `
                    <div class="sns card bg-white grid gap-2 p-4">
                <div class="sns grid gap-4">
                    <img src="${plant.image}" alt="" class="w-full h-full md:w-[30vh] md:h-[30vh] lg:w-[30vh] lg:h-[30vh] justify-self-center">
                    <button class="button-name hover:text-green-800 text-md font-bold">${plant.name}</button>
                    <p class="text-[10px] text-gray-500 h-[10vh]">${plant.description}</p>
                </div>
                <div class="flex justify-between items-center">
                    <button class="btn btn-warning rounded-3xl bg-green-100 text-green-500 w-1/2 text-[12px] font-bold border-none">${plant.category}</button>
                    <p><span>৳</span><span class="font-bold">${plant.price}</span></p>
                </div>
                <div class="w-full rounded-3xl bg-green-800 text-white font-bold text-center p-2 mt-4" id="add-to-cart-btn-${plant.id}">Add to Cart</div>
            </div>
        `;
            const button = plantCard.querySelector('.button-name');
            button.id = `plant-card-${plant.id}`;
            const addToCartButton = plantCard.querySelector('.w-full');
            addToCartButton.id = `add-to-cart-btn-${plant.id}`;

            plantsContainer.appendChild(plantCard);
        });

    
};



const displayPlantFirst = (plants) => {
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = "";
const firstSix = plants.slice(0, 6);
    firstSix.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.innerHTML = `
        



            <div class="sns card bg-white grid gap-2 p-4">
                <div class="sns grid gap-4">
                    <img src="${plant.image}" alt="" class="w-full h-full md:w-[30vh] md:h-[30vh] lg:w-[30vh] lg:h-[30vh] justify-self-center">
                    <button class="button-name hover:text-green-800 text-md font-bold">${plant.name}</button>
                    <p class="text-[10px] text-gray-500 h-[10vh]">${plant.description}</p>
                </div>
                <div class="flex justify-between items-center">
                    <button class="btn btn-warning rounded-3xl bg-green-100 text-green-500 w-1/2 text-[12px] font-bold border-none">${plant.category}</button>
                    <p><span>৳</span><span class="font-bold">${plant.price}</span></p>
                </div>
                <div class="w-full rounded-3xl bg-green-800 text-white font-bold text-center p-2 mt-4" id="add-to-cart-btn-${plant.id}">Add to Cart</div>
            </div>
        `;

        plantsContainer.appendChild(plantCard);
 const button = plantCard.querySelector('.button-name');
        button.id=`plant-card-${plant.id}`;

    });



};




const labels = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(json => displayCategories(json.categories));
};

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.className = "btn btn-outline btn-success border-none hover:bg-green-800 text-black w-full justify-start text-left";
        categoryButton.id = `category-btn-${category.id}`;
        categoryButton.innerText = category.category_name;


         categoryButton.addEventListener('click', () => {
        
        categoriesContainer.querySelectorAll('button').forEach(btn => {
          
            btn.classList.remove('bg-green-800', 'text-white');
            btn.classList.add('btn-outline', 'btn-success', 'text-black');
        });

    
        categoryButton.classList.add('bg-green-800', 'text-white');
        categoryButton.classList.remove('btn-outline', 'btn-success', 'text-black');
        
        const id = category.id;
        categoryPlants(id); 
    });
const allTrees = document.getElementById('all-trees');

      allTrees.addEventListener('click', () => {
        
        categoriesContainer.querySelectorAll('button').forEach(btn => {
          
            btn.classList.remove('bg-green-800', 'text-white');
            btn.classList.add('btn-outline', 'btn-success', 'text-black');
        });

       allTrees.classList.add('bg-green-800', 'text-white');
        allTrees.classList.remove('btn-outline', 'btn-success', 'text-black');
       
        
        const id = category.id;
        categoryPlants(id); 
    });






        categoriesContainer.appendChild(categoryButton);
    });
};

labels();



const fetchCategoryPlants = (id) => {
    const startTime = performance.now(); 
    showSpinner(); 

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displayPlants(data.plants); 
        })
        .catch(err => console.error(err))
        .finally(() => {
            hideSpinner(); 
            const endTime = performance.now();
            const timeTaken = endTime - startTime;
            

           
        });
};



document.addEventListener('click', (e) => {
    if (e.target.id.startsWith('category-btn-')) {
        const id = e.target.id.split('-')[2];
       fetchCategoryPlants(id);
    }
});



const allTrees = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(res => res.json())
        .then(json => displayPlants(json.plants));
};

document.getElementById('all-trees').addEventListener('click', () => {
    allTrees();
});

const firstSixPlants = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(res => res.json())
        .then(json => displayPlantFirst(json.plants));
};


firstSixPlants();

let total = 0;

const historyFetch= (id)=>
{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(json => addToCartHistory(json.plants));
      
   
}
const alertfetch = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(json => alertMessage(json.plants));
}


const addToCartHistory = (plant) => {
    let historyItem = document.getElementById(`history-item-${plant.id}`);
    const totalPrice = document.getElementById('total-price');

    if (historyItem) {
       
        let count = document.getElementById(`countingclick-${plant.id}`);
        count.innerText = parseInt(count.innerText) + 1;
    } else {
       
        const historyContainer = document.getElementById('history-container');
        historyItem = document.createElement('div');
        historyItem.id = `history-item-${plant.id}`;

        historyItem.innerHTML = `
            <div class="bg-green-100 p-4 flex justify-between items-center">
                <div>
                    <p class="font-bold">${plant.name}</p>
                    <p class="text-gray-500">
                        <span>৳</span><span class="plant-price">${plant.price}</span>
                        <span>x<span id="countingclick-${plant.id}">1</span></span>
                    </p>
                </div>
                <button class="remove-btn font-bold">x</button>
            </div>
        `;

        historyContainer.appendChild(historyItem);

   
        historyItem.querySelector('.remove-btn').addEventListener('click', () => {
            let count = document.getElementById(`countingclick-${plant.id}`);
            let countingNum = parseInt(count.innerText);
            let price = parseInt(plant.price);

           
            total -= price * countingNum;
            totalPrice.innerText = total;

            historyItem.remove();
        });
    }


    total += parseInt(plant.price);
    totalPrice.innerText = total;
};




document.addEventListener('click', (e) => {
    if (e.target.id.startsWith('add-to-cart-btn-')) {
        const id = e.target.id.split('-')[4];
        alertfetch(id);

        historyFetch(id);
        
        

    }
});

const alertMessage = (plant) => {

    alert('You have added ' + plant.name + ' to your cart');
   

}


document.addEventListener('click', (e) => {
    if (e.target.id.startsWith('plant-card-')) {
       const plantId=e.target.id.split('-')[2];
        const overlay=document.getElementById('popupOverlay');
        overlay.classList.remove('hidden');
        popup(plantId);

    }
   if(e.target.id==='close-btn')
   {
    const overlay=document.getElementById('popupOverlay');
    overlay.classList.add('hidden');
   }

});


const popup = (id)=>{

    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(json => displaynewdiv(json.plants));


}


const displaynewdiv=(plant)=>{
    const newdivcontainer = document.getElementById('popupOverlay');
    newdivcontainer.innerHTML='';
    const newdiv = document.createElement('div');
    newdiv.innerHTML = `
<div  class="bg-white w-md p-8 grid gap-4 rounded-lg lg:w-lg xl:w-lg ">
    <div class="text-xl font-bold text-center">${plant.name}</div>
    <div class="justify-self-center"><img src="${plant.image}" alt="${plant.name}" class="w-[30vh] h-[30vh]"></div>
    <div class="items-center grid justify-center mt-8 grid gap-2">
    <p class="font-bold">Category: <span class="tree-category text-sm">${plant.category}</span></p>
    <p class="font-bold">Price: <span class="tree-price">৳${plant.price}</span></p>
    <p class=""><span class="font-bold text-sm">Description</span> <span>${plant.description}</span></p>
    </div>
    <div class="justify-self-end mt-4">
        <button id="close-btn" class=" bg-gray-300 p-2 rounded-lg ">Close</button>
    </div></div>
    `;
    newdivcontainer.appendChild(newdiv);
}



//spinner

const showSpinner = () => {
    document.getElementById('plants-spinner').classList.remove('hidden');
};

const hideSpinner = () => {
    document.getElementById('plants-spinner').classList.add('hidden');
};

