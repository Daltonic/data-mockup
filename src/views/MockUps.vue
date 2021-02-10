<template>
  <b-container>
    <!-- User Interface controls -->
    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
              <b-input-group-prepend>
              <b-button variant="danger" v-b-modal.add-row-modal>Add Mockup</b-button>
            </b-input-group-prepend>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="type">type</b-form-checkbox>
            <b-form-checkbox value="tag">Tags</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      class="shadow-lg rounded border-0"
      stacked="md"
      show-empty
      :busy="loading"
      @filtered="onFiltered"
    >
      <template #cell(type)="row">
        {{ row.value }}
      </template>

      <template #cell(tags)="row">
        <b-tag
          v-for="tag in row.value"
          :key="tag"
          class="text-capitalize"
          >{{ tag }}</b-tag
        >
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #empty="scope">
        <h4 class="lead text-center">
          😔 <br />
          {{ scope.emptyText }}
        </h4>
      </template>

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="editRow(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Edit
        </b-button>
        <b-button
          size="sm"
          @click="remRow(row.index, $event.target)"
          class="mr-1"
          variant="danger"
        >
          Remove
        </b-button>
      </template>
    </b-table>

    <b-modal id="add-row-modal" centered title="Add New Row">
      <b-container fluid>
        <b-row>
          <b-col cols md="12" class="my-3">
            <b-form-input
              required
              v-model.trim="item.type"
              placeholder="Column Name"
            ></b-form-input>
          </b-col>
          <b-col cols md="12" class="my-3">
              <b-form-tags
              required
              v-model="item.tags"
              placeholder="Field Tags"
              max="5"
            ></b-form-tags>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer="{ cancel }">
        <b-button @click="cancel()"> Cancel </b-button>
        <b-button variant="success" @click="addRow()"> Add Row </b-button>
      </template>
    </b-modal>
    <b-modal id="edit-row-modal" centered title="Update Row Data">
      <b-container fluid>
        <b-row>
          <b-col cols md="12" class="my-3">
            <b-form-input
              required
              v-model.trim="item.type"
              placeholder="Data Type"
            ></b-form-input>
          </b-col>
          <b-col cols md="12" class="my-3">
              <b-form-tags
              required
              v-model="item.tags"
              placeholder="field tags"
              max="5"
            ></b-form-tags>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer="{ cancel }">
        <b-button @click="cancel()"> Cancel </b-button>
        <b-button variant="success" @click="updateRow(item)">
          Update Row
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      item: {tags: [], type: "", index: ''},
      items: [],
      fields: [
        {
          key: "type",
          label: "Data Type",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "tags", label: "Tags", sortable: true, class: "text-center" },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addRow() {
      this.items.unshift({ ...this.item });
      this.onReset();
      this.$bvModal.hide("add-row-modal");
    },
    remRow(index) {
      this.items.splice(index, 1);
    },
    editRow(item, index) {
      item.index = index;
      this.item = item;
      this.$bvModal.show("edit-row-modal");
    },
    updateRow(item) {
      this.item[item.index] = item;
      this.$bvModal.hide("edit-row-modal");
    },
    onReset() {
      this.item.type = "";
      this.item.tags = [];
      this.item.index = "";
    },
  },
};
</script>