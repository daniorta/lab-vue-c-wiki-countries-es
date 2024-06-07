<script setup>
import { ref, onMounted } from 'vue';
import { country } from '../store/countriesStore';
import { RouterLink } from 'vue-router';

const countries = country();

onMounted(async () => {
  await countries.getCountries();
})

</script>

<template>

  <div class="container">
    <div class="container-countriesList-wrapper">
      <ul class="container-countriesList">
        <li class="countries" v-for="country in countries.coun" :key="country._id">

          <RouterLink class="list-countries" :to="{ name: 'listDetails', params: { alpha3Code: country.alpha3Code } }">

            <div class="gap-container">
              <img class="img-countries"
                :src="'https://flagpedia.net/data/flags/icon/72x54/' + country.alpha2Code.toLowerCase() + '.png'"
                alt="Flag" />
              <p class="name-countries">{{ country.name.common }}</p>
            </div>

          </RouterLink>

        </li>
      </ul>

    </div>


    <div class="container-countryDetails">

      <span>
        <router-view></router-view>
      </span>

    </div>






  </div>


</template>

<style>
.container {
  margin-left: 160px;
  display: flex;


  .container-countriesList {
    list-style: none;
  }

  .container-countriesList-wrapper{
    max-height: 800px; 
    overflow-y: auto;
  
  }

  .list-countries {
    color: black;
    text-decoration: none;

  }


  .countries {
    border: 1px solid #00000052;
    text-align: center;

  }

}

.img-countries {
  margin-top: 15px;
}
</style>