<template>
  <b-row class="m-0">
    <b-col cols lg="5" md="7" sm="8" class="ml-auto mr-auto">
      <b-card class="projects__create__card shadow-lg rounded border-0">
        <b-card-body class="card-body">
          <p>🔥 Make New Project</p>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="form-group">
              <label for="title" class="sr-only">Title</label>
              <b-input
                id="title"
                placeholder="Project Title"
                v-model="project.title"
                required
              />
            </b-form-group>
            <b-form-group class="form-group mb-4">
              <label for="description" class="sr-only">Description</label>
              <b-textarea
                type="description"
                id="description"
                placeholder="Project Description"
                v-model="project.description"
                required
                rows="3"></b-textarea>
            </b-form-group>
            <b-button
              type="submit"
              class="btn btn-block mb-4"
              :disabled="!validated"
              >{{ requesting ? "Creating..." : "Create" }}</b-button
            >
          </b-form>
          <b-card-text>
            Changed your mind?
            <b-link to="/projects" class="text-primary projects__create__link"
              >Back To Home 👈</b-link
            >
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "firebase";
export default {
  name: "ProjectCreate",
  data() {
    return {
      project: {
        title: "",
        description: "",
      },
      requesting: false,
    };
  },
  methods: {
    onSubmit() {
      this.requesting = true;
      const projectsRef = firebase.database().ref("/projects");
      this.project.creator = firebase.auth().currentUser.displayName
      this.project.uid = firebase.auth().currentUser.uid
      projectsRef.push(this.project).then((data) => {
        this.$router.push({name: 'projects', params: {id: data.key}})
      });
    },
  },
  computed: {
    validated() {
      return this.project.title.length >= 8 && this.project.description.length >= 6;
    },
  },
};
</script>

<style scoped>
.projects__create__card {
  margin-top: 70px;
}

.projects__create__card img {
  width: 300px;
}

.projects__create__link {
  cursor: pointer;
}
</style>