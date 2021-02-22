<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols md="12" class="ml-auto mr-auto mb-4">
        <b-input-group class="mb-2">
          <b-input-group-append>
            <b-button
              v-b-modal.add-row-modal
              variant="danger"
              :disabled="generating"
              size="sm"
              >Add Row</b-button
            >
          </b-input-group-append>
          <b-form-input
            placeholder="Table name e.g users"
            v-model.trim="table.name"
            required
          ></b-form-input>
          <b-form-input
            placeholder="Rows e.g 100"
            type="number"
            min="1"
            v-model.trim="table._repeat"
            required
          ></b-form-input>
          <b-input-group-prepend>
            <b-button variant="info" :disabled="!validated" size="sm"
              >Generate Data</b-button
            >
          </b-input-group-prepend>
        </b-input-group>
      </b-col>
      <b-col cols md="12" class="ml-auto mr-auto">
        <b-table
          class="shadow-lg rounded border-0"
          :items="items"
          :fields="fields"
          stacked="md"
          show-empty
          :busy="generating"
        >
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Generating...</strong>
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
              @click="editRow(row.item)"
              class="mr-1"
            >
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
      </b-col>
    </b-row>

    <b-modal
      id="add-row-modal"
      hide-footer
      no-close-on-backdrop
      centered
      title="Add New Row"
    >
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
              v-model.trim="keyword"
              placeholder="Row Name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols md="12" class="my-2">
            <b-tag
              v-for="tag in results"
              :key="tag.key"
              style="cursor: pointer"
            >
              <span @click="onSelect(tag)">{{ tag.row }}</span></b-tag
            >
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
    </b-modal>

    <b-modal
      id="edit-row-modal"
      hide-footer
      no-close-on-backdrop
      centered
      title="Update Row Data"
    >
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
              v-model.trim="keyword"
              placeholder="Row Name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols md="12" class="my-2">
            <b-tag
              v-for="tag in results"
              :key="tag.key"
              style="cursor: pointer"
            >
              <span @click="onSelect(tag)">{{ tag.row }}</span></b-tag
            >
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
    </b-modal>
  </b-container>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      table: { name: "", _repeat: "" },
      generating: false,
      requesting: false,
      keyword: "",
      name: "",
      item: { col: "", row: "", key: "" },
      fields: [
        {
          key: "col",
          label: "Column",
          sortable: true,
        },
        {
          key: "row",
          label: "Row Data",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      items: [],
      mockups: [],
      results: [],
    };
  },
  created() {
    this.getMockups();
    this.getMocks();
  },
  methods: {
    onSubmit() {
      this.requesting = true;
      const mocksRef = firebase.database().ref(`/mocks/${this.id}`);
      mocksRef.push(this.item).then((data) => {
        this.item.key = data.key
        this.items.push({ ...this.item });
        this.onReset();
        this.$bvModal.hide("add-row-modal");
        this.requesting = false;
      });
    },
    remRow(item) {
      this.requesting = true;
      const mocksRef = firebase.database().ref(`/mocks/${this.id}`);
      mocksRef
        .child(item.key)
        .remove()
        .then(() => {
          const index = this.items.findIndex(i => i.key == item.key);
          this.items.splice(index, 1)
          this.requesting = false;
        });
    },
    onReset() {
      this.item.col = "";
      this.item.row = "";
      this.item.key = "";
      this.name = "";
      this.keyword = "";
      this.results = [];
    },
    editRow(item) {
      this.item = { ...item };
      this.keyword = this.item.row;
      this.$bvModal.show("edit-row-modal");
    },
    onUpdate() {
      this.requesting = true;
      const mocksRef = firebase.database().ref(`/mocks/${this.id}`);
      mocksRef
        .child(this.item.key)
        .set(this.item)
        .then(() => {
          const index = this.items.findIndex(i => i.key == this.item.key)
          this.items[index] = { ...this.item };
          this.items = [...this.items];
          this.onReset();
          this.$bvModal.hide("edit-row-modal");
          this.requesting = false
        });
    },
    getMockups() {
      const mockupsRef = firebase.database().ref("/mockups");
      const mockups = [];
      mockupsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          mockups.push({ ...data, key });
        });
        this.mockups = mockups;
      });
    },
    getMocks() {
      this.generating = true;
      const mocksRef = firebase.database().ref(`/mocks/${this.id}`);
      const mocks = [];
      mocksRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          mocks.push({ ...data, key });
        });
        this.items = mocks;
        this.generating = false;
      });
    },
    onSelect(item) {
      this.item.row = item.row;
      this.name = "";
      this.keyword = item.row;
      this.results = [];
    },
  },
  watch: {
    keyword() {
      if (this.keyword != "")
        this.results = this.mockups.filter((m) => m.row.includes(this.keyword));
    },
  },
  computed: {
    validated() {
      return this.table.name.length >= 3 && this.table._repeat.length >= 1;
    },
    valid() {
      return this.item.col.length > 0 && this.item.row.length >= 3;
    }
  },
};
</script>