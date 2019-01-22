import Vue from "vue";
import Router from "vue-router";

import BrightBlock from "./views/BrightBlock.vue";
import TeamProfile from "./views/TeamProfile.vue";
import Navbar1 from "./layout/Navbar1.vue";
import MainFooter from "./layout/MainFooter.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: BrightBlock,
        header: Navbar1,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/profile/team/:profileId",
      name: "teamProfile",
      components: {
        default: TeamProfile,
        header: Navbar1,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
