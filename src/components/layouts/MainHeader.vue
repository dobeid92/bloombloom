<template>
  <header id="main-content-header" :class="headerClasses" style="height: 40px">
    <div class="flex justify-between items-center w-full">
      <button
        class="leading-zero focus:outline-none relative text-gray-900 cursor-pointer hover:underline w-full sm:w-32 px-4 py-2 border-r border-gray-900"
        id="menu-sidebar-btn"
        @mouseenter="openSidebar"
      >
        MENU
      </button>
      <img src="/assets/images/logo.png"/>
      <div></div>
    </div>
  </header>
</template>
<script>
import * as $ from 'jquery';
export default {
  data: function () {
    return {};
  },
  mounted: function () {
    let _this = this;
    $(document).on('mousemove', function (event) {
      let sidebarEl = document.getElementById('main-sidebar');
      let sidebarBtnEl = document.getElementById('menu-sidebar-btn');
      if (
        !_this.isEventInsideElement(event, sidebarEl) &&
        !_this.isEventInsideElement(event, sidebarBtnEl) 
      ) {
        _this.closeSidebar();
      }
    });
  },
  methods: {
    openSidebar: function () {
      let sidebarEl = document.getElementById('main-sidebar');
      sidebarEl.style.left = '0px';
    },
    closeSidebar: function () {
      let sidebarEl = document.getElementById('main-sidebar');
      this.$store.state.subMenuView = false;
      sidebarEl.style.left = '-350px';
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
  },
  computed: {
    headerClasses: function () {
      var theme =
        'bg-white text-white shadow w-full h-header-custom fixed z-50 left-0 top-0';
      return theme;
    },
  },
};
</script>
