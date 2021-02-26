<template>
  <b-container class="mt-6">
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
              <b-button variant="danger" v-b-modal.add-row-modal
                >Add Mockup</b-button
              >
            </b-input-group-prepend>
            <b-form-input
              id="filter-input"
              v-model="filter"
              row="search"
              placeholder="row to Search"
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
            <b-form-checkbox value="row">row</b-form-checkbox>
            <b-form-checkbox value="tag">col</b-form-checkbox>
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
      <template #cell(row)="row">
        {{ row.value }}
      </template>

      <template #cell(col)="col">
        {{ col.value }}
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
        <b-button size="sm" @click="editRow(row.item)" class="mr-1">
          Edit
        </b-button>
        <b-button
          size="sm"
          @click="remRow(row.item)"
          class="mr-1"
          variant="danger"
        >
          Remove
        </b-button>
      </template>
    </b-table>

    <b-modal
      id="add-row-modal"
      hide-footer
      no-close-on-backdrop
      centered
      title="Add Mockup"
    >
      <b-overlay :show="requesting" rounded="sm">
        <b-form @submit.prevent="onSubmit" class="container-fluid">
          <b-row>
            <b-col>
              <b-form-input
                required
                v-model.trim="item.col"
                placeholder="Column Name"
              ></b-form-input>
            </b-col>
            <b-col>
              <b-form-input
                required
                v-model.trim="item.row"
                placeholder="Row Name"
              ></b-form-input>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-button
                size="sm"
                type="button"
                variant="secondary"
                class="mr-1"
                @click="$bvModal.hide('add-row-modal')"
                >Cancel</b-button
              >
              <b-button
                :disabled="requesting || !valid"
                size="sm"
                type="submit"
                variant="danger"
                >Add Row</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-overlay>
    </b-modal>

    <b-modal
      id="edit-row-modal"
      hide-footer
      no-close-on-backdrop
      centered
      title="Update Mockup"
    >
      <b-overlay :show="requesting" rounded="sm">
        <b-form @submit.prevent="onUpdate" class="container-fluid">
          <b-row>
            <b-col>
              <b-form-input
                required
                v-model.trim="item.col"
                placeholder="Column Name"
              ></b-form-input>
            </b-col>
            <b-col>
              <b-form-input
                required
                v-model.trim="item.row"
                placeholder="Row Name"
              ></b-form-input>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-button
                size="sm"
                type="button"
                variant="secondary"
                class="mr-1"
                @click="$bvModal.hide('edit-row-modal')"
                >Cancel</b-button
              >
              <b-button
                :disabled="requesting || !valid"
                size="sm"
                type="submit"
                variant="danger"
                >Update Row</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-overlay>
    </b-modal>
  </b-container>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
export default {
  data() {
    return {
      loading: false,
      requesting: false,
      item: { col: "", row: "", key: "" },
      items: [],
      fields: [
        {
          key: "col",
          label: "Column",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "row", label: "Row", sortable: true, class: "text-center" },
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
  created() {
    this.getRows();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getRows() {
      const mockupsRef = firebase.database().ref("/mockups");
      const items = [];
      this.loading = true;
      mockupsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          items.push({ ...data, key });
        });
        this.items = items;
        this.totalRows = this.items.length;
        this.loading = false;
      });
    },
    onSubmit() {
      this.requesting = true;
      const mockupsRef = firebase.database().ref("/mockups");
      mockupsRef.push(this.item).then((data) => {
        this.item.key = data.key;
        this.items.push({ ...this.item });
        this.onReset();
        this.$bvModal.hide("add-row-modal");
        this.requesting = false;
      });
    },
    remRow(item) {
      const mockupsRef = firebase.database().ref("/mockups");
      mockupsRef
        .child(item.key)
        .remove()
        .then(() => {
          const index = this.items.findIndex((i) => i.key == item.key);
          this.items.splice(index, 1);
        });
    },
    editRow(item) {
      this.item = { ...item };
      this.$bvModal.show("edit-row-modal");
    },
    onUpdate() {
      this.requesting = true;
      const mockupsRef = firebase.database().ref("/mockups");
      mockupsRef
        .child(this.item.key)
        .set(this.item)
        .then(() => {
          const index = this.items.findIndex((i) => i.key == this.item.key);
          this.items[index] = { ...this.item };
          this.items = [...this.items];
          this.onReset();
          this.$bvModal.hide("edit-row-modal");
          this.requesting = false;
        });
    },
    onReset() {
      this.item.row = "";
      this.item.col = "";
      this.item.key = "";
    },
  },
  computed: {
    valid() {
      return this.item.col.length > 0 && this.item.row.length >= 3;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
};
</script>