<template>
  <main class="container" id="App">
    <section class="row justify-content-center">
      <div class="col-10">
        <h1 class="text-center">XTK</h1>
        <button class="btn btn-primary d-block mx-auto" @click="loginRedirect">
          Login
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import msal from "./plugins/msal";

export default defineComponent({
  name: "App",
  setup() {
    const request = {
      scopes: ["User.Read"],
    };

    const handleLogin = async () => {
      try {
        const response = await msal.handleRedirectPromise();
        if (!response) await msal.loginRedirect(request);
        console.log("response", response);

        const silent = await silentLogin(response.account.username);
        console.log("silentToken", silent);
      } catch (error) {
        console.error(error);
      }
    };

    const silentLogin = async (loginHint) => {
      try {
        return await msal.ssoSilent({ ...request, loginHint });
      } catch (error) {
        console.error(error);
      }
    };

    const loginRedirect = async () => {
      await msal.loginRedirect(request);
    };

    onMounted(async () => {
      await handleLogin();
    });

    return {
      loginRedirect,
    };
  },
});
</script>
