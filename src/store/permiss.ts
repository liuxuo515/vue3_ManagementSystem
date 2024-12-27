import { defineStore } from "pinia";

interface ObjectList {
  [key: string]: string[];
}
let defaultList = [];

export const usePermissStore = defineStore("permiss", {
  state: () => {
    let rolePerData = JSON.parse(localStorage.getItem("rolePerData"));
    if (rolePerData != null && rolePerData != undefined) {
      defaultList = rolePerData;
    }
    return {
      key: defaultList,
    };
  },
  actions: {
    handleSet(val: string[]) {
      this.key = val;
    },
  },
});
