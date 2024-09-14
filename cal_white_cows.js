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
    try {
        const response = await fetch('cows.csv');
        const text = await response.text();
        cows = parseCSV(text);
    } catch (error) {
        console.error('Error loading CSV file:', error);
    }
}

//เช็คสีวัวแล้วปริ้นผลลัพธ์ว่าได้นมอะไร
async function handleMilkProduction(action) {
    await loadCSV();

    const codeInput = document.getElementById('code_cows').value;
    const cow = cows.find(cow => cow.cow_id === codeInput);
    const milkOutputElement = document.getElementById('milkOutput');
    const errorElement = document.getElementById('error');

    if(!cow){
        errorElement.textContent = 'Cow code not found.';
        milkOutputElement.textContent = '';
    }else if(cow.color === 'white') {
        if (action === 'lemon'){
            milkOutputElement.textContent = 'yakult 1 bottle';
        }
        else if (action === 'make milk'){
            const ageMonths = parseInt(cow.age_months, 10);
            const soyMilkChance = 0.005 * ageMonths;
            const random = Math.random(); 
            
            if(random < soyMilkChance){
                milkOutputElement.textContent = 'soy milk 1 bottle';  
            }else{
                milkOutputElement.textContent = 'plain milk 1 bottle';
            }
        }
    }else if(cow.color === 'brown'){
        errorElement.textContent = 'This is white cows';
        milkOutputElement.textContent = '';
    }
}

document.getElementById('makeMilkButton').addEventListener('click', () => handleMilkProduction('make milk'));
document.getElementById('lemonButton').addEventListener('click', () => handleMilkProduction('lemon'));


