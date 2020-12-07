<template>
    <div>
        <h2>First Time Setup</h2>

        <p>
            Welcome to the Open Game Backend admin dashboard!
        </p>
        
        <p>
            You are the first user that has successfully logged in,
            and you've been made the administrator of this application. Whenever a new user logs in for the first time
            now, they'll become locked, requiring you (or another unlocked admin) to unlock them.
        </p>

        <p>
            If you've got any questions, feel free to
            <a href="https://github.com/open-game-backend/admin/issues" target="_blank">open an issue</a>
            at the official GitHub repository of this application and we'll be happy to help you out!
        </p>
        
        <div>
            <router-link to="/servers" class="btn btn-primary" role="button"><i class="fas fa-sign-in-alt"></i> Continue</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FirstTimeSetup'
}
</script>
