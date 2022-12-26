<template>
  <aside id="main-sidebar" :class="sidebarClasses" :style="sidebarStyles">
    <div class="flex justify-start w-full h-full">
      <div
        class="flex flex-col items-start border-r border-gray-900 h-full"
        style="width: 350px"
      >
        <div
          class="capitalize flex justify-between items-center border border-gray-900 px-4 py-6 w-full cursor-pointer hover:bg-black hover:text-white"
          v-for="(item, index) in items"
          :key="index"
          @mouseenter="showSubmenu(item)"
          @mouseleave="closeSubmenu"
        >
          <div>{{ item.name }}</div>
          <div v-if="item.subItems && item.subItems.length > 0">></div>
        </div>
      </div>
      <div
        id="sidebar-sub-menu"
        class="flex flex-col items-start border-r border-gray-900 h-full"
        style="width: 350px"
        v-if="$store.state.subMenuView"
      >
        <div
          class="capitalize flex justify-between items-center border border-gray-900 px-4 py-6 w-full cursor-pointer hover:bg-black hover:text-white"
          v-for="(item, index) in subItems.items"
          :key="index"
          @click="changeCollectionType(subItems.name, item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data: function () {
    return {
      items: [
        { name: 'spectacles', subItems: ['women', 'men'] },
        { name: 'sunglasses', subItems: ['women', 'men'] },
        { name: 'home try on' },
        { name: 'pair for pair' },
      ],
      subItems: [],
    };
  },
  methods: {
    showSubmenu: function (item) {
      if (!item.subItems) {
        return;
      }
      this.$store.state.subMenuView = true;
      this.subItems = {
        name: item.name,
        items: item.subItems,
      };
    },
    closeSubmenu: function (event) {
      let sidemenu = document.getElementById('sidebar-sub-menu');
      if (event && this.isEventInsideElement(event, sidemenu)) {
        return;
      }
      this.$store.state.subMenuView = false;
      this.subItems = {
        name: '',
        items: [],
      };
    },
    isEventInsideElement: function (event, element) {
      if (element == null) return false;
      let boundingBox = element.getBoundingClientRect();
      return (
        event.clientX >= boundingBox.left &&
        event.clientX <= boundingBox.right &&
        event.clientY >= boundingBox.top &&
        event.clientY <= boundingBox.bottom
      );
    },
    changeCollectionType: function (name, item) {
      this.$store.commit('updateCollectionType', { name: name, item: item });
      let sidebarEl = document.getElementById('main-sidebar');
      sidebarEl.style.left = '-350px';
      this.closeSubmenu();
    },
  },
  computed: {
    sidebarClasses: function () {
      var theme = 'bg-white fixed h-full z-40 left-0 top-0';
      return theme;
    },
    sidebarStyles: function () {
      let theme = '';
      theme += ' transition: 0.5s;';
      theme += ' left: -350px;';
      theme += ' margin-top: 40px;';
      return theme;
    },
  },
};
</script>
