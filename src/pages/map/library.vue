<template>
  <div class="main-container">
    <div class="main">
      <h2>折线图</h2>
      <ve-line :data="lineData" :extend="extend"></ve-line>
    </div>

    <div class="main">
      <h2>柱状图</h2>
      <ve-histogram :data="lineData" :extend="extend"></ve-histogram>
    </div>

    <div class="main">
      <h2>条形图</h2>
      <ve-bar :data="lineData" :extend="extend"></ve-bar>
    </div>

    <div class="main">
      <h2>饼图</h2>
      <ve-pie :data="lineData"></ve-pie>
    </div>

    <div class="main">
      <h2>环图</h2>
      <ve-ring :data="lineData"></ve-ring>
    </div>

    <div class="main">
      <h2>瀑布图</h2>
      <ve-waterfall :data="lineData"></ve-waterfall>
    </div>

    <div class="main">
      <h2>漏斗图</h2>
      <ve-funnel :data="lineData"></ve-funnel>
    </div>

    <div class="main">
      <h2>雷达图</h2>
      <ve-radar :data="lineData"></ve-radar>
    </div>

    <div class="main">
      <h2>地图</h2>
      <ve-funnel :data="lineData"></ve-funnel>
    </div>

    <div class="main">
      <h2>桑基图</h2>
      <ve-sankey :data="sankeyData" :settings="chartSettings"></ve-sankey>
    </div>

    <div class="main">
      <h2>热力图</h2>
      <ve-heatmap :data="lineData"></ve-heatmap>
    </div>

    <div class="main">
      <h2>散点图</h2>
      <ve-scatter :data="lineData"></ve-scatter>
    </div>

    <div class="main">
      <h2>K线图</h2>
      <ve-candle :data="candleData"></ve-candle>
    </div>

    <div class="main">
      <h2>仪表盘</h2>
      <ve-gauge :data="lineData"></ve-gauge>
    </div>

    <div class="main">
      <h2>树图</h2>
      <ve-tree :data="treeData"></ve-tree>
    </div>

    <div class="main">
      <h2>水球图</h2>
      <ve-liquidfill :data="liquidData"></ve-liquidfill>
    </div>

    <div class="main">
      <h2>词云图</h2>
      <ve-wordcloud :data="wordCloudData"></ve-wordcloud>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    const treeDataMap = {
      name: 'f',
      value: 1,
      link: 'https://ele.me',
      children: [
        {
          name: 'a',
          value: 1,
          link: 'https://ele.me',
          children: [
            {
              name: 'a-a',
              link: 'https://ele.me',
              value: 2
            },
            {
              name: 'a-b',
              link: 'https://ele.me',
              value: 2
            }
          ]
        },
        {
          name: 'b',
          value: 1,
          link: 'https://ele.me',
          children: [
            {
              name: 'b-a',
              link: 'https://ele.me',
              value: 2
            },
            {
              name: 'b-b',
              link: 'https://ele.me',
              value: 2
            }
          ]
        },
        {
          name: 'c',
          value: 3,
          link: 'https://ele.me',
          children: [
            {
              name: 'c-a',
              link: 'https://ele.me',
              value: 4
            },
            {
              name: 'c-b',
              link: 'https://ele.me',
              value: 2
            }
          ]
        },
        {
          name: 'd',
          value: 3,
          link: 'https://ele.me',
          children: [
            {
              name: 'd-a',
              link: 'https://ele.me',
              value: 4
            },
            {
              name: 'd-b',
              link: 'https://ele.me',
              value: 2
            }
          ]
        }
      ]
    }
    return {
      extend: {
        'xAxis.0.axisLabel.rotate': 45
      },
      lineData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          {'日期': '2019-03-10', '访问用户': 2000, '下单用户': 2200},
          {'日期': '2019-03-20', '访问用户': 5000, '下单用户': 4200},
          {'日期': '2019-03-25', '访问用户': 7000, '下单用户': 9200},
        ]
      },
      treeData: {
        columns: ['name', 'value'],
        rows: [{
          name: 'tree1',
          value: [treeDataMap]
        }]
      },
      liquidData: {
        columns: ['city', 'percent'],
        rows: [
          {
            city: 'ShangHai',
            percent: '0.7'
          }
        ]
      },
      wordCloudData: {
        columns: ['word', 'count'],
        rows: this.getWordCloudRows()
      },
      candleData: {
        columns: ['date', 'open', 'close', 'lowest', 'highest', 'vol'],
        rows: [
            { '日期': '2004-01-05', open: 10411.85, close: 10544.07, lowest: 10411.85, highest: 10575.92, vol: 221290000 },
            { '日期': '2004-01-06', open: 10543.85, close: 10538.66, lowest: 10454.37, highest: 10584.07, vol: 191460000 },
            { '日期': '2004-01-07', open: 10535.46, close: 10529.03, lowest: 10432.12, highest: 10587.55, vol: 225490000 },
            { '日期': '2004-01-08', open: 10530.07, close: 10592.44, lowest: 10480.59, highest: 10651.99, vol: 237770000 },
            { '日期': '2004-01-09', open: 10589.25, close: 10458.89, lowest: 10420.52, highest: 10603.48, vol: 223250000 },
            { '日期': '2004-01-12', open: 10461.55, close: 10485.18, lowest: 10389.85, highest: 10543.03, vol: 197960000 },
            { '日期': '2004-01-13', open: 10485.18, close: 10427.18, lowest: 10341.19, highest: 10539.25, vol: 197310000 },
            { '日期': '2004-01-14', open: 10428.67, close: 10538.37, lowest: 10426.89, highest: 10573.85, vol: 186280000 },
            { '日期': '2004-01-15', open: 10534.52, close: 10553.85, lowest: 10454.52, highest: 10639.03, vol: 260090000 },
            { '日期': '2004-01-16', open: 10556.37, close: 10600.51, lowest: 10503.71, highest: 10666.88, vol: 254170000 },
        ]
      },
      sankeyData: {
        columns: ['页面', '访问量'],
        rows: [
          { '页面': '首页', '访问量': 100000 },
          { '页面': '列表页a', '访问量': 20000 },
          { '页面': '列表页b', '访问量': 80000 },
          { '页面': '内容页a-1', '访问量': 10000 },
          { '页面': '内容页a-2', '访问量': 10000 },
          { '页面': '内容页b-1', '访问量': 60000 },
          { '页面': '内容页b-2', '访问量': 20000 }
        ]
      },
      chartSettings: {
        links: [
          { source: '首页', target: '列表页a', value: 0.5 },
          { source: '首页', target: '列表页b', value: 0.5 },
          { source: '列表页a', target: '内容页a-1', value: 0.1 },
          { source: '列表页a', target: '内容页a-2', value: 0.4 },
          { source: '列表页b', target: '内容页b-1', value: 0.2 },
          { source: '列表页b', target: '内容页b-2', value: 0.3 }
        ],
        dataType: ['KMB', 'percent']
      }
    }
  },
  computed: {

  },
  methods: {
    getWordCloudRows () {
      return [{
        'word': 'visualMap',
        'count': 1234
      },{
        'word': 'controller',
        'count': 4334
      },{
        'word': 'hello',
        'count': 4334
      },{
        'word': 'bike',
        'count': 4334
      },{
        'word': 'jsut',
        'count': 4334
      }]
    }
  }
}
</script>

<style>
  .mina-container {
    display: flex;
  }
  .main {
    /* flex: 1; */
    width: 400px;
    border: 1px solid #ddd;
    padding: 20px;
    display: inline-block;
  }
</style>
