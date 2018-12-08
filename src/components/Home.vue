<template>
	<div>
		<h2><v-icon>home</v-icon>HOME</h2>
<div class="wrap-charts">
  <h2>Статистика навчання</h2>
  <div id="chart">
      <apexchart type=line height=350 :options="chartOptions" :series="series" />
    </div>
    <div id="chart">
      <apexchart type=line height=350 :options="chartOptions" :series="series" />
    </div>
</div>
   
  </v-form>
	</div>
	
</template>

<script>
  import firebase from '../shared/firebase';
import VueApexCharts from "vue-apexcharts";


  export default {
    name: 'Home',
    components: {
          apexcharts: VueApexCharts
    },
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      series: [
          {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33]
          },
          {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13]
          }
        ],
        chartOptions: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Оцінки',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            style: 'inverted',
            size: 6
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'Temperature'
            },
            min: 5,
            max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        }
    }),
    methods: {
    	
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .apexcharts-canvas {
    color: #000;
    background: #fff;
  }

  .wrap-charts {
    max-width: 100%;
    width: 1220px;
    margin: 0 auto;
    padding: 20px 15px 50px 15px;
    display: flex;
    flex-wrap: wrap;

    > * {
      width: 46%;
      margin: 0 2% 0 0;
    }
  }

@media screen and (max-width: 768px) {
    .wrap-charts {
    padding:  20px 15px 50px 15px;
    > * {
      width: 100%;
      margin: 0;
    }
  }
}
</style>