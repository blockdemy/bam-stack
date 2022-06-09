<template>
  <div>
    <section class="hero is-primary is-flex-mobile">
      <div class="hero-body">
        <h1 class="hero-title">thanks for use BAM Test</h1>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.hero {
  .hero-body {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    height: 640px;
    padding: 168px 160px;
    background-image: url('../assets/images/background-img.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .hero-title {
    font-weight: 900;
    font-size: 3.6rem;
    line-height: 1.33;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    max-width: 680px;
    padding-bottom: 10px;
  }

  .hero-text {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.7;
    letter-spacing: 0.032em;
    max-width: 411px;
    margin-bottom: 50px;
  }

  .quote-button {
    display: inline-block;
    cursor: pointer;
  }
}

a {
  width: 100%;
}

.card-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 2.8rem;
  line-height: 1.2;
  margin-bottom: 48px;

  .title-margin {
    margin-right: 20px;

    .arrow-position {
      position: relative;

      .arrow-icon {
        position: absolute;
        top: 4px;
        right: -40px;
      }
    }
  }
}

.card-text {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: 0.008em;
  max-width: 390px;
}

hr {
  height: 4px;
  width: 72px;
  margin: 0 0 32px 0;
}

@mixin card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: opacity 0.25s;
  transition: opacity 0.25s;
}

@media (max-width: $desktop-size) {
  .hero {
    .hero-body {
      padding: 121px 97px;
    }
    .hero-title {
      font-size: 3rem;
      max-width: 585px;
    }
  }
}

@media (max-width: $mobile-size) {
  .hero {
    .hero-body {
      padding: 75px 34px;
      text-align: left;
      width: 100%;
      height: 500px;
    }

    .hero-title {
      font-size: 2.5rem;
      letter-spacing: 0.03em;
      max-width: 490px;
    }
  }

  .card-title {
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 34px;

    .title-margin {
      margin-right: 10px;

      .arrow-position {
        position: relative;

        .arrow-icon {
          position: absolute;
          transform: scale(0.65);
          top: -1px;
          right: -33px;
        }
      }
    }
  }
}
</style>
