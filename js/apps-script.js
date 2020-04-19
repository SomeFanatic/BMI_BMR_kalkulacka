const countBMIandBMR = () => {
    let age = document.querySelector('#input2').value;
    let width = document.querySelector('#input3').value;
    let weight = document.querySelector('#input1').value;
    return(
        countBMI(width, weight), 
        countBMR(age, width, weight),
        countWaterPerDay(weight)
    );   
}
const onClickDecisionLoseWeight = () => {
    resetLoseAndGainWeight();
    document.querySelector('.row.chudnutie').classList.add('displayed');
    document.querySelector('div.chcesSchudnut').classList.add('selected');
}
const onClickDecisionGainWeight = () => {
    resetLoseAndGainWeight();
    document.querySelector('.row.priberanie').classList.add('displayed');
    document.querySelector('div.chcesPribrat').classList.add('selected');
}

const countWaterPerDay = (weight) => {
    let waterAtMorning = (weight * 0.04) * 0.666;
    let waterAfternoon = (weight * 0.04) * 0.333;
    waterAtMorning = waterAtMorning * 10;
    waterAtMorning = Math.floor(waterAtMorning);
    waterAtMorning = waterAtMorning / 10;
    waterAfternoon = waterAfternoon * 10;
    waterAfternoon = Math.floor(waterAfternoon);
    waterAfternoon = waterAfternoon / 10;

    return drinkingRegime(waterAtMorning, waterAfternoon);
}
const countBMI = (width, weight) => {
    let BMI = parseInt(weight) / ((parseInt(width) / 100) * (parseInt(width) / 100));
    BMI = BMI * 100;
    BMI = Math.floor(BMI);
    BMI = BMI / 100;
    return imgVisualizedBMI(BMI);
}
const imgVisualizedBMI = (BMI) => {
    let bmiOutput = document.querySelector('#bmiOutput h3');
    resetImgActiveClass();
    
    if (BMI < 18.5) {
        bmiOutput.innerHTML = "Tvoje BMI je " + BMI + ", takže máš podváhu.";
        document.querySelector('img.podvaha').classList.add('active');
    } else if (BMI > 18.5 && BMI <= 24.9) {
        bmiOutput.innerHTML = "Tvoje BMI je " + BMI + ", takže máš normálnu váhu.";
        document.querySelector('img.normalnaVaha').classList.add('active');
    } else if (BMI > 24.9 && BMI <= 29.9) {
        bmiOutput.innerHTML = "Tvoje BMI je " + BMI + ", takže máš nadváhu.";
        document.querySelector('img.nadvaha').classList.add('active');
    } else if (BMI > 29.9 && BMI <= 34.9) {
        bmiOutput.innerHTML = "Tvoje BMI je " + BMI + ", takže si obézny.";
        document.querySelector('img.obezita').classList.add('active');
    } else if (BMI > 35) {
        bmiOutput.innerHTML = "Tvoje BMI je " + BMI + ", takže si extrémne obézny.";
        document.querySelector('img.extremnaObezita').classList.add('active');
    }
}

const countBMR = (age, width, weight) => {
    let BMRman = 88 + (13.4 * weight) + (4.8 * width) - (5.7 * age);
    let BMRwoman = 448 + (9.2 * weight) + (3.1 * width) - (4.3 * age);
    if (document.getElementById('radioSedavyZivot').checked) {
        BMRwoman = BMRwoman * 1.2;
        BMRman = BMRman * 1.2;
    } else if (document.getElementById('radioJemneAktivnyZivot').checked) {
        BMRwoman = BMRwoman * 1.375;
        BMRman = BMRman * 1.375;
    } else if (document.getElementById('radioStredneAktivnyZivot').checked) {
        BMRwoman = BMRwoman * 1.55;
        BMRman = BMRman * 1.55;
    } else if (document.getElementById('radioVelmyAktivnyZivot').checked) {
        BMRwoman = BMRwoman * 1.725;
        BMRman = BMRman * 1.725;
    } else if (document.getElementById('radioExtremneAktivnyZivot').checked) {
        BMRwoman = BMRwoman * 1.9;
        BMRman = BMRman * 1.9;
    }
    BMRman = Math.floor(BMRman);
    BMRwoman = Math.floor(BMRwoman);
    return conditionalPrintedBMR(BMRman, BMRwoman);
}

const conditionalPrintedBMR = (BMRman, BMRwoman) => {
    let bmrOutput = document.querySelector('#bmrOutput h3');
    let BMR = "";
    if (document.getElementById('radioMuz').checked) {
        bmrOutput.innerHTML = "Tvoje BMR je " + BMRman + "kcal.";
        BMR = BMRman;

    } else if (document.getElementById('radioZena').checked) {
        bmrOutput.innerHTML = "Tvoje BMR je " + BMRwoman + "kcal.";
        BMR = BMRwoman;
    }
    return loseWeight(BMR), gainWeight(BMR);
}


const resetImgActiveClass = () => {
    let elems = document.querySelectorAll(".active");
    [].forEach.call(elems, (el) => el.classList.remove("active"));
}
const resetLoseAndGainWeight = () => {
    let elems = document.querySelectorAll(".displayed");
    let elems2 = document.querySelectorAll(".selected");
    [].forEach.call(elems, (el) => el.classList.remove("displayed"));
    [].forEach.call(elems2, (el) => el.classList.remove("selected"));
}

const loseWeight = (BMR) => {
    // po kliknutí na šípku dole zobraz náležitý kontent
    // 55kg x 0,04 = 2,2 L ( počas dňa musíte vypiť 2,2L čistej vody, )
    BMR = Math.floor(BMR * 0.8);
    let breakfast = document.querySelector('.chudnutie.ranajky');
        breakfast.innerHTML = "Raňajky: " + Math.floor(BMR * 0.2) + "kcal";
    let snack = document.querySelector('.chudnutie.desiata');
        snack.innerHTML = "Desiata: " + Math.floor(BMR * 0.15) + "kcal";
    let lounch = document.querySelector('.chudnutie.obed');
        lounch.innerHTML = "Obed: " + Math.floor(BMR * 0.3) + "kcal";
    let dinner = document.querySelector('.chudnutie.olovrant');
        dinner.innerHTML = "Olovrant: " + Math.floor(BMR * 0.2) + "kcal";
    let secondDinner = document.querySelector('.chudnutie.vecera');
        secondDinner.innerHTML = "Večera: " + Math.floor(BMR * 0.15) + "kcal";
}

const gainWeight = (BMR) => {
    BMR = Math.floor(BMR * 1.2);
    let breakfast = document.querySelector('.priberanie.ranajky');
        breakfast.innerHTML = "Raňajky: " + Math.floor(BMR * 0.2) + "kcal";
    let snack = document.querySelector('.priberanie.desiata');
        snack.innerHTML = "Desiata: " + Math.floor(BMR * 0.15) + "kcal";
    let lounch = document.querySelector('.priberanie.obed');
        lounch.innerHTML = "Obed: " + Math.floor(BMR * 0.3) + "kcal";
    let dinner = document.querySelector('.priberanie.olovrant');
        dinner.innerHTML = "Olovrant: " + Math.floor(BMR * 0.2) + "kcal";
    let secondDinner = document.querySelector('.priberanie.vecera');
        secondDinner.innerHTML = "Večera: " + Math.floor(BMR * 0.15) + "kcal";
}

const drinkingRegime = (waterAtMorning, waterAfternoon) => {
    let morningDrinkGainWeight = document.querySelector('.priberanie.vodaDoobeda');
        morningDrinkGainWeight.innerHTML = "Doobeda vypiť: " + waterAtMorning + " l";
    let morningDrinkLoseWeight = document.querySelector('.chudnutie.vodaDoobeda');
        morningDrinkLoseWeight.innerHTML = "Doobeda vypiť: " + waterAtMorning + " l";
    let afternoonDrinkGainWeight = document.querySelector('.priberanie.vodaPoobede');
        afternoonDrinkGainWeight.innerHTML = "Poobede vypiť: " + waterAfternoon + " l";
    let afternoonDrinkLoseWeight = document.querySelector('.chudnutie.vodaPoobede');
        afternoonDrinkLoseWeight.innerHTML = "Poobede vypiť: " + waterAfternoon + " l";
}