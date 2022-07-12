<template>
  <div class="menuWrap">
    <div class="menuContent" v-for="(menuFirst, titleIndex) in menu">
      <div
        class="menuTitle"
        :class="menuFirst.state ? 'titleActive' : ''"
        @click="clickTitle(titleIndex)"
      >
        <span v-html="menuFirst.icon"></span>
        <span>{{ menuFirst.title }}</span>
        <span>
          <svg
            style="width: 20px; height: 20px"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </div>
      <template v-if="menuFirst.state == 1">
        <div
          @click="clickItem(titleIndex, itemIndex)"
          class="menuItem"
          v-for="(menuSecond, itemIndex) in menuFirst.children"
          :class="menuSecond.active ? 'itemActive' : ''"
        >
          <span></span>
          <span>{{ menuSecond.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "lin",
      menu: [
        {
          title: "自动化测试管理",
          icon: '<svg style="width:25px;height:25px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6 2.5a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 6h.21L5.25 9.08a2.5 2.5 0 0 0 .103 2.335l3.463 5.907a1.373 1.373 0 0 0 2.368 0l3.463-5.907a2.5 2.5 0 0 0 .102-2.335L13.29 6h.21A1.5 1.5 0 0 0 15 4.5v-2a.5.5 0 0 0-1 0v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zM12.184 6l1.662 3.509a1.5 1.5 0 0 1-.062 1.4L10.5 16.511v-5.645a1 1 0 1 0-1 0v5.645L6.216 10.91a1.5 1.5 0 0 1-.062-1.4L7.816 6h4.368z" fill="currentColor"></path></g></svg>',
          state: 0,
          children: [],
        },
        {
          title: "消息中转",
          icon: '<svg style="width:25px;height:25px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M924.3 338.4a447.57 447.57 0 0 0-96.1-143.3a443.09 443.09 0 0 0-143-96.3A443.91 443.91 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.08 444.08 0 0 0-141.7 96.5a445 445 0 0 0-95 142.8A449.89 449.89 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.72 447.72 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142c23.5-55.2 35.5-113.9 35.8-174.5c.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.4 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48z" fill="currentColor"></path></svg>',
          state: 1,
          children: [
            {
              name: "模板管理",
              active: true,
            },
            {
              name: "消息管理",
              active: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickTitle(titleIndex) {
      this.menu.forEach((item, index) => {
        if (index == titleIndex) {
          if (item.state == 1) {
            item.state = 0;
          } else {
            item.state = 1;
          }
        } else {
          item.state = 0;
        }
      });
    },
    clickItem(titleIndex, itemIndex) {
      this.menu.forEach((title, tIndex) => {
        title.children.forEach((item, iIndex) => {
          if (tIndex == titleIndex && iIndex == itemIndex) {
            if (item.active == false) {
              item.active = true;
            }
            this.$emit("changeMenu", { itemName: item.name });
          } else {
            item.active = false;
          }
        });
      });
    },
  },
};
</script>
<style scoped lang="less">
.menuWrap {
  .titleActive {
    color: white;
    span:nth-child(3) {
      transform: rotate(-90deg);
    }
  }
  .itemActive {
    color: white;
    background: #2f83e8;
  }
  font-size: 16px;
  color: #afb7be;
  background: #021422;
  width: 100%;
  height: 100vh;
  text-align: left;
  div {
    transition: 0.1s;
    padding: 10px 0px;
  }
  span {
    transition: 0.2s;
    transform-origin: 18px;
  }
  .menuTitle {
    &:hover {
      cursor: pointer;
    }
    span:nth-child(1),
    span:nth-child(3) {
      display: inline-block;
      width: 50px;
      height: 25px;
      text-align: center;
      position: relative;
      top: 5px;
    }
  }
  .menuItem {
    &:hover {
      cursor: pointer;
    }
    span:nth-child(1) {
      display: inline-block;
      width: 50px;
      height: 25px;
      text-align: center;
      position: relative;
      top: 5px;
    }
  }
}
</style>