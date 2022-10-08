<template>
  <div>
    <section class="col">
      <h3 class="heading-topic">
        <img src="@/assets/img/orizuru.png" alt="orizuru">
        <span class="topic-text">ノコス。</span>
      </h3>
      <p>目には見えない。でも、確かにそこに存在する”カタチ”がある。<br>
        地域の歴史・文化・伝統を記録し、残していきたい。</p>
    </section>
    <section class="col">
      <h3 class="heading-topic">
        <img src="@/assets/img/orizuru.png" alt="orizuru">
        <span class="topic-text">ツタエル。</span>
      </h3>
      <p>繋いできた”オモイ”を過去のものにしない。<br>
        今もこれからも、時代とともに”カタチ”は変わっても”オモイ”を伝えたい。</p>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.col {
  max-width: 500px;
  margin: 0 auto 50px;
  vertical-align: middle;
}

.heading-topic {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
}

.topic-text {
  margin-left: 10px;
}
</style>