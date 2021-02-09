<template>
  <b-container>
    <b-row>
      <b-col cols md="12" class="ml-auto mr-auto mb-4">
        <b-input-group class="mb-2">
          <b-input-group-append>
            <b-button
              v-b-modal.add-row-modal
              variant="danger"
              :disabled="generating"
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
            v-model.trim="table.size"
            required
          ></b-form-input>
          <b-input-group-prepend>
            <b-button variant="info" :disabled="!validated"
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
      </b-col>
    </b-row>

    <b-modal id="add-row-modal" centered title="Add New Row">
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col>Fields</b-col>
          <b-col>Type</b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-input
              required
              v-model.trim="item.field_name"
              placeholder="field name"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-select
              required
              v-model.trim="item.type"
              :options="variants"
            ></b-form-select>
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
        <b-row class="mb-1 text-center">
          <b-col>Fields</b-col>
          <b-col>Type</b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-input
              required
              v-model.trim="item.field_name"
              placeholder="field name"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-select
              required
              v-model.trim="item.type"
              :options="variants"
            ></b-form-select>
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
      table: { name: "", size: "" },
      generating: false,
      item: { field_name: "", type: "", index: "" },
      fields: [
        {
          key: "field_name",
          sortable: true,
        },
        {
          key: "type",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      items: [],
      variants: [
        { value: "", text: "Select Type" },
        { value: "p", text: "primary" },
        { value: "s", text: "secondary" },
        { value: "i", text: "info" },
        { value: "d", text: "danger" },
      ],
    };
  },
  methods: {
    addRow() {
      this.items.push({ ...this.item });
      this.onReset();
      this.$bvModal.hide("add-row-modal");
    },
    remRow(index) {
      this.items.splice(index, 1);
    },
    onReset() {
      this.item.field_name = "";
      this.item.type = "";
      this.item.index = "";
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
  },
  computed: {
    validated() {
      return this.table.name.length >= 3 && this.table.size.length >= 1;
    },
  },
};
</script>