<script setup>
import { onMounted, watch, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { country } from '../store/countriesStore';

const route = useRoute();
const allCountry = country();
const bordersCountries = ref([]);


const fetchCountryDetails = async () => {
  const countryparans = route.params.alpha3Code;
  await allCountry.getCountry(countryparans);

  
  if (allCountry.countryDeta.borders && allCountry.countryDeta.borders.length) {
    const borderPromises = allCountry.countryDeta.borders.map(code =>
      fetch(`https://ih-countries-api.herokuapp.com/countries/${code}`).then(res => res.json())
    );
    bordersCountries.value = await Promise.all(borderPromises);
  } else {
    bordersCountries.value = [];
  }

};

onMounted(fetchCountryDetails);

watch(() => route.params.alpha3Code, fetchCountryDetails);

</script>

<template>
  <section v-if="allCountry.countryDeta" class="country-details">
    <img
      :src="'https://flagpedia.net/data/flags/icon/72x54/' + allCountry.countryDeta.alpha2Code.toLowerCase() + '.png'"
      alt="Flag of {{ allCountry.countryDeta.name.common }}"
      class="img-details"
    />

    <h1 class="name-country">{{ allCountry.countryDeta.name.common }}</h1>

    <div class="detail-item">
      <span>Capital:</span>
      <span>{{ allCountry.countryDeta.capital ? allCountry.countryDeta.capital[0] : 'N/A' }}</span>
    </div>

    <div class="detail-item">
      <span>Área:</span>
      <span>{{ allCountry.countryDeta.area }} Km<sup>2</sup></span>
    </div>

    <div class="detail-item">
      <span>Borders</span>
      <div class="borders-container">
        <ul class="list-details">
          <li class="list-countries" v-for="border in bordersCountries" :key="border.alpha3Code">
            <RouterLink :to="{ name: 'listDetails', params: { alpha3Code: border.alpha3Code } }">
              {{ border.name.common }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>

</template>

<style>
.country-details {
  width: 500px;
  text-align: center;
  margin-left: 150px;
}

.name-country {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #000;
  padding: 10px 0;
}

.list-details {
  list-style: none;
}

.list-countries {
  margin-left: 10px;
}




.img-details {
  height: 150px;
}
</style>