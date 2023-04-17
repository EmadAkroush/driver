<template>
  <CChart
    type="bar"
    :data="data"
    :options="options"
    @get-dataset-at-event="aa"
    @get-element-at-event="aa"
    @get-elements-at-event="aa"
  />
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: 'MainChartExample',
  components: {
    CChart,
  },
  setup() {
    const data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Motorcycles',
          backgroundColor: '#ffa600',
          order: 1,
          data: Array(12)
            .fill()
            .map(() => random(3000, 7000)),
        },
        {
          label: 'Car',
          backgroundColor: '#ff6361',
          order: 1,
          data: Array(12)
            .fill()
            .map(() => random(50000, 70000)),
        },
        {
          label: 'Bus',
          backgroundColor: '#bc5090',
          order: 1,
          data: Array(12)
            .fill()
            .map(() => random(3000, 7000)),
        },
        {
          label: 'Truck',
          backgroundColor: '#58508d',
          order: 1,
          data: Array(12)
            .fill()
            .map(() => random(3000, 7000)),
        },
        {
          label: 'Violations',
          type: 'line',
          pointRadius: 3,
          //pointBorderColor: 'rgb(0, 0, 0)',
          borderColor: 'rgba(0,63,92,0.7)',
          backgroundColor: 'rgba(0,63,92,0.7)',
          order: 0,
          data: Array(12)
            .fill()
            .map(() => random(5000, 10000)),
        },
      ],
    }

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    }

    return {
      data,
      options,
    }
  },
  methods: {
    aa(value, value2) {
      console.log(value)
      console.log(value2)
    },
  },
}
</script>
