<template>
  <div style="height: 100vh">
    <!-- <transition name="fade-hide-in">
      <dt-loading-full v-if="loading" />
    </transition> -->
    <transition name="fade-hide-in">
      <MainHeader></MainHeader>
    </transition>
    <section
      id="main-content"
      :class="mainContentClasses"
      v-if="!loading"
      style="min-height: calc(100vh - 40px)"
    >
      <transition name="fade-hide-in">
        <MainSidebar></MainSidebar>
      </transition>
      <aside :class="contentClasses" style="margin-top: 40px">
        <Collections></Collections>
      </aside>
    </section>
  </div>
</template>

<script>
import MainHeader from '../../components/layouts/MainHeader';
import MainSidebar from '../../components/layouts/MainSidebar';
import Collections from '../pages/CollectionsPage';
export default {
  components: {
    MainHeader,
    MainSidebar,
    Collections,
  },
  data: function () {
    return {
      loading: false,
    };
  },
  mounted: function(){
    this.fetchCollections();
  },
  methods:{
    fetchCollections: function(){
      return fetch(
        `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections`,
        {
          credentials: 'same-origin',
        }
      )
        .then((response) => response.json())
        .then((result) => {
          this.loading = false;
          return result;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  computed: {
    mainContentClasses: function () {
      var theme =
        'flex justify-center flex-no-wrap relative main-content-full main-content-remove-top';

      return theme;
    },
    contentClasses: function () {
      var theme = 'relative w-full';
      return theme;
    },
  },
};
</script>
