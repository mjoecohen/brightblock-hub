<template>
<!--Navbar-->
<mdb-navbar class="indigo" dark>
  <!-- Navbar brand -->
  <mdb-navbar-brand href="/">
    BrightBlock Auctions
  </mdb-navbar-brand>
  <mdb-navbar-toggler>
    <mdb-navbar-nav>
      <mdb-nav-item href="#" active>Home</mdb-nav-item>
      <mdb-nav-item href="#">Features</mdb-nav-item>
      <mdb-nav-item href="#">Pricing</mdb-nav-item>
      <!-- Dropdown -->
      <mdb-dropdown tag="li" class="nav-item">
        <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
        <mdb-dropdown-menu>
          <mdb-dropdown-item>Action</mdb-dropdown-item>
          <mdb-dropdown-item>Another action</mdb-dropdown-item>
          <mdb-dropdown-item>Something else here</mdb-dropdown-item>
        </mdb-dropdown-menu>
      </mdb-dropdown>
    </mdb-navbar-nav>
    <mdb-navbar-nav class="ml-auto nav-flex-icons">
      <mdb-nav-item href="#" v-if="!loggedIn">
        <i class="material-icons">fingerprint</i>
        <p><a href="#/login" class="dropdown-item">Login</a></p>
      </mdb-nav-item>
      <mdb-dropdown tag="li" class="nav-item" v-else>
        <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed><p><span v-html="avatar"></span></p></mdb-dropdown-toggle>
        <mdb-dropdown-menu>
          <mdb-dropdown-item>
            <a class="dropdown-item">{{ username }}</a>
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/admin/registrations"
              v-if="showAdmin"
              >Admin</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/my-artworks"
              >My Art Work</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/my-artwork/upload"
              >Upload Artwork</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/online-auctions"
              >Online Auctions</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/my-auctions"
              >My Auctions</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/my-auctions/upload"
              >New Auction</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <router-link
              class="dropdown-item"
              to="/account/userData"
              >My Account</router-link
            >
          </mdb-dropdown-item>
          <mdb-dropdown-item>
            <a
              href="#"
              class="dropdown-item"
              @click.prevent="logout"
              ><i class="material-icons">fingerprint</i> Logout</a
            >
          </mdb-dropdown-item>
        </mdb-dropdown-menu>
      </mdb-dropdown>
    </mdb-navbar-nav>
    <!-- Search form -->
    <form class="form-inline" v-if="showSearch">
      <input v-model="query" type="text" v-on:keyup.13="doSearch"/>
    </form>
  </mdb-navbar-toggler>
</mdb-navbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import myAccountService from "@/services/myAccountService";

export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      showSearch: false,
      query: null
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    },
    showAdmin() {
      return this.$store.state.myAccountStore.myProfile.showAdmin;
    },
    username() {
      return this.$store.state.myAccountStore.myProfile.name;
    },
    avatar() {
      let myProfile = this.$store.getters["myAccountStore/getMyProfile"];
      if (myProfile.loggedIn) {
        return (
          '<img style="width: 40px; height: 40px; border-radius: 20px;" src="' +
          myProfile.avatarUrl +
          '"/>'
        );
      } else {
        return '<span class="icon-user"></span>';
      }
    },
    loggedIn() {
      let myProfile = this.$store.getters["myAccountStore/getMyProfile"];
      return myProfile.loggedIn;
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    doSearch() {
      if (!this.query) {
        this.query = "*";
      }
      this.$router.push("/search?query=" + this.query);
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      myAccountService.logout();
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
