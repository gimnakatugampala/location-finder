//Liseten for delete
document.querySelector('body').addEventListener('click',deleteLocation);


//Listen for submit
document.querySelector('#zipForm').addEventListener('keyup',getLocationInfo);

function getLocationInfo(e){
    e.preventDefault();

    //Get zip value form input
    const zip = document.querySelector('.zip').value;

    //Make Request
    fetch(`https://api.zippopotam.us/LK/${zip}`)
    .then(res => {
        if(res.status !== 200){
            showIcon('remove')
            document.querySelector('#output').innerHTML = `
            <article class="message is-danger"><div class="message-body">Invalid Zipcode, Plaese Try Again</div></article>
            `;
            throw Error(res.statusText)
        
        }else{
            showIcon('check')
            return res.json()
        }
    })
    .then(data => {
        //Show location info
        let output = '';

        data.places.forEach(place =>{
            let placeName = place['place name'] == '' ? 'N/A': place['place name'];
            let StateName = place['state'] == '' ? 'N/A': place['state'];
            let LongitudeName = place['longitude'] == '' ? 'N/A': place['longitude'];
            let LatitudeName = place['latitude'] == '' ? 'N/A': place['latitude'];
            output += `
            <article class="message is-primary">
                <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                </div>
                <div class="message-body">
                <ul>
                    <li><strong>City : ${placeName}</strong></li>
                    <li><strong>State : ${StateName}</strong></li>
                    <li><strong>Longitude : ${LongitudeName}</strong></li>
                    <li><strong>Latitude : ${LatitudeName}</strong></li>
                </ul>
                </div>
            </article>
            `;
        })

        //Insert to the DOM
        document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err))
}

//Show chek or remove icon
function showIcon(icon){
    //Clear Icons
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';

    //show icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

//Delete location box
function deleteLocation(e){

    if(e.target.classList == 'delete'){
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').remove();

    }
}
