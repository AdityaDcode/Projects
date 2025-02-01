let reposData = [];
const gitLink = "https://api.github.com/users/"
let input;
let link ="";
function getInput(){
    input = document.getElementById("name").value.trim();
    link = gitLink+input+`/repos`;
    console.log(link)
    return link;
}
 
async function getRepoData() {
    let url = getInput();
    const response = await fetch(url);

    try{
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
       reposData = await response.json(); 
       console.log(reposData) 
        rendertable();
    }catch(error){
       console.error(error.message);
    }
}


function rendertable(){
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = "";
    idx =0;
    reposData.forEach((item,idx) => {
        const row = document.createElement(`tr`);
    row.innerHTML=`
        <td>${idx+1}</td>
        <td>${reposData[idx].name}</td>
        <td>${reposData[idx].visibility}</td>
        <td>${new Date(reposData[idx].created_at).toLocaleDateString()}</td>
        <td>${new Date(reposData[idx].updated_at).toLocaleDateString()}</td>
        <td><a target="_blank" href="${reposData[idx].clone_url}">Link</a></td>
    `;
    tbody.appendChild(row);
    });
    
}

