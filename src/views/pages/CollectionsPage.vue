<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-wrap justify-start items-center">
      <div class="w-full sm:w-6/12 md:w-4/12 border border-gray-900 h-16"></div>
      <div
        class="capitalize w-full sm:w-6/12 md:w-4/12 border border-gray-900 h-16 flex justify-center items-center text-2xl font-bold"
      >
        {{ activeCollectionType.name.toUpperCase() }}
      </div>
      <div
        class="w-full sm:w-6/12 md:w-4/12 border border-gray-900 h-16 flex justify-start items-center"
      >
        <div
          class="w-4/12 border-r border-gray-900 h-full flex justify-center items-center cursor-pointer hover:bg-gray-200"
          @click="toggleColorsFilterList"
        >
          COLOUR
        </div>
        <div
          class="w-4/12 border-r border-gray-900 h-full flex justify-center items-center cursor-pointer hover:bg-gray-200"
          @click="toggleShapesFilterList"
        >
          SHAPE
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-center items-center h-10"
      v-if="colorFilterEnabled"
    >
      <div
        class="hover:bg-gray-200 hover:rounded cursor-pointer px-2"
        @click="addToAppliedFilter(filter, 'colors')"
        v-for="(filter, index) in colorsFilterList"
        :key="index"
      >
        {{ filter }}
      </div>
    </div>
    <div
      class="w-full flex justify-center items-center h-10"
      v-if="shapeFilterEnabled"
    >
      <div
        class="hover:bg-gray-200 hover:rounded cursor-pointer px-2"
        @click="addToAppliedFilter(filter, 'shapes')"
        v-for="(filter, index) in shapesFilterList"
        :key="index"
      >
        {{ filter }}
      </div>
    </div>
    <div
      class="w-full h-10 flex justify-start items-center px-2 border border-gray-900"
      v-if="appliedFilters.length > 0"
    >
      <div class="mx-2" v-for="(filter, index) in appliedFilters" :key="index">
        <div
          class="flex justify-start items-center px-2 -mx-1 bg-gray-100 rounded"
        >
          <div class="mx-1">{{ filter.name }}</div>
          <div
            class="mx-1 cursor-pointer"
            @click="removeFromAppliedFilters(index)"
          >
            <img src="/assets/images/close.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-wrap justify-start items-stretch">
      <div
        class="w-full sm:w-6/12 md:w-4/12 flex flex-col items-center h-auto border border-gray-900 relative"
        v-for="(item, index) in glasses"
        :key="index"
        v-show="glasses.length > 0"
      >
        <div class="absolute p-4 top-0">{{ item.name }}</div>
        <img
          :src="item.glass_variants[0].media[0].url"
          style="max-width: 100%; height: auto"
        />
      </div>
      <div class="w-full flex justify-center items-center" v-if="loading">
        <!-- <loading-full /> -->
        <img src="/assets/images/Loading_icon.gif" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// import LoadingFull from '../../components/basic/LoadingFull.vue';
export default {
  components: {
    // 'loading-full': LoadingFull,
  },
  data: function () {
    return {
      loading: false,
      glasses: [],
      totalCount: 0,
      pageLimit: 12,
      pageNumber: 1,
      colorFilterEnabled: false,
      shapeFilterEnabled: false,
      colorsFilterList: [
        'black',
        'tortoise',
        'coloured',
        'crystal',
        'dark',
        'bright',
      ],
      shapesFilterList: ['square', 'rectangle', 'round', 'cat-eye'],
      appliedFilters: [],
    };
  },
  mounted: async function () {
    this.fetchSpectacles();
    window.addEventListener('scroll', async () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        if (this.loading || this.glasses.length >= this.totalCount) {
          return;
        }
        this.pageNumber++;
        this.fetchSpectacles();
      }
    });
  },
  methods: {
    fetchSpectacles: function () {
      this.loading = true;
      let filters = '';
      this.appliedFilters.forEach((filter) => {
        filters += `&filters[${
          filter.type == 'colors'
            ? 'glass_variant_frame_variant_colour_tag_configuration_names'
            : 'glass_variant_frame_variant_frame_tag_configuration_names'
        }][]=${filter.name}`;
      });
      return fetch(
        `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${this.activeCollectionType.id}/glasses?page[limit]=${this.pageLimit}&page[number]=${this.pageNumber}${filters}`,
        {
          credentials: 'same-origin',
        }
      )
        .then((response) => response.json())
        .then((results) => {
          this.loading = false;
          this.glasses.push(...results.glasses);
          this.totalCount = results.meta.total_count;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toggleColorsFilterList: function () {
      this.colorFilterEnabled = !this.colorFilterEnabled;
    },
    toggleShapesFilterList: function () {
      this.shapeFilterEnabled = !this.shapeFilterEnabled;
    },
    addToAppliedFilter: function (filter, type) {
      this.appliedFilters.push({ name: filter, type: type });
      this.glasses = [];
      this.totalCount = 0;
      this.pageNumber = 1;
      this.fetchSpectacles();
    },
    removeFromAppliedFilters: function (index) {
      this.appliedFilters.splice(index, 1);
      this.glasses = [];
      this.totalCount = 0;
      this.pageNumber = 1;
      this.fetchSpectacles();
    },
  },
  computed: {
    ...mapState(['activeCollectionType']),
  },
  watch: {
    activeCollectionType: function () {
      this.appliedFilters = [];
      this.glasses = [];
      this.totalCount = 0;
      this.pageNumber = 1;
      this.fetchSpectacles();
    },
  },
};
</script>
