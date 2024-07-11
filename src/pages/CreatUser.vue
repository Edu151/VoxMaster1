<template>
  <div>
    <form @submit.prevent="createUser">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <label>
        <input v-model="notifications" type="checkbox" /> Receive notifications
      </label>
      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      notifications: false,
    };
  },
  methods: {
    async createUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        notifications: this.notifications,
      };

      try {
        const response = await axios.post('https://www.abibliadigital.com.br/api/users', userData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data); // Handle the response as needed
        // You can also show a success message or navigate to another page
      } catch (error) {
        console.error(error); // Handle the error as needed
        // You can show an error message to the user
      }
    },
  },
};
</script>
