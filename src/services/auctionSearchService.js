import store from "@/storage/store";
import { getFile } from "blockstack";

const auctionSearchService = {
  getUserAuctions: function(username, success, failure) {
    const auctionsRootFileName = store.state.constants.auctionsRootFileName;
    getFile(auctionsRootFileName, { decrypt: false, username: username })
      .then(function(file) {
        if (file) {
          let rootFile = JSON.parse(file);
          success(rootFile.records);
        }
      })
      .catch(function() {
        failure({
          ERR_CODE: "AUCTIONS_1",
          message: "Error fetching users auctions!"
        });
      });
  },

  getUsersOnlineAuction: function(username) {
    return new Promise((resolve, reject) => {
      /**
      store
        .dispatch("userProfilesStore/fetchUserProfile", { username: username })
        .then(function() {
          let gaiaUrl = store.getters["userProfilesStore/getGaiaUrl"](username);
          if (!gaiaUrl) {
            resolve();
            return;
          }
          xhrService
            .makeDirectCall(gaiaUrl + "auctions_v01.json")
            .then(function(rootFile) {
              resolve(rootFile.records);
            })
            .catch(function() {
              reject(new Error({ error: 1, message: "no auctions found" }));
            });
        });
    });
    **/
      const auctionsRootFileName = store.state.constants.auctionsRootFileName;
      getFile(auctionsRootFileName, { decrypt: false, username: username })
        .then(function(file) {
          if (file) {
            let rootFile = JSON.parse(file);
            resolve(rootFile.records);
          }
        })
        .catch(function() {
          reject(new Error({ error: "AUCTIONS_1", message: "Error fetching users auctions" }));
        });
    });
  }
};
export default auctionSearchService;
