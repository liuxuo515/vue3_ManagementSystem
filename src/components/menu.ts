import { Menus } from "@/types/menu";

let menuDataAll: Menus[] = [
  {
    id: "0",
    title: "首页",
    index: "/dashboard",
    icon: "Odometer",
  },
  {
    id: "2",
    title: "系统管理",
    index: "2",
    icon: "HomeFilled",
    children: [
      {
        id: "21",
        pid: "2",
        index: "/system-user",
        title: "用户管理",
      },
      {
        id: "22",
        pid: "2",
        index: "/system-role",
        title: "角色管理",
      },
      {
        id: "23",
        pid: "2",
        index: "/system-menu",
        title: "菜单管理",
      },
    ],
  },
];

export const menuData: Menus[] = menuDataAll;
