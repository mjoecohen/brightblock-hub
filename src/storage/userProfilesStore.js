import _ from "lodash";

const userProfilesStore = {
  namespaced: true,
  state: {
    teamProfiles: [],
  },
  getters: {
    getTeamProfile: state => profileId => {
      let matches = state.teamProfiles.filter(
        profile => profile.id === profileId
      );
      if (matches.length > 0) {
        return matches[0];
      }
      return {
        data: {
          name: [{ text: "Unknown" }],
          jobtitle: [{ text: "Unknown" }],
          jobdescription: [{ text: "Unknown" }],
          avatar: {
            url: require("@/assets/img/faces/avatar.jpg")
          }
        }
      };
    }
  },
  mutations: {
    addTeamProfile(state, profile) {
      let index = _.findIndex(state.teamProfiles, function(o) {
        return o.id === profile.id;
      });
      if (index === -1) {
        state.teamProfiles.push(profile);
      }
    }
  },
  actions: {}
};
export default userProfilesStore;
