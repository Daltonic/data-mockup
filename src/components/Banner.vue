<template>
  <div class="banner">
    <b-container class="banner__contents">
      <h1 class="banner__title">Mock It Till You Make It</h1>
      <div class="banner__buttons">
        <button class="banner__button">Log In</button
        ><button class="banner__button">Sign Up</button>
      </div>
      <h1 class="banner__description">
        Wealth, lust, and betrayal set in the backdrop of Regency era England,
        seen through the eyes of the powerful Bridgerton family.
      </h1>
    </b-container>
    <div class="banner__fadeBottom"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
  color: rgba(0, 0, 0, 0.5);;
  object-fit: contain;
  height: 448px;
  background-size: cover;
  background-image: url(https://cdn.pixabay.com/photo/2017/07/08/11/33/white-2484120_960_720.png);
  background-position: center center;
}

.banner__contents {
  padding-top: 140px;
  height: 190px;
}

.banner__fadeBottom {
  height: 16.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgb(255 255 255 / 61%),
    #fff
  );
}

.banner__title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}

.banner__button {
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  margin-right: 1rem;
  padding: 0.5rem 2rem;
  background-color: rgba(51, 51, 51, 0.5);
}

.banner__button:hover {
    color: #000;
    background-color: rgba(255, 0, 0, 0.5);
    transition: all .2s;
}

.banner__description {
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.9rem;
  max-width: 360px;
  height: 80px;
}
</style>