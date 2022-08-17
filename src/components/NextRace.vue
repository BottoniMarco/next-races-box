<template>
  <div>
    <!-- race filters -->
    <div class="racetype">
      <input type="checkbox" name="trot" id="" v-model="checkedTypes" value="T" @change="showRaces">
      <label for="trot">trot</label>

      <input type="checkbox" name="gallop" id="" v-model="checkedTypes" value="G" @change="showRaces">
      <label for="gallop">gallop</label>

      <input type="checkbox" name="jump" id="" v-model="checkedTypes" value="J" @change="showRaces">
      <label for="jump">jump</label>

      <input type="checkbox" name="dog" v-model="checkedTypes" value="D" id="" >
      <label for="dog">dog</label>
    </div>
    <!-- /race filters -->

    <!-- next race widget -->
    <div class="nextrace">
      <div>
        <div class="container" v-if="this.selectedRaces.length != 0">
          <!-- race info container-top -->
          <div class="eventInfoTop">
            <img id="flags" :src="require('./../assets/flags/'+ this.showRace[0].event.country +'.svg')" alt="">
            <span id="eventTitle">{{ this.showRace[0].event.title }}</span>
            <div  v-if="Date.now() < new Date(this.showRace[0].post_time)">
              <vue-countdown :time="this.showRace[0].post_time" v-slot="{days, hours, minutes }">
                  {{ days }} d, {{ hours }} h, {{ minutes }} min
              </vue-countdown>
            </div>
            <div class="eventTime" v-else>
              <span>Due</span>
            </div>
          </div>
          <!-- /race info container-top -->

          <!-- race info container-bottom -->
          <div class="eventInfoBottom">
            <ul>
              <li>{{ this.showRace[0].num_runners }} Runners</li>
              <li>{{ this.showRace[0].distance }} m</li>
              <li>{{ this.showRace[0].purse.amount }} {{ this.showRace[0].purse.currency }}</li>
            </ul>
            <img id="raceTypeImg" :src="require('./../assets/race-type/race-type-'+ this.showRace[0].race_type +'.svg')" alt="">
          </div>
          <!-- /race info container-bottom -->

          <!-- runners info -->
          <div class="runnerContainer" v-for="(runner,index) in this.showRace[0].runners" :key="index">

            <img class="silks" v-if="runner.silk != '' " :src="require('./../assets/silks/'+ runner.silk)" alt="">
            <span class="name">{{ runner.name }}</span>
            <div>
              <span class="odds">
                <a :href="'http://www.racebets.com/bet/'+ this.showRace[0].id_race">
                  <button>{{ runner.odds }}</button> 
                </a>
              </span>
            </div>
          </div>
          <!-- /runners info -->
        </div>
        <div v-else>
          <p>no race available!</p>
        </div>
      </div>
    </div>
    <!-- /next race widget -->

  </div>
</template>

<script>
import json from './../../public/next_races.json';
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
  components:{
    VueCountdown,
  },
  data() {
    return {
        races: json, 
        checkedTypes: ["G","T","J"],
        selectedRaces:[],
        showRace:[],   
    };
  },
  beforeMount(){

    // currency converter
    let gbpToEur = 1.18;

    for(let i = 0; i < this.races.data.races.length; i++){
      if(this.races.data.races[i].purse.currency == "GBP"){
        this.races.data.races[i].purse.currency = "EUR";
        this.races.data.races[i].purse.amount = this.races.data.races[i].purse.amount * gbpToEur;
      }
    }
    // /currency converter


    this.showRaces();
  },
  methods: {
    showRaces() {
    
    // selected races based on active filters
    this.selectedRaces = [];
    for(let i = 0; i < this.races.data.races.length; i++){
      if(this.checkedTypes.includes(this.races.data.races[i].race_type)){
        this.selectedRaces.push(this.races.data.races[i])
      }
    }

    // /selected races based on active filters

    console.log("selected races", this.selectedRaces);
    console.log("selected races length", this.selectedRaces.length);

    // detect selected race with highest purse amount
    this.selectedRaces.sort((a, b) => b.purse.amount - a.purse.amount );

    this.showRace = [];
    this.showRace.push(this.selectedRaces[0]);

    console.log("displayed race", this.showRace[0]);
    console.log("displayed race purse amount", this.showRace[0].purse.amount);
    // /detect selected race with highest purse amount

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../assets/stylesheets/NextRaceWidget.css';
</style>