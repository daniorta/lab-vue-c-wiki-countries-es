import { defineStore } from "pinia";
import { ref } from "vue";

export const country = defineStore("countries", () => {
    const coun = ref([]);
    const countryDeta = ref(null);

    const getCountries = async () => {
        const response = await fetch("https://ih-countries-api.herokuapp.com/countries");
        const data = await response.json();        
        coun.value = data;
    };

    

    const getCountry = async (alpha3Code) => {
        const response = await fetch (`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`);
        const data = await response.json();
        console.log(data);
        countryDeta.value = data;
    }


    return {coun, getCountries, countryDeta, getCountry }
    
})