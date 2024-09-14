//เช็ควัวใน csv ว่ามีcode นี้มั้ย
let cows = [];

function parseCSV(data) {
    const rows = data.trim().split('\n');
    const header = rows[0].split(',');
    const entries = rows.slice(1).map(row => {
        const values = row.split(',');
        return header.reduce((acc, key, index) => {
            acc[key] = values[index];
            return acc;
        }, {});
    });
    return entries;
}

async function loadCSV() {
    try{
        const response = await fetch('cows.csv');
        const text = await response.text();
        cows = parseCSV(text);
    }catch (error){
        console.error('Error loading CSV file:', error);
    }
}

//พอเช็คแล้วให้เปลี่ยนไปที่หน้าของวัวแต่ละสี 
function handleFormSubmit() {
    const codeInput = document.getElementById('code_cows').value;
    const cow = cows.find(cow => cow.cow_id === codeInput);
    const errorElement = document.getElementById('error');

    if(!cow){
        errorElement.textContent = 'Cow code not found.';
        return;
    }

    errorElement.textContent = '';

    if(cow.color === 'brown'){
        window.location.href = 'brown_cows.html';
    }else if(cow.color === 'white') {
        window.location.href = 'white_cows.html';
    }
}
loadCSV();

//กลับหน้าแรก
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});